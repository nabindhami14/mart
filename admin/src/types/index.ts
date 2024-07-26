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

export interface IProduct {
  id: number;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  isArchived: boolean;
  images: string;
  quantity: number;

  vendorId: number;
  categoryId: number;
  createdAt: Date;
}

export interface IVendor {
  id: number;
  name: string;
  email: string;
  password: string;
  description: string | null;
  phone: string | null;
  location: string | null;
  isVerified: boolean;
  createdAt: Date;
}

export interface ICategory {
  id: number;
  name: string;
  description: string;
  billboard: {
    id: string;
    title: string;
    description: string;
    image: {
      uri: string;
    };
  };
}
