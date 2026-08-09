import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';
import { cn } from '../utils/cn';
import './Card.css';

export type CardElevation = 'flat' | 'raised';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** `flat` = hairline border only; `raised` = soft shadow. Defaults to `raised`. */
  elevation?: CardElevation;
  /** Add hover lift (for clickable cards). */
  interactive?: boolean;
  /** Remove the default inner padding. */
  padded?: boolean;
}

/** Card — a rounded surface for grouping content. Reads only semantic tokens. */
export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { elevation = 'raised', interactive = false, padded = true, className, children, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(
        'ds-card',
        `ds-card--${elevation}`,
        interactive && 'ds-card--interactive',
        padded && 'ds-card--padded',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
});
