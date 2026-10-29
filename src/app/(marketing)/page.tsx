import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui';
import { paths } from '@/config/paths';

export default function HomePage() {
  return (
    <Container>
      <section className="home-hero">
        <h1>School management, made simple for preschools.</h1>
        <p className="home-hero__lead">Placeholder hero. Final copy and design come from Figma.</p>
        <div className="mt-8 flex gap-3">
          <Button href={paths.auth.register} size="lg">
            Get started
          </Button>
          <Button href={paths.pricing} variant="outline" size="lg">
            View pricing
          </Button>
        </div>
      </section>
    </Container>
  );
}
