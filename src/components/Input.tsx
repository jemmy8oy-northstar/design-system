import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';
import { cn } from '../utils/cn';
import './Input.css';

export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Control height/padding. Defaults to `md`. */
  size?: InputSize;
  /** Mark the field invalid (also sets `aria-invalid`). */
  invalid?: boolean;
}

/**
 * Input — a single-line text field.
 *
 * Reads only semantic tokens; shows an on-brand focus ring and a danger border
 * when `invalid`. Sets `aria-invalid` for assistive tech. Forwards its ref.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { size = 'md', invalid = false, className, ...rest },
  ref,
) {
  return (
    <input
      ref={ref}
      aria-invalid={invalid || undefined}
      className={cn('ds-input', `ds-input--${size}`, invalid && 'ds-input--invalid', className)}
      {...rest}
    />
  );
});
