// types/interfaces.ts
export interface Topping {
  id: string;
  name: string;
  emoji: string;
  color: string;
  price?: number;
}

export interface Jelly {
  id: string;
  name: string;
  emoji: string;
  color: string;
}

export interface Flavor {
  id: string;
  name: string;
  description: string;
  emoji: string;
}

export interface PackageOption {
  id: string;
  quantity: number;
  price: number;
  description: string;
  popular?: boolean;
  special?: boolean;
  category: 'small' | 'medium' | 'large' | 'catering';
}

export interface SelectedPancakes {
  packageId: string;
  quantity: number;
  price: number;
  includedToppings: string[];
  includedJellies: string[];
  extraToppings: string[]; // No se usa actualmente, pero se mantiene si se necesita lógica de extras fuera de includedToppings
  extraJellies: string[]; // No se usa actualmente, pero se mantiene si se necesita lógica de extras fuera de includedJellies
}

export interface CustomerData {
  name: string;
  phone: string;
  address: string;
  notes: string;
  deliveryType: 'express' | 'standard';
}

export interface DeliveryOption {
  id: 'express' | 'standard';
  name: string;
  timeRange: string;
  price: number;
  icon: React.ElementType;
  description: string;
}

export type PageType = 'home' | 'menu' | 'about' | 'contact';