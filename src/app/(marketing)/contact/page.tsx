import type { Metadata } from 'next';

import { Container } from '@/components/layout/Container';

export const metadata: Metadata = { title: 'Contact' };

export default function ContactPage() {
  return (
    <Container className="py-16">
      <h1>Contact</h1>
      <p className="mt-3 text-muted">Inquiry form goes here.</p>
    </Container>
  );
}
