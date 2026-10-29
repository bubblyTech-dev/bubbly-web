import Link from 'next/link';
import type { ComponentProps } from 'react';

import { cn } from '@/lib/cn';

type Variant = 'primary' | 'accent' | 'outline' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface BaseProps {
  variant?: Variant;
  size?: Size;
  block?: boolean;
}

type ButtonProps = BaseProps & ComponentProps<'button'> & { href?: undefined };
type LinkButtonProps = BaseProps & Omit<ComponentProps<typeof Link>, 'href'> & { href: string };

function classes({ variant = 'primary', size = 'md', block, className }: BaseProps & { className?: string }) {
  return cn('btn', `btn--${variant}`, `btn--${size}`, block && 'btn--block', className);
}

export function Button(props: ButtonProps | LinkButtonProps) {
  if (props.href !== undefined) {
    const { variant, size, block, className, href, ...rest } = props;
    return <Link href={href} className={classes({ variant, size, block, className })} {...rest} />;
  }
  const { variant, size, block, className, type = 'button', ...rest } = props;
  return <button type={type} className={classes({ variant, size, block, className })} {...rest} />;
}
