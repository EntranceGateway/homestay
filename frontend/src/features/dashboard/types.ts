export interface Room {
  title: string;
  description: string;
  image: string;
  offset?: boolean;
}

export interface Package {
  icon: string;
  title: string;
  duration: string;
  description: string;
  featured: boolean;
}

export interface Wildlife {
  name: string;
  image: string;
}
