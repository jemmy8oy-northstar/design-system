import type { HTMLAttributes } from 'react';
import { cn } from '../utils/cn';
import './Badge.css';

export type BadgeTone = 'neutral' | 'primary' | 'success' | 'danger' | 'warning';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Colour role. Defaults to `neutral`. */
  tone?: BadgeTone;
  /** Pill (fully rounded) vs. control-radius. Defaults to pill. */
  pill?: boolean;
}

/** Badge — a small status/label pill. Uses the tinted "subtle" role fills. */
export function Badge({ tone = 'neutral', pill = true, className, children, ...rest }: BadgeProps) {
  return (
    <span
      className={cn('ds-badge', `ds-badge--${tone}`, pill && 'ds-badge--pill', className)}
      {...rest}
    >
      {children}
    </span>
  );
}
