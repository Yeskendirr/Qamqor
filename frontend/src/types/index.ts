export interface NewsItem {
  id: number;
  title: string;
  content: string;
  excerpt: string | null;
  image_url: string | null;
  published_at: string;
  is_published: number;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  status: 'active' | 'completed' | 'paused';
  image_url: string | null;
  start_date: string | null;
  end_date: string | null;
  beneficiaries: number;
  created_at: string;
}

export interface Event {
  id: number;
  title: string;
  description: string;
  event_date: string;
  location: string | null;
  image_url: string | null;
  created_at: string;
}

export interface GalleryItem {
  id: number;
  title: string | null;
  image_url: string;
  category: string;
  uploaded_at: string;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  is_read: number;
  created_at: string;
}

export interface FaqItem {
  id: number;
  question: string;
  answer: string;
  sort_order: number;
}

export interface AboutInfo {
  id: number;
  title: string;
  description: string;
  mission: string | null;
  vision: string | null;
  founded_year: number | null;
  team_count: number | null;
}
