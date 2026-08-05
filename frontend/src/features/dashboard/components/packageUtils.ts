export interface Package {
  id: number;
  category_id?: number;
  icon?: string;
  name: string;
  duration?: string;
  price?: number;
  currency?: string;
  price_note?: string;
  description?: string;
  is_featured?: boolean;
  display_order?: number;
  is_active?: boolean;
  category_name?: string;
  category_slug?: string;
  slug?: string;
  features?: string[];
}

export interface ParsedItineraryDay {
  title: string;
  items: string[];
}

export function parsePackageDetails(pkg: Package) {
  const rawDesc = pkg.description || '';
  const lines = rawDesc
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  // 1. Extract short overview summary
  let summary = '';
  const firstNonDayLine = lines.find(
    (l) =>
      !/^day\s+\d+/i.test(l) &&
      !l.startsWith('*') &&
      !l.includes('⸻') &&
      !/^\d+\s+nights?/i.test(l)
  );

  if (firstNonDayLine) {
    // Clean up typos like "a perfect introduction to BarA Perfect Introduction to Bardia"
    let cleaned = firstNonDayLine;
    if (cleaned.length > 180) {
      cleaned = cleaned.substring(0, 180).trim() + '...';
    }
    summary = cleaned;
  } else {
    summary = 'Experience Bardia National Park with our guided safari and eco-homestay package.';
  }

  // 2. Parse Day-by-Day Itinerary & Clean Highlights
  const itinerary: ParsedItineraryDay[] = [];
  const highlights: string[] = [];

  const features = Array.isArray(pkg.features) ? pkg.features : [];
  let currentDay: ParsedItineraryDay | null = null;

  features.forEach((item) => {
    const trimmed = item.trim();
    if (/^day\s+\d+[:\s–-]/i.test(trimmed)) {
      if (currentDay) itinerary.push(currentDay);
      currentDay = { title: trimmed, items: [] };
    } else if (currentDay) {
      currentDay.items.push(trimmed);
    } else {
      highlights.push(trimmed);
    }
  });
  if (currentDay) itinerary.push(currentDay);

  // If features didn't have day structure, try parsing description lines
  if (itinerary.length === 0 && rawDesc) {
    let descDay: ParsedItineraryDay | null = null;
    lines.forEach((line) => {
      if (/^day\s+\d+[:\s–-]/i.test(line)) {
        if (descDay) itinerary.push(descDay);
        descDay = { title: line, items: [] };
      } else if (line.startsWith('*')) {
        const cleanItem = line.replace(/^\*\s*/, '');
        if (descDay) {
          descDay.items.push(cleanItem);
        } else {
          highlights.push(cleanItem);
        }
      } else if (descDay && !line.includes('⸻') && !/^\d+\s+nights?/i.test(line)) {
        descDay.items.push(line);
      }
    });
    if (descDay) itinerary.push(descDay);
  }

  // Fallback highlights if empty
  if (highlights.length === 0 && itinerary.length === 0) {
    features.forEach((f) => {
      if (!/^day\s+\d+/i.test(f.trim())) {
        highlights.push(f.trim());
      }
    });
  }

  return {
    summary,
    itinerary,
    highlights: highlights.filter((h) => h.length > 0),
  };
}
