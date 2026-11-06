export type Allergen = 
  | 'gluten' 
  | 'lacteos' 
  | 'huevos' 
  | 'pescado' 
  | 'crustaceos' 
  | 'frutos_secos' 
  | 'soja' 
  | 'mostaza';

export interface Dish {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image?: string;
  available: boolean; // toggle in real-time
  allergens: Allergen[];
  badge?: 'Recomendado' | 'Especialidad' | 'Vegano' | 'Nuevo';
  calories?: number;
  prepTime?: string;
}

export interface Category {
  id: string;
  name: string;
  iconName?: string;
}

export interface RestaurantData {
  id: string;
  name: string;
  tagline: string;
  address: string;
  phone: string;
  currency: string;
  currencySymbol: string;
  wifiName?: string;
  wifiPass?: string;
  tableCount: number;
  categories: Category[];
  dishes: Dish[];
}

export interface TableConfig {
  tableNumber: string;
  area: 'Salon' | 'Terraza' | 'Barra' | 'VIP';
  theme: 'acrylic-dark' | 'walnut-wood' | 'brushed-aluminum' | 'minimal-card';
}
