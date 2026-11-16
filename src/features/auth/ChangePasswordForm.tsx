'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';

import { AuthCard, FormAlert } from '@/components/auth/AuthCard';
import { FullScreenStatus } from '@/components/auth/FullScreenStatus';
import { PasswordField, SubmitButton } from '@/components/form/Field';
import { paths } from '@/config/paths';
import { ApiError, errorMessage } from '@/lib/api/errors';
import { homeFor } from '@/lib/auth/roles';
import { useAuth } from '@/providers/AuthProvider';
import { authService } from '@/services/auth';

/** Shown when the account must change its password, and reachable from the profile pages. */
export function ChangePasswordForm() {
  const { status, me, reload, logout } = useAuth();
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string | undefined>>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (status === 'anonymous') router.replace(paths.auth.login);
  }, [status, router]);

  if (status !== 'authenticated' || !me) return <FullScreenStatus />;

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setFieldErrors({});
    setSubmitting(true);
    try {
      await authService.changePassword({
        currentPassword,
        newPassword,
        newPasswordConfirmation: confirmation,
      });
      const fresh = await reload();
      router.replace(homeFor(fresh?.user.role ?? me.user.role));
    } catch (err) {
      if (err instanceof ApiError && err.status === 422) {
        setFieldErrors({
          currentPassword: err.field('currentPassword'),
          newPassword: err.field('newPassword'),
          newPasswordConfirmation: err.field('newPasswordConfirmation'),
        });
      } else setError(errorMessage(err));
      setSubmitting(false);
    }
  };

  return (
    <AuthCard
      title="Change password"
      subtitle={
        me.user.mustChangePassword
          ? 'Please choose a new password before you continue.'
          : 'Other devices will be signed out.'
      }
      footer={
        me.user.mustChangePassword ? (
          <button
            type="button"
            onClick={() => void logout()}
            className="font-semibold text-gray-900 hover:underline"
          >
            Log out
          </button>
        ) : (
          <button
            type="button"
            onClick={() => router.back()}
            className="font-semibold text-gray-900 hover:underline"
          >
            Cancel
          </button>
        )
      }
    >
      {error ? <FormAlert>{error}</FormAlert> : null}
      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        <PasswordField
          label="Current password"
          autoComplete="current-password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          error={fieldErrors.currentPassword}
        />
        <PasswordField
          label="New password"
          autoComplete="new-password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          error={fieldErrors.newPassword}
          hint="At least 8 characters with a letter and a number."
        />
        <PasswordField
          label="Confirm new password"
          autoComplete="new-password"
          value={confirmation}
          onChange={(e) => setConfirmation(e.target.value)}
          error={fieldErrors.newPasswordConfirmation}
        />
        <SubmitButton loading={submitting} className="w-full py-2.5">
          Save new password
        </SubmitButton>
      </form>
    </AuthCard>
  );
}
