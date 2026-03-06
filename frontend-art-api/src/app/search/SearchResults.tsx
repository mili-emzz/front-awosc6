'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getArtworkSearch } from '@/api-services/artworkService';
import { getAgentSearch } from '@/api-services/agentService';
import { Artwork } from '@/models/Artwork';
import { Agent } from '@/models/Agents';
import ArtworkCard from '@/app/components/ArtworkCard';
import Link from 'next/link';
import LoadingUI from '@/app/components/uistate/LoadingUI';
import ErrorUI from '@/app/components/uistate/ErrorUI';

export default function SearchResults() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q') || '';
    const type = searchParams.get('type') || 'artworks';

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [artworks, setArtworks] = useState<Artwork[]>([]);
    const [agents, setAgents] = useState<Agent[]>([]);
    const [page, setPage] = useState(1);
    const limit = 10;

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            setError(null);
            setPage(1); // reset to page 1 on new search
            try {
                if (type === 'agents') {
                    const res = await getAgentSearch(query);
                    setAgents(res);
                    setArtworks([]);
                } else {
                    const res = await getArtworkSearch(query);
                    setArtworks(res);
                    setAgents([]);
                }
            } catch (err) {
                console.error('Error fetching search results', err);
                setError("We couldn't load the search results. Please try again.");
            } finally {
                setLoading(false);
            }
        }
        if (query) fetchData();
    }, [query, type]);

    const items = type === 'agents' ? agents : artworks;
    const totalPages = Math.ceil(items.length / limit);
    const paginatedItems = items.slice((page - 1) * limit, page * limit);

    if (loading) return <LoadingUI message="Loading results..." />;

    if (error) return (
        <ErrorUI
            title="Error Loading Search"
            message={error}
        />
    );

    if (!query) return <div className="text-center py-10">Please enter a search query.</div>;
    if (items.length === 0) return <div className="text-center py-10">No results found for "{query}".</div>;

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 text-gray-800">
                Search Results for "{query}" <span className="text-gray-500 text-lg font-normal">in {type}</span>
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {type === 'artworks' &&
                    (paginatedItems as Artwork[]).map((artwork) => (
                        <Link key={artwork.id} href={`/artworks/${artwork.id}`}>
                            <ArtworkCard artwork={artwork} />
                        </Link>
                    ))}

                {type === 'agents' &&
                    (paginatedItems as Agent[]).map((agent) => (
                        <div key={agent.id} className="bg-white border rounded p-4 shadow-sm hover:shadow-md transition">
                            <h3 className="font-bold text-lg text-[#C3122A]">{agent.title}</h3>
                            <p className="text-sm text-gray-600 mb-2">
                                {agent.is_artist ? 'Artist' : 'Agent'}
                                {agent.birth_date && ` • ${agent.birth_date} - ${agent.death_date || 'Present'}`}
                            </p>
                            {agent.description && (
                                <p className="text-sm text-gray-700 line-clamp-3" dangerouslySetInnerHTML={{ __html: agent.description }}></p>
                            )}
                        </div>
                    ))}
            </div>

            {totalPages > 1 && (
                <div className="flex justify-center items-center mt-10 space-x-4">
                    <button
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <span>Page {page} of {totalPages}</span>
                    <button
                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}
