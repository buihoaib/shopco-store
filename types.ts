export interface Product {
  id: string;
  category: Category;
  name: string;
  price: string;
  isFeatured: boolean;
  images: Image[]
  sizes: Size[];
};

export interface ClientOrderItem {
  id: string;
  product: Product;
  size: string;
  quantity: number;
};

export interface Image {
  id: string;
  productId: string;
  url: string;
}

export interface Size {
  id: string;
  productId: string;
  type: string;
  stock: number;
}

export interface Category {
  id: string;
  name: string;
};

export interface ProductOrder {
  id: string;
  category: Category;
  name: string;
  price: string;
  images: Image[]
  size: Size;
  quantity: number;
};