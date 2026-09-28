import BentoGrid from '../components/bento/BentoGrid';
import Colophon from '../components/Colophon';
import Hero from '../components/Hero';
import Masthead from '../components/Masthead';

export default function Home() {
  return (
    <>
      <Masthead />
      <main>
        <Hero />
        <BentoGrid />
      </main>
      <Colophon />
    </>
  );
}
