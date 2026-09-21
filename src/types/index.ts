export type Locale = "hy" | "en" | "ru" | "fr" | "es";

/** A field that stores the same content in multiple languages. */
export type LocalizedText = Partial<Record<Locale, string>>;

export type PublishStatus = "draft" | "published";

export interface Service {
  id: string;
  slug: string;
  categorySlug?: string;
  title: LocalizedText;
  shortDescription: LocalizedText;
  fullDescription: LocalizedText;
  inclusions: LocalizedText[];
  addOns: LocalizedText[];
  coverImage?: string;
  gallery: string[];
  status: PublishStatus;
  sortOrder: number;
  seoTitle?: LocalizedText;
  seoDescription?: LocalizedText;
}

export type EventType =
  | "wedding"
  | "destination_wedding"
  | "baptism"
  | "birthday"
  | "engagement"
  | "proposal"
  | "gender_reveal"
  | "corporate"
  | "private"
  | "other";

export interface PortfolioItem {
  id: string;
  slug: string;
  eventType: EventType;
  location?: string;
  eventDate?: string;
  title: LocalizedText;
  shortDescription: LocalizedText;
  fullDescription: LocalizedText;
  coverImage?: string;
  gallery: string[];
  videoUrl?: string;
  isFeatured: boolean;
  status: PublishStatus;
}

export interface Testimonial {
  id: string;
  clientName: string;
  eventType?: string;
  quote: LocalizedText;
  photo?: string;
  status: PublishStatus;
}

export interface FAQ {
  id: string;
  question: LocalizedText;
  answer: LocalizedText;
  pageScope?: string;
  status: PublishStatus;
}

export interface LeadFormOption {
  field: "event_type" | "budget_range";
  value: string;
  label: LocalizedText;
  sortOrder: number;
}

export interface LeadInput {
  full_name: string;
  event_type: string;
  event_location: string;
  guest_count: number;
  email: string;
  phone: string;
  budget_range: string;
  additional_information?: string;
  privacy_consent: boolean;
  source?: string;
  /** honeypot field — must stay empty; used for basic bot filtering */
  website?: string;
}

export type LeadStatus =
  | "new"
  | "contacted"
  | "qualified"
  | "proposal_sent"
  | "booked"
  | "completed"
  | "lost";
