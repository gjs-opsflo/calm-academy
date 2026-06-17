import React, { useState } from 'react';

// ─── Verbatim copy strings — UI-SPEC Copywriting Contract ─────────────────
const COPY = {
  submitButton: 'Submit Quiz',
  retakeButton: 'Retake Quiz',
  submitDisabledTitle: 'Answer at least one question to submit',
  scoreFormat: (n: number, t: number) => `You scored ${n} / ${t}`,
  perfectScore: 'Perfect score!',
  passingSubLabel: 'Good work — review any incorrect answers below.',
  failingSubLabel: 'Review the explanations below and revisit the chapter.',
  correctBadge: 'Correct',
  incorrectBadge: 'Incorrect',
  shortAnswerPlaceholder: 'Your answer (model answer revealed after you submit the full quiz)',
  shortAnswerAriaLabel: 'Your answer (read only — model answer revealed after submit)',
  modelAnswerLabel: 'Model Answer',
  unansweredHint: 'Please select an answer.',
  failedSubmitHint: 'You must answer this question before submitting.',
  multipleCorrectSubLabel: (n: number, m: number) =>
    `You selected ${n} of ${m} correct answers for this question.`,
  errorHeading: 'Quiz unavailable',
  errorBody:
    'This quiz could not be loaded. Try refreshing the page, or continue to the next chapter.',
} as const;

// ─── TypeScript interfaces ────────────────────────────────────────────────
interface QuizOption {
  label: string;
  correct: boolean;
  explanation: string;
}

interface QuizQuestion {
  id: string;
  type: 'multiple_choice' | 'multiple_correct' | 'short_answer' | 'code_completion';
  prompt: string;
  options?: QuizOption[];
  accepted_answers?: string[];
  case_sensitive?: boolean;
  explanation?: string;
  reference_section?: string;
  snippet?: string;
  partial_credit?: boolean;
}

interface QuizChapter {
  chapter: number;
  slug: string;
  title: string;
  questions: QuizQuestion[];
}

interface QuizData {
  module: number;
  title: string;
  chapters: QuizChapter[];
}

interface QuizProps {
  data: QuizData;
}

// ─── Helper: compute per-question correctness ─────────────────────────────
function isAnswerCorrect(question: QuizQuestion, answer: string | string[]): boolean {
  if (question.type === 'multiple_choice') {
    const selected = answer as string;
    const option = question.options?.find((o) => o.label === selected);
    return option?.correct === true;
  }
  if (question.type === 'multiple_correct') {
    const selected = answer as string[];
    const allCorrect = question.options?.filter((o) => o.correct) ?? [];
    return (
      selected.length === allCorrect.length &&
      allCorrect.every((o) => selected.includes(o.label))
    );
  }
  return false; // short_answer and code_completion are not auto-graded
}

// ─── Helper: count correct-option selections for multiple_correct ─────────
function countCorrectSelections(question: QuizQuestion, selected: string[]): number {
  return question.options?.filter((o) => o.correct && selected.includes(o.label)).length ?? 0;
}

// ─── Component ────────────────────────────────────────────────────────────
export default function Quiz({ data }: QuizProps) {
  // Error boundary — missing or malformed data
  if (!data || !data.chapters) {
    return (
      <div role="alert" style={{ padding: '16px', border: '1px solid var(--ifm-color-danger)', borderRadius: '4px' }}>
        <h3 style={{ marginTop: 0 }}>{COPY.errorHeading}</h3>
        <p style={{ marginBottom: 0 }}>{COPY.errorBody}</p>
      </div>
    );
  }

  // Collect all questions in order (for scoring)
  const allQuestions: QuizQuestion[] = data.chapters.flatMap((ch) => ch.questions);

  // State: answers keyed by question id; value = string (radio/text) or string[] (checkbox)
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [submitted, setSubmitted] = useState(false);
  const [showUnansweredHint, setShowUnansweredHint] = useState(false);

  // Derived: at least one answer given
  const hasAnyAnswer = Object.values(answers).some((a) =>
    Array.isArray(a) ? a.length > 0 : Boolean(a)
  );

  // Scoring (computed on submit)
  const gradableQuestions = allQuestions.filter(
    (q) => q.type === 'multiple_choice' || q.type === 'multiple_correct'
  );
  const correctCount = submitted
    ? gradableQuestions.filter((q) => {
        const ans = answers[q.id];
        return ans !== undefined && isAnswerCorrect(q, ans);
      }).length
    : 0;
  const totalGradable = gradableQuestions.length;
  const scorePercent = totalGradable > 0 ? (correctCount / totalGradable) * 100 : 100;

  const scoreSubLabel =
    scorePercent === 100
      ? COPY.perfectScore
      : scorePercent >= 70
      ? COPY.passingSubLabel
      : COPY.failingSubLabel;

  // ── Event handlers ──────────────────────────────────────────────────────
  function handleRadioChange(questionId: string, label: string) {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [questionId]: label }));
  }

  function handleCheckboxChange(questionId: string, label: string, checked: boolean) {
    if (submitted) return;
    setAnswers((prev) => {
      const current = (prev[questionId] as string[]) ?? [];
      const updated = checked
        ? [...current, label]
        : current.filter((l) => l !== label);
      return { ...prev, [questionId]: updated };
    });
  }

  function handleSubmit() {
    if (!hasAnyAnswer) return;
    setSubmitted(true);
    setShowUnansweredHint(false);
  }

  function handleRetake() {
    setAnswers({});
    setSubmitted(false);
    setShowUnansweredHint(false);
  }

  // ── Styles ──────────────────────────────────────────────────────────────
  const containerStyle: React.CSSProperties = {
    padding: '32px 0',
  };

  const questionCardStyle: React.CSSProperties = {
    background: 'var(--ifm-card-background-color)',
    borderRadius: '6px',
    padding: '16px',
    marginBottom: '24px',
  };

  const fieldsetStyle: React.CSSProperties = {
    border: 'none',
    padding: 0,
    margin: 0,
  };

  const legendStyle: React.CSSProperties = {
    fontWeight: 700,
    fontSize: '16px',
    marginBottom: '12px',
    padding: 0,
  };

  const labelStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    minHeight: '44px',
    padding: '4px 8px',
    cursor: 'pointer',
    borderRadius: '4px',
    marginBottom: '4px',
    gap: '8px',
  };

  const badgeStyle = (correct: boolean): React.CSSProperties => ({
    fontSize: '14px',
    fontWeight: 700,
    color: correct ? 'var(--ifm-color-success)' : 'var(--ifm-color-danger)',
    marginBottom: '4px',
    display: 'block',
  });

  const explanationStyle: React.CSSProperties = {
    fontSize: '14px',
    margin: '4px 0 0 0',
    opacity: 0.85,
  };

  function getOptionStyle(question: QuizQuestion, optLabel: string): React.CSSProperties {
    if (!submitted) {
      const sel =
        question.type === 'multiple_choice'
          ? answers[question.id] === optLabel
          : ((answers[question.id] as string[]) ?? []).includes(optLabel);
      return {
        ...labelStyle,
        borderLeft: sel
          ? `2px solid var(--ifm-color-primary)`
          : '2px solid transparent',
      };
    }
    // Post-submit
    const opt = question.options?.find((o) => o.label === optLabel);
    const wasSelected =
      question.type === 'multiple_choice'
        ? answers[question.id] === optLabel
        : ((answers[question.id] as string[]) ?? []).includes(optLabel);

    if (opt?.correct) {
      return {
        ...labelStyle,
        borderLeft: `2px solid var(--ifm-color-success)`,
        background: 'color-mix(in srgb, var(--ifm-color-success) 8%, transparent)',
        pointerEvents: 'none',
      };
    }
    if (wasSelected && !opt?.correct) {
      return {
        ...labelStyle,
        borderLeft: `2px solid var(--ifm-color-danger)`,
        background: 'color-mix(in srgb, var(--ifm-color-danger) 8%, transparent)',
        pointerEvents: 'none',
      };
    }
    return { ...labelStyle, borderLeft: '2px solid transparent', pointerEvents: 'none' };
  }

  // ── Render ──────────────────────────────────────────────────────────────
  return (
    <div style={containerStyle}>
      {/* Score region — always present but content only shown post-submit */}
      <div role="status" aria-live="polite">
        {submitted && (
          <div
            style={{
              display: 'inline-block',
              padding: '12px 24px',
              border: `2px solid var(--ifm-color-primary)`,
              borderRadius: '6px',
              marginBottom: '32px',
            }}
          >
            <div style={{ fontSize: '28px', fontWeight: 700, lineHeight: 1.2 }}>
              {COPY.scoreFormat(correctCount, totalGradable)}
            </div>
            <div style={{ fontSize: '14px', marginTop: '4px' }}>{scoreSubLabel}</div>
          </div>
        )}
      </div>

      {/* Chapter sections */}
      {data.chapters.map((chapter) => (
        <div key={chapter.slug} style={{ marginBottom: '32px' }}>
          <div
            style={{
              fontSize: '14px',
              fontWeight: 700,
              marginBottom: '16px',
              letterSpacing: '0.02em',
            }}
          >
            {chapter.title}
          </div>

          {chapter.questions.map((question) => {
            const selectedRadio = answers[question.id] as string | undefined;
            const selectedCheckboxes = (answers[question.id] as string[]) ?? [];

            return (
              <div key={question.id} style={questionCardStyle}>
                {/* Multiple choice */}
                {(question.type === 'multiple_choice') && (
                  <fieldset style={fieldsetStyle}>
                    <legend style={legendStyle}>{question.prompt}</legend>
                    {question.options?.map((opt, i) => {
                      const inputId = `${question.id}-${i}`;
                      const wasSelected = selectedRadio === opt.label;
                      return (
                        <div key={opt.label}>
                          <label htmlFor={inputId} style={getOptionStyle(question, opt.label)}>
                            <input
                              type="radio"
                              id={inputId}
                              name={question.id}
                              value={opt.label}
                              checked={wasSelected}
                              disabled={submitted}
                              onChange={() => handleRadioChange(question.id, opt.label)}
                            />
                            {opt.label}
                          </label>
                          {submitted && wasSelected && (
                            <div style={{ paddingLeft: '8px', marginBottom: '8px' }}>
                              <span style={badgeStyle(opt.correct)}>
                                {opt.correct ? COPY.correctBadge : COPY.incorrectBadge}
                              </span>
                              <p style={explanationStyle}>{opt.explanation}</p>
                            </div>
                          )}
                          {submitted && !wasSelected && opt.correct && (
                            <div style={{ paddingLeft: '8px', marginBottom: '8px' }}>
                              <p style={explanationStyle}>{opt.explanation}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                    {showUnansweredHint && !answers[question.id] && !submitted && (
                      <p style={{ color: 'var(--ifm-color-danger)', fontSize: '14px' }}>
                        {COPY.failedSubmitHint}
                      </p>
                    )}
                  </fieldset>
                )}

                {/* Multiple correct */}
                {question.type === 'multiple_correct' && (
                  <fieldset style={fieldsetStyle}>
                    <legend style={legendStyle}>{question.prompt}</legend>
                    {question.options?.map((opt, i) => {
                      const inputId = `${question.id}-cb-${i}`;
                      const wasSelected = selectedCheckboxes.includes(opt.label);
                      return (
                        <div key={opt.label}>
                          <label htmlFor={inputId} style={getOptionStyle(question, opt.label)}>
                            <input
                              type="checkbox"
                              id={inputId}
                              name={question.id}
                              value={opt.label}
                              checked={wasSelected}
                              disabled={submitted}
                              onChange={(e) =>
                                handleCheckboxChange(question.id, opt.label, e.target.checked)
                              }
                            />
                            {opt.label}
                          </label>
                          {submitted && wasSelected && (
                            <div style={{ paddingLeft: '8px', marginBottom: '8px' }}>
                              <span style={badgeStyle(opt.correct)}>
                                {opt.correct ? COPY.correctBadge : COPY.incorrectBadge}
                              </span>
                              <p style={explanationStyle}>{opt.explanation}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                    {submitted && (() => {
                      const totalCorrect = question.options?.filter((o) => o.correct).length ?? 0;
                      const selectedCorrect = countCorrectSelections(question, selectedCheckboxes);
                      return (
                        <p style={{ fontSize: '14px', marginTop: '8px' }}>
                          {COPY.multipleCorrectSubLabel(selectedCorrect, totalCorrect)}
                        </p>
                      );
                    })()}
                  </fieldset>
                )}

                {/* Short answer */}
                {question.type === 'short_answer' && (
                  <fieldset style={fieldsetStyle}>
                    <legend style={legendStyle}>{question.prompt}</legend>
                    <textarea
                      readOnly
                      aria-label={COPY.shortAnswerAriaLabel}
                      placeholder={COPY.shortAnswerPlaceholder}
                      rows={3}
                      style={{
                        width: '100%',
                        padding: '8px',
                        borderRadius: '4px',
                        border: '1px solid var(--ifm-color-primary)',
                        background: 'var(--ifm-card-background-color)',
                        resize: 'vertical',
                        fontFamily: 'inherit',
                        fontSize: '14px',
                      }}
                    />
                    {submitted && question.accepted_answers && question.accepted_answers.length > 0 && (
                      <div style={{ marginTop: '12px' }}>
                        <span
                          style={{ fontSize: '14px', fontWeight: 700, display: 'block', marginBottom: '4px' }}
                        >
                          {COPY.modelAnswerLabel}
                        </span>
                        <p style={explanationStyle}>{question.accepted_answers[0]}</p>
                      </div>
                    )}
                  </fieldset>
                )}

                {/* Code completion */}
                {question.type === 'code_completion' && (
                  <fieldset style={fieldsetStyle}>
                    <legend style={legendStyle}>{question.prompt}</legend>
                    {question.snippet && (
                      <pre
                        style={{
                          background: 'var(--ifm-card-background-color)',
                          padding: '12px',
                          borderRadius: '4px',
                          overflowX: 'auto',
                        }}
                      >
                        <code>{question.snippet}</code>
                      </pre>
                    )}
                    <input
                      type="text"
                      placeholder="Type your answer here"
                      readOnly={submitted}
                      style={{
                        padding: '8px',
                        borderRadius: '4px',
                        border: '1px solid var(--ifm-color-primary)',
                        background: 'var(--ifm-card-background-color)',
                        fontSize: '14px',
                        width: '100%',
                      }}
                    />
                    {submitted && question.accepted_answers && question.accepted_answers.length > 0 && (
                      <div style={{ marginTop: '12px' }}>
                        <span style={{ fontSize: '14px', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
                          {COPY.modelAnswerLabel}
                        </span>
                        <p style={explanationStyle}>{question.accepted_answers[0]}</p>
                        {question.explanation && (
                          <p style={explanationStyle}>{question.explanation}</p>
                        )}
                      </div>
                    )}
                  </fieldset>
                )}
              </div>
            );
          })}
        </div>
      ))}

      {/* Submit / Retake button */}
      <div style={{ marginTop: '48px' }}>
        {!submitted ? (
          <button
            type="button"
            disabled={!hasAnyAnswer}
            title={!hasAnyAnswer ? COPY.submitDisabledTitle : undefined}
            onClick={handleSubmit}
            style={{
              background: hasAnyAnswer ? 'var(--ifm-color-primary)' : undefined,
              color: hasAnyAnswer ? 'var(--ifm-color-primary-contrast-foreground)' : undefined,
              border: `2px solid var(--ifm-color-primary)`,
              borderRadius: '4px',
              padding: '12px 24px',
              fontSize: '16px',
              fontWeight: 700,
              cursor: hasAnyAnswer ? 'pointer' : 'not-allowed',
              opacity: hasAnyAnswer ? 1 : 0.5,
            }}
          >
            {COPY.submitButton}
          </button>
        ) : (
          <button
            type="button"
            onClick={handleRetake}
            style={{
              background: 'transparent',
              border: `2px solid var(--ifm-color-primary)`,
              borderRadius: '4px',
              padding: '12px 24px',
              fontSize: '16px',
              fontWeight: 700,
              cursor: 'pointer',
              color: 'var(--ifm-color-primary)',
            }}
          >
            {COPY.retakeButton}
          </button>
        )}
      </div>
    </div>
  );
}
