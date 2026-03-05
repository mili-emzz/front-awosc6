// IIIF thumbnail metadata returned by the public API.
// The API provides metadata for the thumbnail image, but you build the URL using image_id.
export interface IIIFThumbnail {
    lqip: string; // Low-quality image placeholder (base64-encoded GIF)
    width?: number;
    height?: number;
    alt_text?: string;
}

export interface Artwork {
    id: number;
    title: string;
    alt_titles: string[] | null;
    date_display: string;
    short_description: string;
    thumbnail: IIIFThumbnail;

    image_id: string; // Used to build IIIF URLs

    artist_title: string;
    artist_display: string;
    place_of_origin: string;

}
