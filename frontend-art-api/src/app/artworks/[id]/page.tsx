import { getArtwork } from '@/api-services/artworkService';
import { iiifThumbUrl } from '@/utils/iiif';
import BackButton from './BackButton';

export default async function ArtworkDetail({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const artwork = await getArtwork(Number(id));

    if (!artwork) {
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Artwork Not Found</h1>
                    <BackButton />
                </div>
            </div>
        );
    }

    const imageUrl = artwork.image_id
        ? iiifThumbUrl(artwork.image_id, 843)
        : 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect fill="%23ddd" width="800" height="600"/%3E%3C/svg%3E';

    return (
        <div className="flex flex-col md:flex-row min-h-[calc(100vh-64px)] bg-white">
            {/* Left side: Information (50%) */}
            <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-20 flex flex-col justify-start">
                <BackButton />

                <div className="mt-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                        {artwork.title}
                    </h1>

                    <p className="text-xl text-[#C3122A] font-medium mb-6">
                        {artwork.artist_display || 'Unknown Artist'}
                    </p>

                    <div className="space-y-4 text-gray-700">
                        {artwork.date_display && (
                            <div>
                                <span className="font-semibold text-gray-900">Date:</span> {artwork.date_display}
                            </div>
                        )}

                        {artwork.place_of_origin && (
                            <div>
                                <span className="font-semibold text-gray-900">Origin:</span> {artwork.place_of_origin}
                            </div>
                        )}

                        {artwork.alt_titles && artwork.alt_titles.length > 0 && (
                            <div>
                                <span className="font-semibold text-gray-900">Also known as:</span> {artwork.alt_titles.join(', ')}
                            </div>
                        )}
                    </div>

                    {artwork.short_description && (
                        <div className="mt-8 pt-8 border-t border-gray-100">
                            <h3 className="font-semibold text-gray-900 mb-3 text-lg">About</h3>
                            <div
                                className="prose prose-sm text-gray-600 leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: artwork.short_description }}
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Right side: Large Image (50%) */}
            <div className="w-full md:w-1/2 bg-gray-50 flex items-center justify-center p-8 min-h-[50vh] md:min-h-full border-l border-gray-100 relative">
                <div className="relative w-full h-full flex items-center justify-center">
                    <img
                        src={imageUrl}
                        alt={artwork.title}
                        className="max-w-full max-h-[80vh] object-contain shadow-2xl rounded-sm"
                    />
                </div>
            </div>
        </div>
    );
}
