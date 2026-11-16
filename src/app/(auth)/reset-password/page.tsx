import type { Metadata } from 'next';
import { Suspense } from 'react';

import { ResetPasswordForm } from '@/features/auth/ResetPasswordForm';

export const metadata: Metadata = { title: 'Set your password' };

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <ResetPasswordForm />
    </Suspense>
  );
}
