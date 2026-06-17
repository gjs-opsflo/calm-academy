import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

export default function Home(): ReactNode {
  return (
    <Layout
      title="CALM Academy"
      description="Architecture as Code — the official course">
      <main style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <h1>CALM Academy</h1>
        <p style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>
          Architecture as Code — the official course
        </p>
        <Link
          className="button button--primary button--lg"
          to="/docs/module-00-on-ramp/three-paths-to-first-calm-doc">
          Start Learning
        </Link>
      </main>
    </Layout>
  );
}
