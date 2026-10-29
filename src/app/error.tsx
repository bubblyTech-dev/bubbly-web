'use client';

import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui';

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Container className="py-24 text-center">
      <h1>Something went wrong</h1>
      <p className="mt-3 text-muted">Please try again.</p>
      <Button onClick={reset} className="mt-6">
        Try again
      </Button>
    </Container>
  );
}
