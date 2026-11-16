'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';

import { AuthCard, FormAlert } from '@/components/auth/AuthCard';
import { SubmitButton, TextField } from '@/components/form/Field';
import { paths } from '@/config/paths';
import { ApiError, errorMessage } from '@/lib/api/errors';
import { authService } from '@/services/auth';

export function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | undefined>();
  const [sent, setSent] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (submitting) return;
    setError(null);
    setEmailError(undefined);
    setSubmitting(true);
    try {
      const response = await authService.forgotPassword(email.trim());
      setSent(response.message);
    } catch (err) {
      if (err instanceof ApiError && err.isValidation) setEmailError(err.field('email'));
      else setError(errorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthCard
      title="Forgot password?"
      subtitle="Enter your login email and we will send you a link to set a new password."
      footer={
        <Link href={paths.auth.login} className="font-semibold text-gray-900 hover:underline">
          Back to log in
        </Link>
      }
    >
      {error ? <FormAlert>{error}</FormAlert> : null}
      {sent ? (
        <FormAlert tone="success">{sent}</FormAlert>
      ) : (
        <form onSubmit={onSubmit} className="space-y-4" noValidate>
          <TextField
            label="Email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={emailError}
          />
          <SubmitButton loading={submitting} className="w-full py-2.5">
            Send reset link
          </SubmitButton>
        </form>
      )}
    </AuthCard>
  );
}
