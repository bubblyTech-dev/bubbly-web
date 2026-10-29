import type { Metadata } from 'next';

import { Card } from '@/components/ui';

export const metadata: Metadata = { title: 'Log in' };

export default function LoginPage() {
  return (
    <Card elevated>
      <h1 className="text-2xl">Log in</h1>
      <p className="card__text">Login form goes here.</p>
    </Card>
  );
}
