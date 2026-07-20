export interface ApiContent {
  id: number;
  we_are_ar: string;
  we_are_en: string;
  our_vision_ar: string;
  our_vision_en: string;
  our_message_ar: string;
  our_message_en: string;
  buy_fome_us_ar: string;
  buy_fome_us_en: string;
  our_values_ar: string;
  our_values_en: string;
  address_ar: string;
  address_en: string;
  email: string;
  facebook: string;
  instagram: string;
  toktek: string;
  whatsapp: string;
  location: string;
  create_at: string;
  update_at: string;
}

export interface ApiGoal {
  id: number;
  name_ar: string;
  name_en: string;
  create_at: string;
  update_at: string;
}

export interface ApiSlider {
  id: number;
  name_ar: string;
  name_en: string;
  image_full_size: string;
  image_small_size: string;
  image_content_full_size: string;
  image_content_small_size: string;
  urls: string;
  create_at: string;
  update_at: string;
}

export interface ApiAgent {
  id: number;
  name_ar: string;
  name_en: string;
  image: string;
  urls: string;
  buy_fome_us_ar: string;
  buy_fome_us_en: string;
  create_at: string;
  update_at: string;
}

export interface ApiPublicService {
  id: number;
  name_ar: string;
  name_en: string;
  create_at: string;
  update_at: string;
}

export interface ApiService {
  id: number;
  agent_name_ar: string;
  agent_name_en: string;
  name_ar: string;
  name_en: string;
  create_at: string;
  update_at: string;
  agent: number;
}

export interface ApiBranch {
  id: number;
  name_ar: string;
  name_en: string;
  images: string;
  address_ar: string;
  address_en: string;
  link_location: string;
  phone: string;
  email: string;
  create_at: string;
  update_at: string;
}

export interface ApiCustomerReview {
  id: number;
  name_ar: string;
  name_en: string;
  image: string;
  review_ar: string;
  review_en: string;
  create_at: string;
  update_at: string;
}

export interface ApiProject {
  id: number;
  // Based on standard fields, leaving generic if empty array
  [key: string]: any;
}

export interface ApiProduct {
  id: number;
  // Based on standard fields, leaving generic if empty array
  [key: string]: any;
}

export interface ApiData {
  content: ApiContent;
  gool: ApiGoal[];
  slider: ApiSlider[];
  our_agent: ApiAgent[];
  public_service: ApiPublicService[];
  service: ApiService[];
  branch: ApiBranch[];
  customer_review: ApiCustomerReview[];
  project: ApiProject[];
  product: ApiProduct[];
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data: ApiData;
}
