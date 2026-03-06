import Hero from './components/Hero';
import ArtworkGrid from './components/ArtworkGrid';

export default function Home() {
  return (
    <div className="w-full bg-white">
      <Hero />
      <ArtworkGrid/>
    </div>
  );
}
