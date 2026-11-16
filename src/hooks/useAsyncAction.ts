'use client';

import { useCallback, useRef, useState } from 'react';

import { ApiError, isCancelled } from '@/lib/api/errors';
import { useSnackbar } from '@/providers/SnackbarProvider';

export type FieldErrorMap = Record<string, string | undefined>;

interface RunOptions {
  /** snackbar shown when the action succeeds */
  success?: string;
  /** a 422 answer: the field errors for the form (the snackbar also shows the first one) */
  onValidation?: (errors: FieldErrorMap) => void;
  /** message used when the error has no safe message of its own */
  fallback?: string;
}

/**
 * Runs a user action (save, delete, mark ...) with the error handling every screen needs:
 *   - one run at a time (a double click does nothing),
 *   - `pending` for spinners and disabled buttons,
 *   - success snackbar, field errors on 422, error snackbar for everything else,
 *   - never throws: returns true when the action succeeded.
 *
 *   const { run, pending } = useAsyncAction();
 *   const ok = await run(() => classService.create(input), { success: 'Class added.', onValidation: setErrors });
 */
export function useAsyncAction() {
  const snackbar = useSnackbar();
  const [pending, setPending] = useState(false);
  const busy = useRef(false);

  const run = useCallback(
    async (action: () => Promise<unknown>, options: RunOptions = {}): Promise<boolean> => {
      if (busy.current) return false;
      busy.current = true;
      setPending(true);
      options.onValidation?.({});
      try {
        await action();
        if (options.success) snackbar.success(options.success);
        return true;
      } catch (error) {
        if (isCancelled(error)) return false;
        if (error instanceof ApiError && error.isValidation) {
          const fields = error.firstErrors();
          options.onValidation?.(fields);
          // the snackbar names the first problem, so it is clear even for a field the form does not show
          snackbar.error(Object.values(fields).find(Boolean) ?? error.message);
        } else {
          snackbar.fromError(error, options.fallback);
        }
        return false;
      } finally {
        busy.current = false;
        setPending(false);
      }
    },
    [snackbar],
  );

  return { run, pending };
}
