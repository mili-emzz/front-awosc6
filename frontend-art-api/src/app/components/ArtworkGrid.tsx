import { getArtworks } from '@/api-services/artworkService';
import ArtworkCard from './ArtworkCard';

export default async function ArtworkGrid() {
  const artworks = await getArtworks(1, 15);

  return (
    <section className="w-full py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {artworks.map((artwork) => (
            <ArtworkCard key={artwork.id} artwork={artwork} />
          ))}
        </div>
      </div>
    </section>
  );
}
