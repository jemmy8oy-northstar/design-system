import { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';
import { cn } from '../utils/cn';
import './Button.css';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual emphasis. Defaults to `primary`. */
  variant?: ButtonVariant;
  /** Control height/padding. Defaults to `md`. */
  size?: ButtonSize;
  /** Stretch to fill the container width. */
  fullWidth?: boolean;
}

/**
 * Button — the primary action control.
 *
 * Reads only semantic tokens, so it re-skins with the active theme. Ships an
 * on-brand `:focus-visible` ring and a disabled state; forwards its ref.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', fullWidth = false, className, type, children, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type ?? 'button'}
      className={cn(
        'ds-button',
        `ds-button--${variant}`,
        `ds-button--${size}`,
        fullWidth && 'ds-button--block',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
});
