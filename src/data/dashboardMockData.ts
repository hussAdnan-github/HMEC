export interface ProductItem {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  sku: string;
  stock: number;
  status: 'available' | 'low' | 'out_of_stock';
  image: string;
  description: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  client: string;
  location: string;
  date: string;
  status: 'completed' | 'in_progress' | 'planned';
  category: string;
  budget: string;
  image: string;
  description: string;
  brandsUsed: string[];
}

export interface BranchItem {
  id: string;
  name: string;
  city: string;
  address: string;
  phone: string;
  manager: string;
  email: string;
  status: 'active' | 'maintenance' | 'closed';
  workingHours: string;
  isMainBranch?: boolean;
}

export interface OrderItem {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerCity: string;
  totalAmount: number;
  status: 'new' | 'processing' | 'shipped' | 'completed' | 'cancelled';
  createdAt: string;
  itemsCount: number;
  notes?: string;
}

export interface MediaItem {
  id: string;
  title: string;
  category: 'منتجات' | 'مشاريع' | 'فروع' | 'اعتمادات' | 'products' | 'projects' | 'branches' | 'sliders';
  url: string;
  size: string;
  uploadDate?: string;
  uploadedAt?: string;
  dimensions?: string;
}

// Initial Empty Datasets (Ready for real user entries)
export const initialProducts: ProductItem[] = [];
export const initialProjects: ProjectItem[] = [];
export const initialBranches: BranchItem[] = [];
export const initialOrders: OrderItem[] = [];
export const initialMediaGallery: MediaItem[] = [];
