import type { ComponentProps } from 'react';

import { cn } from '@/lib/cn';

interface CardProps extends ComponentProps<'div'> {
  elevated?: boolean;
}

export function Card({ elevated, className, ...rest }: CardProps) {
  return <div className={cn('card', elevated && 'card--elevated', className)} {...rest} />;
}
