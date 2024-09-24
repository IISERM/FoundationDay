export function isGoogleDriveLink(url: string): boolean {
    const pattern = /^https?:\/\/drive\.google\.com\/file\/d\/[a-zA-Z0-9_-]{25,}\/view(\?.*)?$/;
    return pattern.test(url);
}

export function getGoogleDriveImageID(url: string): string | null {
    const pattern = /^https?:\/\/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]{25,})\/view(\?.*)?$/;
    const match = url.match(pattern);
    return match ? match[1] : null;
}
