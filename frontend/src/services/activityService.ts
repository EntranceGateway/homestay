import type { ActivityItem } from '@/types/activity';
import { getApiBaseUrl } from '@/lib/apiBase';

const API_BASE = getApiBaseUrl();

export const FALLBACK_ACTIVITIES: ActivityItem[] = [
  {
    id: 1,
    title: 'Jeep Safari',
    slug: 'jeep-safari',
    icon: '🚙',
    short_description: 'Discover the diverse landscapes of Bardia National Park on a guided jeep safari.',
    description: 'Discover the diverse landscapes of Bardia National Park on a guided jeep safari. Travel deep into the wilderness in search of Royal Bengal Tigers, Greater One-horned Rhinoceroses, Wild Asian Elephants, Leopards, Sloth Bears, and many other species while learning about the park’s unique ecosystem from experienced naturalist guides.',
    display_order: 1,
    is_active: true,
  },
  {
    id: 2,
    title: 'Guided Walking Safari',
    slug: 'guided-walking-safari',
    icon: '🥾',
    short_description: 'Experience the jungle at ground level with our expert local guides.',
    description: 'Experience the jungle at ground level with our expert local guides. Follow fresh animal tracks, listen to alarm calls, and gain a deeper understanding of wildlife behavior while exploring one of Nepal’s finest tiger habitats.',
    display_order: 2,
    is_active: true,
  },
  {
    id: 3,
    title: 'River Safari & Rafting',
    slug: 'river-safari-rafting',
    icon: '🚣‍♂️',
    short_description: 'Drift silently along the Karnali & Babai Rivers observing aquatic wildlife.',
    description: 'Drift silently along the pristine waters of the Karnali & Babai Rivers. A river safari provides an unrivaled perspective for spotting Gangetic dolphins, Marsh Mugger crocodiles, Gharials, and rare migratory waterbirds drinking along riverbanks.',
    display_order: 3,
    is_active: true,
  },
  {
    id: 4,
    title: 'Birdwatching Tour',
    slug: 'birdwatching-tour',
    icon: '🦅',
    short_description: 'Discover over 400 species of resident and migratory birds in Bardia.',
    description: 'Bardia National Park is a haven for ornithologists and bird lovers. Join our specialist naturalist guides to spot rare species such as the Bengal Florican, Sarus Crane, Great Hornbill, Osprey, and colorful kingfishers.',
    display_order: 4,
    is_active: true,
  },
  {
    id: 5,
    title: 'Night Jungle Walk',
    slug: 'night-jungle-walk',
    icon: '🌌',
    short_description: 'Explore the nocturnal world of Bardia after dusk with expert naturalists.',
    description: 'Venture into buffer zone forests after nightfall with certified jungle guides. Witness the nocturnal sounds and sights of the wild, including nightjars, owls, civets, flying squirrels, and glowing insects.',
    display_order: 5,
    is_active: true,
  },
  {
    id: 6,
    title: 'Elephant Breeding Center & Village Tour',
    slug: 'elephant-center-tour',
    icon: '🐘',
    short_description: 'Visit the elephant conservation center and learn about elephant care.',
    description: 'Take a cultural stroll to the nearby Elephant Breeding Center. Learn how elephant calves are nurtured and bond with mother elephants, followed by a walk through local Tharu villages.',
    display_order: 6,
    is_active: true,
  },
  {
    id: 7,
    title: 'Tiger Tracking Expedition',
    slug: 'tiger-tracking-expedition',
    icon: '🐅',
    short_description: 'A multi-day intensive search for the Royal Bengal Tiger with senior trackers.',
    description: 'Dedicated to wildlife enthusiasts seeking an encounter with the Royal Bengal Tiger. Spend extended hours at proven tiger hideouts, waterholes, and river crossings led by veteran trackers with decades of field experience.',
    display_order: 7,
    is_active: true,
  },
  {
    id: 8,
    title: 'Fishing Expedition',
    slug: 'fishing-expedition',
    icon: '🎣',
    short_description: 'Catch-and-release fishing for the legendary Golden Mahseer in Karnali river.',
    description: 'Test your angling skills against the legendary Golden Mahseer in the fast-flowing waters of the Karnali River. We practice eco-friendly catch-and-release angling guided by expert local rivermen.',
    display_order: 8,
    is_active: true,
  },
  {
    id: 9,
    title: 'Camping Safari',
    slug: 'camping-safari',
    icon: '🏕️',
    short_description: 'Sleep under the jungle stars in safe, guided wilderness wilderness camps.',
    description: 'Spend an unforgettable night under canvas in the wilderness buffer zone. Enjoy a campfire dinner, listen to nocturnal animal calls, and wake up to the dawn chorus of birds in the heart of nature.',
    display_order: 9,
    is_active: true,
  },
  {
    id: 10,
    title: 'Tharu Cultural Experience',
    slug: 'tharu-cultural-experience',
    icon: '🪘',
    short_description: 'Immerse yourself in authentic Tharu dance, architecture, and traditions.',
    description: 'Discover the rich indigenous heritage of the local Tharu community. Enjoy traditional stick dances, explore mud-and-thatch architecture, try traditional Tharu cuisine, and gain insights into local life.',
    display_order: 10,
    is_active: true,
  },
  {
    id: 11,
    title: 'Photography Safari',
    slug: 'photography-safari',
    icon: '📸',
    short_description: 'Tailored safari for wildlife photographers with optimal lighting & positions.',
    description: 'Designed specifically for professional and amateur wildlife photographers. Paced slowly with customized vehicle positioning and patience at prime hides to capture stunning wildlife portraits in natural light.',
    display_order: 11,
    is_active: true,
  },
  {
    id: 12,
    title: 'Tree House Overnight Stay',
    slug: 'tree-house-stay',
    icon: '🏡',
    short_description: 'Elevated machan viewtower stay overlooking jungle glades and wildlife paths.',
    description: 'Spend the night in an elevated wooden treehouse (machan) inside the buffer zone. Watch wildlife gather at nearby waterholes in complete safety and peace as the sun sets over Bardia.',
    display_order: 12,
    is_active: true,
  },
];

export async function fetchActivitiesList(): Promise<ActivityItem[]> {
  try {
    const res = await fetch(`${API_BASE}/activities/list`);
    if (!res.ok) {
      console.warn(`Activities API returned status ${res.status}, using fallback list.`);
      return FALLBACK_ACTIVITIES;
    }
    const json = await res.json();
    if (json.status === 'success' && Array.isArray(json.data) && json.data.length > 0) {
      return json.data;
    }
    return FALLBACK_ACTIVITIES;
  } catch (err) {
    console.error('Error fetching activities list:', err);
    return FALLBACK_ACTIVITIES;
  }
}

export async function fetchActivityDetail(slugOrId: string | number): Promise<ActivityItem> {
  const queryParam = typeof slugOrId === 'number' ? `id=${slugOrId}` : `slug=${encodeURIComponent(slugOrId)}`;
  try {
    const res = await fetch(`${API_BASE}/activities/get?${queryParam}`);
    if (res.ok) {
      const json = await res.json();
      if (json.status === 'success' && json.data) {
        return json.data;
      }
    }
  } catch (err) {
    console.error(`Error fetching activity detail for ${slugOrId}:`, err);
  }

  // Fallback to local list if fetch fails
  const found = FALLBACK_ACTIVITIES.find(
    (a) => a.slug === String(slugOrId) || a.id === Number(slugOrId)
  );
  return (
    found || {
      id: 0,
      title: 'Wildlife Activity',
      slug: String(slugOrId),
      icon: '🌿',
      short_description: 'Explore the amazing wildlife of Bardia National Park.',
      description: 'Explore the amazing wildlife of Bardia National Park with our expert naturalist guides.',
    }
  );
}
