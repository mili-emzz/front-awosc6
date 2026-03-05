export function buildIiifImageUrl(
    iiifBase: string,
    options: {
        region?: string;
        size?: string;
        rotation?: string;
        quality?: string; 
        format?: string; // "jpg", "png" etc.
    } = {}
): string {
    const {
        region = "full",
        size = "full",
        rotation = "0",
        quality = "default",
        format = "jpg",
    } = options;
    const base = iiifBase.replace(/\/+$/, "");
    return `${base}/${region}/${size}/${rotation}/${quality}.${format}`;
}

export function iiifThumbUrl(imageId: string, width = 200): string {
    return buildIiifImageUrl(`https://www.artic.edu/iiif/2/${imageId}`, { size: `${width},` });
}
