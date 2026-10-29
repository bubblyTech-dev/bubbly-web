import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui';
import { paths } from '@/config/paths';

export default function NotFound() {
  return (
    <Container className="py-24 text-center">
      <h1>Page not found</h1>
      <p className="mt-3 text-muted">The page you are looking for does not exist.</p>
      <Button href={paths.home} className="mt-6">
        Back to home
      </Button>
    </Container>
  );
}
