'use client';

import { Artwork } from '@/models/Artwork';
import { iiifThumbUrl } from '@/utils/iiif';

export default function ArtworkCard({ artwork }: { artwork: Artwork }) {
    const imageUrl = artwork.image_id
        ? iiifThumbUrl(artwork.image_id, 400)
        : 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="200"%3E%3Crect fill="%23ddd" width="300" height="200"/%3E%3C/svg%3E';

    return (
        <div className="bg-white border border-gray-200 rounded overflow-hidden shadow-sm hover:shadow-md transition">
            <div className="w-full h-48 overflow-hidden bg-gray-100">
                <img
                    src={imageUrl}
                    alt={artwork.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                />
            </div>

            <div className="p-4">
                <h3 className="font-bold text-black text-sm line-clamp-2 mb-2">
                    {artwork.title}
                </h3>
                <p className="text-xs text-gray-600 line-clamp-1">
                    {artwork.artist_display || 'Unknown Artist'}
                </p>
            </div>
        </div>
    );
}