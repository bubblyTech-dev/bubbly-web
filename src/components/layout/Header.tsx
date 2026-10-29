import Link from 'next/link';

import { Logo } from '@/components/common/Logo';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui';
import { marketingNav } from '@/config/navigation';
import { paths } from '@/config/paths';

export function Header() {
  return (
    <header className="site-header">
      <Container className="site-header__inner">
        <Logo />
        <nav aria-label="Main" className="site-header__nav">
          {marketingNav.map((item) => (
            <Link key={item.href} href={item.href} className="site-header__link">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button href={paths.auth.login} variant="ghost" size="sm">
            Log in
          </Button>
          <Button href={paths.auth.register} size="sm">
            Get started
          </Button>
        </div>
      </Container>
    </header>
  );
}
