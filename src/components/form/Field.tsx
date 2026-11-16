'use client';

import { useId, useState, type ComponentProps, type ReactNode } from 'react';
import { Eye, EyeOff } from 'lucide-react';

import { cn } from '@/lib/cn';

const inputClass =
  'w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-black focus:outline-hidden disabled:bg-gray-50 disabled:text-gray-500 aria-invalid:border-rose-400';

interface FieldShellProps {
  label: string;
  error?: string;
  hint?: string;
  htmlFor: string;
  children: ReactNode;
  className?: string;
}

function FieldShell({ label, error, hint, htmlFor, children, className }: FieldShellProps) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-1 block text-xs font-semibold text-gray-700">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${htmlFor}-error`} className="mt-1 text-[11px] font-medium text-rose-600">
          {error}
        </p>
      ) : hint ? (
        <p className="mt-1 text-[11px] text-gray-400">{hint}</p>
      ) : null}
    </div>
  );
}

type TextFieldProps = Omit<ComponentProps<'input'>, 'id'> & {
  label: string;
  error?: string;
  hint?: string;
  wrapperClassName?: string;
};

export function TextField({
  label,
  error,
  hint,
  className,
  wrapperClassName,
  ...rest
}: TextFieldProps) {
  const id = useId();
  return (
    <FieldShell label={label} error={error} hint={hint} htmlFor={id} className={wrapperClassName}>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(inputClass, className)}
        {...rest}
      />
    </FieldShell>
  );
}

export function PasswordField({
  label,
  error,
  hint,
  className,
  wrapperClassName,
  ...rest
}: TextFieldProps) {
  const id = useId();
  const [visible, setVisible] = useState(false);
  return (
    <FieldShell label={label} error={error} hint={hint} htmlFor={id} className={wrapperClassName}>
      <div className="relative">
        <input
          id={id}
          type={visible ? 'text' : 'password'}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn(inputClass, 'pr-10', className)}
          {...rest}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? 'Hide password' : 'Show password'}
          className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full p-1.5 text-gray-400 transition hover:text-black"
        >
          {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
    </FieldShell>
  );
}

type SelectFieldProps = Omit<ComponentProps<'select'>, 'id'> & {
  label: string;
  error?: string;
  hint?: string;
  wrapperClassName?: string;
};

export function SelectField({
  label,
  error,
  hint,
  className,
  wrapperClassName,
  children,
  ...rest
}: SelectFieldProps) {
  const id = useId();
  return (
    <FieldShell label={label} error={error} hint={hint} htmlFor={id} className={wrapperClassName}>
      <select
        id={id}
        aria-invalid={error ? true : undefined}
        className={cn(inputClass, 'appearance-auto', className)}
        {...rest}
      >
        {children}
      </select>
    </FieldShell>
  );
}

type TextAreaFieldProps = Omit<ComponentProps<'textarea'>, 'id'> & {
  label: string;
  error?: string;
  hint?: string;
  wrapperClassName?: string;
};

export function TextAreaField({
  label,
  error,
  hint,
  className,
  wrapperClassName,
  ...rest
}: TextAreaFieldProps) {
  const id = useId();
  return (
    <FieldShell label={label} error={error} hint={hint} htmlFor={id} className={wrapperClassName}>
      <textarea
        id={id}
        aria-invalid={error ? true : undefined}
        className={cn(inputClass, className)}
        {...rest}
      />
    </FieldShell>
  );
}

export function SubmitButton({
  loading,
  children,
  className,
  ...rest
}: ComponentProps<'button'> & { loading?: boolean }) {
  return (
    <button
      type="submit"
      disabled={loading || rest.disabled}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full bg-black px-5 py-2 text-sm font-semibold text-white shadow-xs transition hover:bg-gray-800 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60',
        className,
      )}
      {...rest}
    >
      {loading ? (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
      ) : null}
      {children}
    </button>
  );
}
