import type { Metadata } from 'next';

import { Container } from '@/components/layout/Container';

export const metadata: Metadata = { title: 'Contact' };

export default function ContactPage() {
  return (
    <Container className="py-16">
      <h1>Contact</h1>
      <p className="text-muted mt-3">Inquiry form goes here.</p>
    </Container>
  );
}
