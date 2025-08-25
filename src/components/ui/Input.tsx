import { InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({
  className = '',
  label,
  error,
  id,
  ...props
}: InputProps) {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="high-contrast mb-2 block text-sm font-medium"
        >
          {label}
          {props.required && (
            <span className="ml-1 text-red-500" aria-label="requerido">
              *
            </span>
          )}
        </label>
      )}
      <input
        id={inputId}
        className={`block w-full rounded-lg border px-4 py-3 text-sm placeholder-gray-400 transition-all duration-300 ${
          error
            ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
            : 'focus:border-navy focus:ring-navy border-gray-300'
        } focus:ring-2 focus:ring-offset-1 focus:outline-none ${className}`}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${inputId}-error` : undefined}
        {...props}
      />
      {error && (
        <p
          id={`${inputId}-error`}
          className="mt-2 text-sm text-red-600"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}
