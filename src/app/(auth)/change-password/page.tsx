import type { Metadata } from 'next';

import { ChangePasswordForm } from '@/features/auth/ChangePasswordForm';

export const metadata: Metadata = { title: 'Change password' };

export default function ChangePasswordPage() {
  return <ChangePasswordForm />;
}
