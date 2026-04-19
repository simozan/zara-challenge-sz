'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => { 
    console.error(error);
  }, [error]);

  return (
    <main style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Something went wrong</h2>
      <p style={{ color: 'var(--color-text-muted)', marginBottom: '1rem' }}>{error.message}</p>
      <button
        onClick={unstable_retry}
        style={{ padding: '0.75rem 1.5rem', cursor: 'pointer' }}
      >
        Try again
      </button>
    </main>
  );
}
