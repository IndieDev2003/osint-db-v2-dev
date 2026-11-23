export const SITE_URL = (
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://osintengine.space"
).replace(/\/$/, "");

export const SITE_NAME = "OSINT Engine";

export function getCanonicalUrl(path: string) {
    return new URL(path, SITE_URL).toString();
}