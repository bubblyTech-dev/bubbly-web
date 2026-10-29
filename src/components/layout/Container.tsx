import type { ComponentProps } from 'react';

import { cn } from '@/lib/cn';

export function Container({ className, ...rest }: ComponentProps<'div'>) {
  return <div className={cn('container-page', className)} {...rest} />;
}
