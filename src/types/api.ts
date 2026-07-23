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

export interface ApiProjectImage {
  id: number;
  image: string;
  created_at: string;
  updated_at: string;
  project: number;
}

export interface ApiProject {
  id: number;
  project_images: ApiProjectImage[];
  agent_name_ar: string;
  agent_name_en: string;
  name_ar: string;
  name_en: string;
  short_description_ar: string;
  short_description_en: string;
  image: string;
  description_ar: string;
  description_en: string;
  location_ar: string;
  location_en: string;
  commit_owner_ar: string;
  commit_owner_en: string;
  name_owner_ar: string;
  name_owner_en: string;
  attribute_ar: string;
  attribute_en: string;
  start: string;
  completed: string;
  video_files: string;
  created_at: string;
  updated_at: string;
  agent: number;
}

export interface ApiProductImage {
  id: number;
  image: string;
  created_at: string;
  updated_at: string;
  product: number;
}

export interface ApiProductUnit {
  id: number;
  name_product_ar: string;
  name_product_en: string;
  number_product: string;
  name_unit_ar: string;
  name_unit_en: string;
  is_active: boolean;
  price: string;
  created_at: string;
  updated_at: string;
  lft: number;
  rght: number;
  tree_id: number;
  level: number;
  product: number;
  parent: number | null;
}

export interface ApiProduct {
  id: number;
  product_images: ApiProductImage[];
  agent_name_ar: string;
  agent_name_en: string;
  name_uint: ApiProductUnit[];
  number_group: string;
  number_product: string;
  name_product_ar: string;
  name_product_en: string;
  is_active: boolean;
  description_product_ar: string;
  description_product_en: string;
  image: string;
  crated_at: string;
  updated_at: string;
  agent: number;
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

export interface ApiPaginatedData<T> {
  next: string | null;
  previous: string | null;
  count: number;
  results: T[];
}

export interface ApiProductsResponse {
  success: boolean;
  message: string;
  data: ApiPaginatedData<ApiProduct>;
}

export interface ApiSingleProductResponse {
  success: boolean;
  message: string;
  data: ApiProduct;
}

export interface ApiProjectsResponse {
  success: boolean;
  message: string;
  data: ApiPaginatedData<ApiProject>;
}

export interface ApiSingleProjectResponse {
  success: boolean;
  message: string;
  data: ApiProject;
}
