export interface AboutBlock {
  id: number;
  title: string;
  subtitle: string | null;
  body: string | null;
  image_url: string | null;
  image_alt: string | null;
  icon: string | null;
  // Owner profile only
  phone?: string | null;
  email?: string | null;
  display_order: number;
}

// Shape of GET /api/about/get
export interface AboutContent {
  hero: AboutBlock | null;
  story: AboutBlock | null;
  owner?: AboutBlock | null;
  values: AboutBlock[];
  team: AboutBlock[];
}
