export interface NewsItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  imageUrl?: string;
  tags: string[];
  category: string;
  featured: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio: string;
  imageUrl?: string;
  email?: string;
  linkedin?: string;
  twitter?: string;
  area: string; // Área de práctica (Desarrollo, Diseño, Marketing, etc.)
  city: string; // Ciudad (Madrid, Barcelona, Remoto)
  level: string; // Nivel (Director, Senior, Mid, Junior)
  order: number;
}

export interface SiteMetadata {
  title: string;
  description: string;
  url: string;
  image: string;
  author: string;
}
