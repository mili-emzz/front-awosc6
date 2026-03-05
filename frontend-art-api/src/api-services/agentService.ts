import {Agent} from '@/models/Agents';
import { urlApi } from './artworkService';

export async function getAgents(page: number, limit: number): Promise<Agent[]> {
    const res = await fetch(`${urlApi}agents?page=${page}&limit=${limit}`);
    const data = await res.json() as { data: Agent[] };

    return data.data.map( a => ({
        id: a.id,
        title: a.title,
        is_artist: a.is_artist,
        birth_date: a.birth_date,
        death_date: a.death_date,
        description: a.description,
    }))
}

export async function getAgent(id: number): Promise<Agent | null> {
    const res = await fetch(`${urlApi}agents/${id}`);
    if (!res.ok) {
        return null;
    }
    const data = await res.json() as { data: Agent };
    return data.data;
}

export async function getAgentSearch (query: string): Promise<Agent[]> {
    const res = await fetch(`${urlApi}agents/search?q=${encodeURIComponent(query)}`);
    const data = await res.json() as { data: Agent[] };
    return data.data;
}