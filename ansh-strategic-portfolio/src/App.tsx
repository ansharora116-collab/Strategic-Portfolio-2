import { Nav } from './sections/Nav';
import { Hero } from './sections/Hero';
import { Approach } from './sections/Approach';
import { Marketing } from './sections/Marketing';
import { Work } from './sections/Work';
import { Reflection } from './sections/Reflection';
import { Capabilities } from './sections/Capabilities';
import { BehindTheMoves } from './sections/BehindTheMoves';
import { Journey } from './sections/Journey';
import { Achievements } from './sections/Achievements';
import { Closing } from './sections/Closing';

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Nav />
      <span id="top" />
      <main id="main">
        <Hero />
        <Approach />
        <Marketing />
        <Work />
        <Reflection />
        <Capabilities />
        <BehindTheMoves />
        <Journey />
        <Achievements />
        <Closing />
      </main>
    </>
  );
}
