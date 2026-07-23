// ==============================
// TypeScript Types for HMEC Website
// ==============================

export interface Agency {
  id: string;
  name: string;
  nameEn: string;
  logo: string;
  description: string;
  products: Product[];
  projects: Project[];
  reviews: Review[];
}

export interface Product {
  id: string;
  name: string;
  image: string;
  description: string;
  category: string;
  price?: string;
}

export interface Project {
  id: string;
  title: string;
  image: string;
  description: string;
  agency?: string;
  date: string;
  location: string;
}

export interface Review {
  id: string;
  name: string;
  avatar: string;
  role: string;
  company: string;
  rating: number;
  text: string;
  date: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface Branch {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  workingHours: string;
  mapUrl?: string;
  image: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  quickReplies?: string[];
}

export interface NavLink {
  id: string;
  label: string;
  href: string;
}

export interface AboutItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface WhyChooseUs {
  id: string;
  title: string;
  titleEn?: string;
  description: string;
  descriptionEn?: string;
  icon: string;
  stat?: string;
  statEn?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface CartItem {
  id: string; // Unique key e.g. `${productId}_${unitName}`
  productId: string | number;
  nameAr: string;
  nameEn?: string;
  image?: string;
  unitNameAr?: string;
  unitNameEn?: string;
  unitPrice: number;
  quantity: number;
  brandNameAr?: string;
  brandNameEn?: string;
  numberProduct?: string;
}
