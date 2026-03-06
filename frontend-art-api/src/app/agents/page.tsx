'use client';

import { useEffect, useState } from 'react';
import { getAgents } from '@/api-services/agentService';
import { Agent } from '@/models/Agents';
import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense } from 'react';

function AgentsList() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const pageParam = searchParams.get('page');
    const initialPage = pageParam ? parseInt(pageParam, 10) : 1;

    const [agents, setAgents] = useState<Agent[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(initialPage);
    const limit = 10;

    useEffect(() => {
        async function loadAgents() {
            setLoading(true);
            try {
                const data = await getAgents(page, limit);
                setAgents(data);
                // Sync URL
                router.push(`/agents?page=${page}`);
            } catch (error) {
                console.error("Failed to fetch agents", error);
            } finally {
                setLoading(false);
            }
        }
        loadAgents();
    }, [page, router]);

    if (loading && agents.length === 0) {
        return <div className="text-center py-10">Loading Agents...</div>;
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Agents</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {agents.map((agent) => (
                    <div key={agent.id} className="bg-white border rounded p-6 shadow-sm hover:shadow-md transition flex flex-col h-full">
                        <h3 className="font-bold text-xl text-[#C3122A] mb-1">{agent.title}</h3>

                        <div className="text-sm text-gray-500 mb-4 pb-4 border-b">
                            <span className="inline-block bg-gray-100 rounded px-2 py-1 mr-2 text-xs font-semibold">
                                {agent.is_artist ? 'ARTIST' : 'AGENT'}
                            </span>
                            {(agent.birth_date || agent.death_date) && (
                                <span>{agent.birth_date || '?'} - {agent.death_date || 'Present'}</span>
                            )}
                        </div>

                        <div className="flex-grow">
                            {agent.description ? (
                                <div
                                    className="text-sm text-gray-700 line-clamp-4 leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: agent.description }}
                                />
                            ) : (
                                <p className="text-sm text-gray-400 italic">No description available.</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center items-center space-x-6">
                <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-6 py-2 bg-[#C3122A] text-white rounded font-medium disabled:opacity-50 disabled:bg-gray-400 hover:bg-red-800 transition-colors"
                >
                    Previous
                </button>
                <span className="font-semibold text-gray-700">Page {page}</span>
                <button
                    onClick={() => setPage((p) => p + 1)}
                    // Disable next mostly if we got less than requested limit
                    disabled={loading || agents.length < limit}
                    className="px-6 py-2 bg-[#C3122A] text-white rounded font-medium disabled:opacity-50 disabled:bg-gray-400 hover:bg-red-800 transition-colors"
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default function AgentsPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <Suspense fallback={<div className="text-center py-10">Loading Agents...</div>}>
                <AgentsList />
            </Suspense>
        </div>
    );
}
