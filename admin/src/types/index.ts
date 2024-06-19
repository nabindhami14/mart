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

// "id": 1,
// "name": "Kreiger - Bahringer",
// "description": "Legacy",
// "price": 221.82,
// "stock": 215,
// "isArchived": false,
// "vendorId": 1,
// "categoryId": 2,
// "createdAt": "2024-06-19T16:37:20.228Z",
// "updatedAt": "2024-06-19T16:37:20.228Z"

export interface IProduct {
  id: number;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  isArchived: boolean;
  images: {
    imageUrl: string;
  }[];
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
