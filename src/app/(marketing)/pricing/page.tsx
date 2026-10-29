import type { Metadata } from 'next';

import { Container } from '@/components/layout/Container';

export const metadata: Metadata = { title: 'Pricing' };

export default function PricingPage() {
  return (
    <Container className="py-16">
      <h1>Pricing</h1>
      <p className="mt-3 text-muted">Plans will be loaded from the backend.</p>
    </Container>
  );
}
