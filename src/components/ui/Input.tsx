import { useId, type ComponentProps } from 'react';

import { cn } from '@/lib/cn';

interface InputProps extends ComponentProps<'input'> {
  label: string;
  hint?: string;
  error?: string;
}

export function Input({ label, hint, error, className, id, ...rest }: InputProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const describedBy = error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined;

  return (
    <div className="field">
      <label htmlFor={inputId} className="field__label">
        {label}
      </label>
      <input
        id={inputId}
        className={cn('input', className)}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        {...rest}
      />
      {error ? (
        <p id={`${inputId}-error`} className="field__error">
          {error}
        </p>
      ) : hint ? (
        <p id={`${inputId}-hint`} className="field__hint">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
