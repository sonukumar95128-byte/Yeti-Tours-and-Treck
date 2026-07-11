import fs from "fs";
import JSZip from "jszip";

function decodeEntities(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");
}

export async function extractDocxText(filePath: string): Promise<string[]> {
  const buffer = fs.readFileSync(filePath);
  const zip = await JSZip.loadAsync(buffer);
  const xmlFile = zip.file("word/document.xml");
  if (!xmlFile) return [];
  const xml = await xmlFile.async("string");

  const withBreaks = xml.replace(/<w:p[ >]/g, "\n<w:p ");
  const stripped = withBreaks.replace(/<[^>]+>/g, "");
  const text = decodeEntities(stripped);

  return text
    .split("\n")
    .map((l) => l.replace(/\s+/g, " ").trim())
    .filter(Boolean);
}

const KNOWN_PLACES = [
  "Paro",
  "Thimphu",
  "Punakha",
  "Bumthang",
  "Haa",
  "Phobjikha",
  "Trongsa",
  "Gangtey",
  "Wangdue",
  "Dochula",
];

export interface ParsedTour {
  title: string;
  overview: string;
  summary: string;
  locations: string;
  itinerary: { dayNumber: number; title: string; description: string }[];
}

export function parseTourLines(lines: string[]): ParsedTour {
  const title = lines[0] ?? "Untitled Tour";
  const dayHeader = /^DAY\s*(\d+)\s*:?\s*(.*)$/i;

  const firstDayIdx = lines.findIndex((l) => dayHeader.test(l));
  const introLines = lines.slice(1, firstDayIdx === -1 ? lines.length : firstDayIdx);
  const overview = introLines.join(" ").trim();
  const summary = overview.length > 220 ? overview.slice(0, 217).trim() + "..." : overview;

  const itinerary: ParsedTour["itinerary"] = [];
  if (firstDayIdx !== -1) {
    let current: { dayNumber: number; title: string; description: string[] } | null = null;
    for (let i = firstDayIdx; i < lines.length; i++) {
      const line = lines[i];
      const match = line.match(dayHeader);
      if (match) {
        if (current) {
          itinerary.push({ ...current, description: current.description.join("\n") } as never);
        }
        const dayNumber = parseInt(match[1], 10);
        const rest = match[2].trim();
        current = { dayNumber, title: rest, description: [] };
      } else if (current) {
        if (!current.title) {
          current.title = line;
        } else {
          current.description.push(line);
        }
      }
    }
    if (current) {
      itinerary.push({ ...current, description: current.description.join("\n") } as never);
    }
  }

  const haystack = (title + " " + overview + " " + itinerary.map((d) => d.title + " " + d.description).join(" ")).toLowerCase();
  const foundPlaces = KNOWN_PLACES.filter((p) => haystack.includes(p.toLowerCase()));
  const locations = foundPlaces.length > 0 ? foundPlaces.join(", ") : "Bhutan";

  return { title, overview, summary, locations, itinerary };
}

export function parseDuration(filename: string): { days: number; nights: number } {
  const nd = filename.match(/(\d+)\s*N\s*(\d+)\s*D/i);
  if (nd) return { nights: parseInt(nd[1], 10), days: parseInt(nd[2], 10) };
  const days = filename.match(/(\d+)\s*DAYS?/i);
  if (days) {
    const d = parseInt(days[1], 10);
    return { days: d, nights: Math.max(d - 1, 0) };
  }
  return { days: 1, nights: 0 };
}

export function inferCategory(filename: string): "cultural" | "spiritual" | "luxury" | "trekking" {
  const f = filename.toLowerCase();
  if (f.includes("trek")) return "trekking";
  if (f.includes("spiritual")) return "spiritual";
  if (f.includes("luxury") || f.includes("signature") || f.includes("exotic")) return "luxury";
  return "cultural";
}
