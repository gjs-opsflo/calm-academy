import { render, screen, fireEvent } from '@testing-library/react';
import { readFileSync } from 'fs';
import { join } from 'path';
import Quiz from './Quiz';

// Minimal fixture covering all 4 question types
const fixtureMC1: QuizQuestion = {
  id: 'q1',
  type: 'multiple_choice',
  prompt: 'Which node type represents an end user?',
  options: [
    { label: 'actor', correct: true, explanation: 'actor is the correct CALM node type for end users.' },
    { label: 'service', correct: false, explanation: 'service is for backend services, not users.' },
    { label: 'webclient', correct: false, explanation: 'webclient is for browser apps, not for the user actor.' },
  ],
};

const fixtureMC2: QuizQuestion = {
  id: 'q2',
  type: 'multiple_choice',
  prompt: 'What does calm validate check?',
  options: [
    { label: 'Schema conformance', correct: true, explanation: 'calm validate checks that the architecture conforms to the CALM JSON schema.' },
    { label: 'Network connectivity', correct: false, explanation: 'calm validate does not check network connectivity.' },
    { label: 'File permissions', correct: false, explanation: 'calm validate does not check file permissions.' },
  ],
};

const fixtureMCWrong: QuizQuestion = {
  id: 'q3',
  type: 'multiple_choice',
  prompt: 'Which of these is NOT a valid CALM node type?',
  options: [
    { label: 'container', correct: true, explanation: 'container does not exist in the CALM spec.' },
    { label: 'database', correct: false, explanation: 'database is a valid CALM node type.' },
  ],
};

const fixtureMultCorrect: QuizQuestion = {
  id: 'q4',
  type: 'multiple_correct',
  prompt: 'Which relationship types exist in CALM? Select all that apply.',
  options: [
    { label: 'connects', correct: true, explanation: 'connects is a valid CALM relationship type.' },
    { label: 'interacts', correct: true, explanation: 'interacts is a valid CALM relationship type.' },
    { label: 'deployed-in', correct: true, explanation: 'deployed-in is a valid CALM relationship type.' },
    { label: 'calls', correct: false, explanation: 'calls is not a CALM relationship type.' },
  ],
};

const fixtureShortAnswer: QuizQuestion = {
  id: 'q5',
  type: 'short_answer',
  prompt: 'Name the calm CLI subcommand used to compare two CALM documents.',
  accepted_answers: ['calm diff', 'diff'],
  explanation: 'calm diff compares two CALM documents.',
};

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

// Quiz with 5 questions across 2 chapters
const fixtureData: QuizData = {
  module: 0,
  title: 'Module 0: Test Quiz',
  chapters: [
    {
      chapter: 0.1,
      slug: 'chapter-one',
      title: 'Chapter One',
      questions: [fixtureMC1, fixtureMC2, fixtureMCWrong],
    },
    {
      chapter: 0.2,
      slug: 'chapter-two',
      title: 'Chapter Two',
      questions: [fixtureMultCorrect, fixtureShortAnswer],
    },
  ],
};

// Small quiz where all answers are correct (to test perfect score)
const fixtureAllCorrect: QuizData = {
  module: 0,
  title: 'All Correct Quiz',
  chapters: [
    {
      chapter: 0.1,
      slug: 'ch1',
      title: 'Chapter 1',
      questions: [fixtureMC1, fixtureMC2],
    },
  ],
};

// Quiz with 3 questions — score < 70% when only 1 correct out of 3
const fixtureFailScore: QuizData = {
  module: 0,
  title: 'Fail Score Quiz',
  chapters: [
    {
      chapter: 0.1,
      slug: 'ch1',
      title: 'Chapter 1',
      questions: [fixtureMC1, fixtureMC2, fixtureMCWrong],
    },
  ],
};

describe('Quiz', () => {
  it('Test 1 (initial render): Submit button is disabled with correct title when no answer selected', () => {
    render(<Quiz data={fixtureData} />);
    const submitBtn = screen.getByRole('button', { name: /Submit Quiz/i });
    expect(submitBtn).toBeDisabled();
    expect(submitBtn).toHaveAttribute('title', 'Answer at least one question to submit');
  });

  it('Test 2 (any answer selected): Submit button becomes enabled after selecting one radio option', () => {
    render(<Quiz data={fixtureData} />);
    const radios = screen.getAllByRole('radio');
    fireEvent.click(radios[0]);
    const submitBtn = screen.getByRole('button', { name: /Submit Quiz/i });
    expect(submitBtn).not.toBeDisabled();
  });

  it('Test 3 (submit, all correct): Score shows "You scored N / N" and "Perfect score!" when all correct', () => {
    render(<Quiz data={fixtureAllCorrect} />);
    // Select correct answer for q1 (actor — index 0)
    const q1Radios = screen.getAllByRole('radio');
    fireEvent.click(q1Radios[0]); // actor (correct)
    // Select correct answer for q2 (Schema conformance — index 3 relative to all radios)
    fireEvent.click(q1Radios[3]); // Schema conformance (correct)
    fireEvent.click(screen.getByRole('button', { name: /Submit Quiz/i }));
    expect(screen.getByText(/You scored 2 \/ 2/)).toBeInTheDocument();
    expect(screen.getByText('Perfect score!')).toBeInTheDocument();
  });

  it('Test 4 (submit, mixed): Correct/Incorrect badges and explanations visible after mixed answers', () => {
    render(<Quiz data={fixtureAllCorrect} />);
    const radios = screen.getAllByRole('radio');
    fireEvent.click(radios[0]); // actor (correct) for q1
    fireEvent.click(radios[4]); // Network connectivity (incorrect) for q2
    fireEvent.click(screen.getByRole('button', { name: /Submit Quiz/i }));
    // Badges visible
    expect(screen.getByText('Correct')).toBeInTheDocument();
    expect(screen.getByText('Incorrect')).toBeInTheDocument();
    // Explanations visible
    expect(screen.getByText(/actor is the correct CALM node type/)).toBeInTheDocument();
    expect(screen.getByText(/calm validate checks that the architecture/)).toBeInTheDocument();
  });

  it('Test 5 (submit, failing): Sub-label is the review message when score < 70%', () => {
    render(<Quiz data={fixtureFailScore} />);
    const radios = screen.getAllByRole('radio');
    // Answer q1 correctly (actor), q2 incorrectly (Network connectivity), q3 incorrectly (database)
    fireEvent.click(radios[0]); // actor — correct for q1
    fireEvent.click(radios[4]); // Network connectivity — incorrect for q2
    fireEvent.click(radios[7]); // database — incorrect for q3
    fireEvent.click(screen.getByRole('button', { name: /Submit Quiz/i }));
    expect(screen.getByText('Review the explanations below and revisit the chapter.')).toBeInTheDocument();
  });

  it('Test 6 (short_answer pre-submit): Short answer question renders readOnly textarea with correct placeholder', () => {
    render(<Quiz data={fixtureData} />);
    const textarea = screen.getByRole('textbox', { name: /Your answer/i });
    expect(textarea.tagName.toLowerCase()).toBe('textarea');
    expect(textarea).toHaveAttribute('readonly');
    expect(textarea).toHaveAttribute('placeholder', 'Your answer (model answer revealed after you submit the full quiz)');
  });

  it('Test 7 (short_answer post-submit): Model Answer block shows first accepted_answer after submit', () => {
    render(<Quiz data={fixtureData} />);
    // Select any radio to enable submit
    fireEvent.click(screen.getAllByRole('radio')[0]);
    // Check one checkbox (multiple_correct)
    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]);
    fireEvent.click(screen.getByRole('button', { name: /Submit Quiz/i }));
    expect(screen.getByText('Model Answer')).toBeInTheDocument();
    // First accepted_answer is 'calm diff'
    expect(screen.getByText('calm diff')).toBeInTheDocument();
  });

  it('Test 8 (multiple_correct): Checkbox inputs rendered; enabled after check; post-submit sub-label shown', () => {
    render(<Quiz data={fixtureData} />);
    // multiple_correct question renders checkboxes
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes.length).toBeGreaterThan(0);
    // Submit is disabled initially
    const submitBtn = screen.getByRole('button', { name: /Submit Quiz/i });
    expect(submitBtn).toBeDisabled();
    // After checking one checkbox, submit is enabled
    fireEvent.click(checkboxes[0]);
    expect(submitBtn).not.toBeDisabled();
    // Also select a radio to avoid unanswered-question issues
    fireEvent.click(screen.getAllByRole('radio')[0]);
    fireEvent.click(submitBtn);
    // Post-submit sub-label for multiple_correct question
    expect(screen.getByText(/You selected \d+ of \d+ correct answers for this question\./)).toBeInTheDocument();
  });

  it('Test 9 (retake): After submit, Retake Quiz button appears and clicking it resets state', () => {
    render(<Quiz data={fixtureData} />);
    fireEvent.click(screen.getAllByRole('radio')[0]);
    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]);
    fireEvent.click(screen.getByRole('button', { name: /Submit Quiz/i }));
    // Submit replaced by Retake
    expect(screen.queryByRole('button', { name: /Submit Quiz/i })).not.toBeInTheDocument();
    const retakeBtn = screen.getByRole('button', { name: /Retake Quiz/i });
    expect(retakeBtn).toBeInTheDocument();
    // Clicking Retake resets state
    fireEvent.click(retakeBtn);
    // Submit Quiz button should be back and disabled
    expect(screen.getByRole('button', { name: /Submit Quiz/i })).toBeDisabled();
    // Score should be gone
    expect(screen.queryByText(/You scored/)).not.toBeInTheDocument();
  });

  it('Test 10 (error state): Undefined data renders role=alert with Quiz unavailable heading and body', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    render(<Quiz data={undefined as any} />);
    const alert = screen.getByRole('alert');
    expect(alert).toBeInTheDocument();
    expect(screen.getByText('Quiz unavailable')).toBeInTheDocument();
    expect(screen.getByText('This quiz could not be loaded. Try refreshing the page, or continue to the next chapter.')).toBeInTheDocument();
  });

  it('Test 11 (a11y fieldset): Every question options are wrapped in <fieldset> with <legend> = prompt text', () => {
    render(<Quiz data={fixtureData} />);
    const fieldsets = document.querySelectorAll('fieldset');
    expect(fieldsets.length).toBeGreaterThanOrEqual(5); // one per question
    // First fieldset legend should contain the first question prompt
    const firstLegend = fieldsets[0].querySelector('legend');
    expect(firstLegend).not.toBeNull();
    expect(firstLegend!.textContent).toContain('Which node type represents an end user?');
  });

  it('Test 12 (a11y score): Score badge has role="status" and aria-live="polite"', () => {
    render(<Quiz data={fixtureData} />);
    // Submit first
    fireEvent.click(screen.getAllByRole('radio')[0]);
    fireEvent.click(screen.getAllByRole('checkbox')[0]);
    fireEvent.click(screen.getByRole('button', { name: /Submit Quiz/i }));
    // Find the score status element
    const statusEl = document.querySelector('[role="status"][aria-live="polite"]');
    expect(statusEl).not.toBeNull();
    expect(statusEl!.textContent).toMatch(/You scored/);
  });

  it('Test 13 (a11y short_answer): short_answer textarea has correct aria-label', () => {
    render(<Quiz data={fixtureData} />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute(
      'aria-label',
      'Your answer (read only — model answer revealed after submit)'
    );
  });

  it('Test 14 (no hardcoded hex): Quiz.tsx source contains no hex color literals', () => {
    const quizSrc = readFileSync(join(__dirname, 'Quiz.tsx'), 'utf8');
    // Should not find hex color patterns like #fff, #2e8555, #fa383e, #1b1b1d
    const hexPattern = /#[0-9a-fA-F]{3,8}\b/g;
    const matches = quizSrc.match(hexPattern);
    expect(matches).toBeNull();
  });

  it('Test 15 (no outline:none): Quiz.tsx source contains no outline: none suppression', () => {
    const quizSrc = readFileSync(join(__dirname, 'Quiz.tsx'), 'utf8');
    expect(quizSrc).not.toMatch(/outline\s*:\s*none/);
  });
});
