import type { Metadata } from 'next';

import { Card } from '@/components/ui';

export const metadata: Metadata = { title: 'Register your preschool' };

export default function RegisterPage() {
  return (
    <Card elevated>
      <h1 className="text-2xl">Register your preschool</h1>
      <p className="card__text">Registration and plan selection flow goes here.</p>
    </Card>
  );
}
