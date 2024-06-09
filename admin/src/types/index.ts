export interface Order {
  id: number;
  createdAt: Date;
  orderItems: {
    price: number;
    product: {
      name: string;
    };
    quantity: number;
  }[];
  totalAmount: number;
  status: string;
  payments: {
    method: string;
  };
}

export interface Product {
  id: number;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  isArchived: boolean;
  createdAt: Date;
  images: {
    imageUrl: string;
  }[];
}
