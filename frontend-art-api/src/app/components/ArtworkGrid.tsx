"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import { getArtworks } from "@/api-services/artworkService";
import ArtworkCard from "./ArtworkCard";
import { Artwork } from "@/models/Artwork";

export default function ArtworkGrid() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);

  useEffect(() => {
    async function loadArtworks() {
      const data = await getArtworks(1, 15);
      setArtworks(data);
    }

    loadArtworks();
  }, []);

  return (
    <section className="w-full py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {artworks.map((artwork) => (
            <Link key={artwork.id} href={`/artworks/${artwork.id}`}>
              <ArtworkCard artwork={artwork} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}