'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { AuthCard, FormAlert } from '@/components/auth/AuthCard';
import { PasswordField, SubmitButton } from '@/components/form/Field';
import { paths } from '@/config/paths';
import { ApiError, errorMessage } from '@/lib/api/errors';
import { authService } from '@/services/auth';

/** Also the "set your first password" screen: welcome links for new Principals, teachers and parents land here. */
export function ResetPasswordForm() {
  const token = useSearchParams().get('token') ?? '';
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string | undefined>>({});
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (submitting) return;
    setError(null);
    setFieldErrors({});
    setSubmitting(true);
    try {
      await authService.resetPassword({ token, password, passwordConfirmation: confirmation });
      setDone(true);
    } catch (err) {
      if (err instanceof ApiError && err.isValidation) {
        setFieldErrors({
          password: err.field('password'),
          passwordConfirmation: err.field('passwordConfirmation'),
        });
        if (err.field('token')) setError('This link is not valid.');
      } else setError(errorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  if (!token) {
    return (
      <AuthCard
        title="Link not valid"
        subtitle="This password link is incomplete. Ask your school to send a new one."
      >
        <Link
          href={paths.auth.login}
          className="text-sm font-semibold text-gray-900 hover:underline"
        >
          Back to log in
        </Link>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="Set your password"
      subtitle="Choose a password with at least 8 characters, a letter and a number."
    >
      {error ? <FormAlert>{error}</FormAlert> : null}
      {done ? (
        <>
          <FormAlert tone="success">Your password is set. You can log in now.</FormAlert>
          <Link
            href={paths.auth.login}
            className="inline-flex w-full items-center justify-center rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white hover:bg-gray-800"
          >
            Go to log in
          </Link>
        </>
      ) : (
        <form onSubmit={onSubmit} className="space-y-4" noValidate>
          <PasswordField
            label="New password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={fieldErrors.password}
          />
          <PasswordField
            label="Confirm password"
            autoComplete="new-password"
            value={confirmation}
            onChange={(e) => setConfirmation(e.target.value)}
            error={fieldErrors.passwordConfirmation}
          />
          <SubmitButton loading={submitting} className="w-full py-2.5">
            Save password
          </SubmitButton>
        </form>
      )}
    </AuthCard>
  );
}
