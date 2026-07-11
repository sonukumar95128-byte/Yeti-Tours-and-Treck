export interface CategoryOption {
  id: string;
  slug: string;
  label: string;
}

export function parseHighlights(json: string | null | undefined): string[] {
  if (!json) return [];
  try {
    const parsed = JSON.parse(json);
    return Array.isArray(parsed) ? parsed.filter((h) => typeof h === "string") : [];
  } catch {
    return [];
  }
}

export function serializeHighlights(highlights: string[]): string {
  return JSON.stringify(highlights.filter(Boolean));
}

export function formatPrice(priceFrom: unknown, priceNote: string | null): string {
  if (priceFrom !== null && priceFrom !== undefined) {
    const n = Number(priceFrom);
    if (!Number.isNaN(n) && n > 0) {
      return `From $${n.toLocaleString("en-US")} per person`;
    }
  }
  return priceNote || "Contact us for a custom quote";
}
