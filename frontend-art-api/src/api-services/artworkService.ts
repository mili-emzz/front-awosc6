import { Artwork } from '@/models/Artwork';
export const urlApi = 'https://api.artic.edu/api/v1/'

export async function getArtworks(page: number, limit: number): Promise<Artwork[]> {
    const res = await fetch(`${urlApi}artworks?page=${page}&limit=${limit}`);
    const data = await res.json() as { data: Artwork[] };

    return data.data.map( a => ({
        id: a.id,
        title: a.title,
        alt_titles: a.alt_titles,
        date_display: a.date_display,
        short_description: a.short_description,
        thumbnail: a.thumbnail,
        image_id: a.image_id,
        artist_title: a.artist_title,
        artist_display: a.artist_display,
        place_of_origin: a.place_of_origin,
    }))
}

export async function getArtwork(id: number): Promise<Artwork | null> {
    const res = await fetch(`${urlApi}artworks/${id}`);
    if (!res.ok) {
        return null;
    }
    const data = await res.json() as { data: Artwork };
    return data.data;
}

export async function getArtworkSearch(query: string): Promise<Artwork[]> {
    const res = await fetch(`${urlApi}artworks/search?q=${encodeURIComponent(query)}`);
    const data = await res.json() as { data: Artwork[] };
    return data.data;
}