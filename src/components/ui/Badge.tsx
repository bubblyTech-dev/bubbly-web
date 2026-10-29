import type { ComponentProps } from 'react';

import { cn } from '@/lib/cn';

interface BadgeProps extends ComponentProps<'span'> {
  tone?: 'default' | 'success' | 'warning' | 'danger';
}

export function Badge({ tone = 'default', className, ...rest }: BadgeProps) {
  return <span className={cn('badge', tone !== 'default' && `badge--${tone}`, className)} {...rest} />;
}
