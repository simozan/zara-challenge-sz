export interface ColorOption {
  name: string;
  hexCode: string;
  imageUrl: string;
}

export interface StorageOption {
  capacity: string;
  price: number;
}

export interface Specs {
  screen: string;
  resolution: string;
  processor: string;
  mainCamera: string;
  selfieCamera: string;
  battery: string;
  os: string;
  screenRefreshRate: string;
}

export interface Phone {
  id: string;
  brand: string;
  name: string;
  basePrice: number;
  imageUrl: string;
  colorOptions?: ColorOption[];
}

export interface PhoneDetail {
  id: string;
  brand: string;
  name: string;
  description: string;
  basePrice: number;
  rating: number;
  specs: Specs;
  colorOptions: ColorOption[];
  storageOptions: StorageOption[];
  similarProducts: Phone[];
}

export interface CartItem {
  cartItemId: string;
  phoneId: string;
  brand: string;
  name: string;
  imageUrl: string;
  storage: string;
  color: string;
  price: number;
}
