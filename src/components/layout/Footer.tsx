import { Container } from '@/components/layout/Container';
import { siteConfig } from '@/config/site';

export function Footer() {
  return (
    <footer className="site-footer">
      <Container>
        <p>
          &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
