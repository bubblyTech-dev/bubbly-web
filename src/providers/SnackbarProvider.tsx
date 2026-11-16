'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { AlertCircle, AlertTriangle, CheckCircle2, Info, X } from 'lucide-react';

import { errorMessage, isCancelled } from '@/lib/api/errors';
import { apiEvents } from '@/lib/api/events';

type Variant = 'success' | 'error' | 'warning' | 'info';

interface SnackbarOptions {
  /** ms before it closes by itself; 0 keeps it until closed (default 4s, errors 6s) */
  duration?: number;
  action?: { label: string; onClick: () => void };
}

interface Snack extends SnackbarOptions {
  id: number;
  message: string;
  variant: Variant;
}

interface SnackbarApi {
  show: (message: string, variant?: Variant, options?: SnackbarOptions) => number;
  success: (message: string, options?: SnackbarOptions) => number;
  error: (message: string, options?: SnackbarOptions) => number;
  warning: (message: string, options?: SnackbarOptions) => number;
  info: (message: string, options?: SnackbarOptions) => number;
  /** Shows the safe message of any thrown error (ApiError or not). Cancelled requests are ignored. */
  fromError: (error: unknown, fallback?: string) => void;
  dismiss: (id: number) => void;
}

const MAX_VISIBLE = 3;
const icons = { success: CheckCircle2, error: AlertCircle, warning: AlertTriangle, info: Info };

const SnackbarContext = createContext<SnackbarApi | null>(null);

export function SnackbarProvider({ children }: { children: ReactNode }) {
  const [snacks, setSnacks] = useState<Snack[]>([]);
  const nextId = useRef(1);
  const timers = useRef(new Map<number, ReturnType<typeof setTimeout>>());

  const dismiss = useCallback((id: number) => {
    const timer = timers.current.get(id);
    if (timer) clearTimeout(timer);
    timers.current.delete(id);
    setSnacks((prev) => prev.filter((snack) => snack.id !== id));
  }, []);

  const show = useCallback(
    (message: string, variant: Variant = 'info', options: SnackbarOptions = {}) => {
      const id = nextId.current++;
      setSnacks((prev) => {
        // the same message twice in a row (double click, two failing requests) shows once
        const withoutDuplicate = prev.filter(
          (snack) => !(snack.message === message && snack.variant === variant),
        );
        return [...withoutDuplicate, { id, message, variant, ...options }].slice(-MAX_VISIBLE);
      });
      const duration = options.duration ?? (variant === 'error' ? 6000 : 4000);
      if (duration > 0)
        timers.current.set(
          id,
          setTimeout(() => dismiss(id), duration),
        );
      return id;
    },
    [dismiss],
  );

  const api = useMemo<SnackbarApi>(
    () => ({
      show,
      success: (message, options) => show(message, 'success', options),
      error: (message, options) => show(message, 'error', options),
      warning: (message, options) => show(message, 'warning', options),
      info: (message, options) => show(message, 'info', options),
      fromError: (error, fallback) => {
        if (isCancelled(error)) return;
        show(errorMessage(error, fallback), 'error');
      },
      dismiss,
    }),
    [show, dismiss],
  );

  // app-wide API states announced by the axios interceptors
  useEffect(
    () =>
      apiEvents.on((event) => {
        if (event.type === 'sessionExpired')
          show('Your session has expired. Please log in again.', 'warning');
        if (event.type === 'subscriptionInactive')
          show(event.message, 'warning', { duration: 8000 });
        if (event.type === 'passwordChangeRequired')
          show('Please change your password to continue.', 'warning');
      }),
    [show],
  );

  // safety net: an async error nobody caught still tells the user something went wrong instead of failing silently
  useEffect(() => {
    const onUnhandled = (event: PromiseRejectionEvent) => {
      if (isCancelled(event.reason)) return;
      console.error('Unhandled error', event.reason);
      show(errorMessage(event.reason), 'error');
    };
    window.addEventListener('unhandledrejection', onUnhandled);
    return () => window.removeEventListener('unhandledrejection', onUnhandled);
  }, [show]);

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach((timer) => clearTimeout(timer));
  }, []);

  return (
    <SnackbarContext.Provider value={api}>
      {children}
      <div className="snackbar-stack" aria-live="polite">
        {snacks.map((snack) => {
          const Icon = icons[snack.variant];
          return (
            <div
              key={snack.id}
              role={snack.variant === 'error' ? 'alert' : 'status'}
              className={`snackbar snackbar--${snack.variant}`}
            >
              <Icon className="snackbar__icon" aria-hidden />
              <div className="snackbar__body">{snack.message}</div>
              {snack.action ? (
                <button
                  type="button"
                  className="snackbar__action"
                  onClick={() => {
                    snack.action?.onClick();
                    dismiss(snack.id);
                  }}
                >
                  {snack.action.label}
                </button>
              ) : null}
              <button
                type="button"
                className="snackbar__close"
                aria-label="Close"
                onClick={() => dismiss(snack.id)}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          );
        })}
      </div>
    </SnackbarContext.Provider>
  );
}

export function useSnackbar() {
  const context = useContext(SnackbarContext);
  if (!context) throw new Error('useSnackbar must be used inside <SnackbarProvider>.');
  return context;
}
