'use client';

import { useEffect, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import { AuthCard, FormAlert } from '@/components/auth/AuthCard';
import { PasswordField, SubmitButton, TextField } from '@/components/form/Field';
import { paths } from '@/config/paths';
import { ApiError, errorMessage, isCancelled } from '@/lib/api/errors';
import { homeFor, safeNext } from '@/lib/auth/roles';
import { useAuth } from '@/providers/AuthProvider';
import { useSnackbar } from '@/providers/SnackbarProvider';

export function LoginForm() {
  const { status, me, login } = useAuth();
  const snackbar = useSnackbar();
  const router = useRouter();
  const next = safeNext(useSearchParams().get('next'));

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string | undefined>>({});
  const [submitting, setSubmitting] = useState(false);

  // already signed in (or just signed in): go to the right home
  useEffect(() => {
    if (status !== 'authenticated' || !me) return;
    if (me.user.mustChangePassword) router.replace(paths.auth.changePassword);
    else router.replace(next ?? homeFor(me.user.role));
  }, [status, me, next, router]);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (submitting) return;
    setError(null);
    setFieldErrors({});
    setSubmitting(true);
    try {
      const signedIn = await login(email.trim(), password);
      snackbar.success(`Welcome back${signedIn.user.name ? `, ${signedIn.user.name}` : ''}!`);
      // the effect above sends the user to their home; keep the button busy until then
    } catch (err) {
      if (isCancelled(err)) return;
      if (err instanceof ApiError && err.isValidation) {
        setFieldErrors({ email: err.field('email'), password: err.field('password') });
      } else {
        setError(errorMessage(err));
      }
      setSubmitting(false);
    }
  };

  return (
    <AuthCard
      title="Welcome back!"
      subtitle="Log in to your preschool workspace."
      footer={
        <>
          New to Bubbly?{' '}
          <Link href={paths.pricing} className="font-semibold text-gray-900 hover:underline">
            See plans
          </Link>
        </>
      }
    >
      {error ? <FormAlert>{error}</FormAlert> : null}
      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        <TextField
          label="Email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={fieldErrors.email}
          placeholder="you@school.com"
        />
        <PasswordField
          label="Password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={fieldErrors.password}
        />
        <div className="flex justify-end">
          <Link
            href={paths.auth.forgotPassword}
            className="text-xs font-semibold text-gray-700 hover:text-black hover:underline"
          >
            Forgot password?
          </Link>
        </div>
        <SubmitButton loading={submitting} className="w-full py-2.5">
          Log in
        </SubmitButton>
      </form>
    </AuthCard>
  );
}
