export interface ColorOption {
  name: string;
  hexCode: string;
  imageUrl: string;
}

export interface StorageOption {
  capacity: string;
  price: number;
}

export interface Phone {
  id: string;
  brand: string;
  name: string;
  basePrice: number;
  imageUrl: string;
}

export interface PhoneDetail extends Phone {
  description: string;
  specs: Record<string, string>;
  colorOptions: ColorOption[];
  storageOptions: StorageOption[];
  similarProducts: Phone[];
}

export interface CartItem {
  id: string;
  phoneId: string;
  brand: string;
  name: string;
  imageUrl: string;
  storage: string;
  color: string;
  price: number;
}
