import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { IProduct } from "@/types";
import toast from "react-hot-toast";

interface CartStore {
  items: IProduct[];
  addItem: (data: IProduct) => void;
  decreaseItem: (id: number) => void;
  removeItem: (id: number) => void;
  removeAll: () => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (data: IProduct) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === data.id);

        if (existingItem) {
          set({
            items: currentItems.map((item) =>
              item.id === data.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
          toast.success("Item quantity increased.");
        } else {
          set({
            items: [...currentItems, { ...data, quantity: data.quantity || 1 }],
          });
          toast.success("Item added to cart.");
        }
      },
      decreaseItem: (id: number) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === id);

        if (existingItem && existingItem.quantity > 1) {
          set({
            items: currentItems.map((item) =>
              item.id === id ? { ...item, quantity: item.quantity - 1 } : item
            ),
          });
          toast.success("Item quantity decreased.");
        } else if (existingItem && existingItem.quantity === 1) {
          set({
            items: currentItems.filter((item) => item.id !== id),
          });
          toast.success("Item removed from the cart.");
        }
      },
      removeItem: (id: number) => {
        set({ items: [...get().items.filter((item) => item.id !== id)] });
        toast.success("Item removed from the cart.");
      },
      removeAll: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
