export type Track = 'fullstack' | 'aiml' | 'mern';
export type Status = 'shipped' | 'in-progress' | 'planned';

export interface Project {
  id: string;
  code: string;
  title: string;
  track: Track;
  status: Status;
  summary: string;
  stack: string[];
  month: number | null;
  repoUrl: string | null;
  liveUrl: string | null;
  featured: boolean;
  order: number;
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  accent: string;
  published: boolean;
  publishedAt: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
}

// Each track carries its own colour identity — colour encodes meaning here.
export const trackTheme: Record<
  Track,
  { label: string; from: string; to: string; ring: string; text: string; soft: string }
> = {
  fullstack: {
    label: 'Full-Stack',
    from: 'from-indigo',
    to: 'to-blue',
    ring: 'ring-indigo/30',
    text: 'text-indigo',
    soft: 'bg-indigo/10',
  },
  aiml: {
    label: 'AI / ML',
    from: 'from-teal',
    to: 'to-emerald',
    ring: 'ring-teal/30',
    text: 'text-teal',
    soft: 'bg-teal/10',
  },
  mern: {
    label: 'MERN',
    from: 'from-pink',
    to: 'to-amber',
    ring: 'ring-pink/30',
    text: 'text-pink',
    soft: 'bg-pink/10',
  },
};

export const statusTheme: Record<Status, { label: string; chip: string }> = {
  shipped: { label: 'Shipped', chip: 'bg-emerald/15 text-emerald' },
  'in-progress': { label: 'In progress', chip: 'bg-amber/15 text-amber' },
  planned: { label: 'Planned', chip: 'bg-muted/15 text-muted' },
};

// Accent options offered in the CMS post editor.
export const accentOptions = ['indigo', 'violet', 'blue', 'teal', 'emerald', 'pink', 'amber', 'fuchsia'] as const;
