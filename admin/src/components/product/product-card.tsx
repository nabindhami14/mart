"use client";

import { ShoppingCart } from "lucide-react";
import { MouseEventHandler } from "react";

import { Product } from "@/types";
import useCart from "../hooks/use-cart";
import IconButton from "./icon-button";

interface ProductCardProps {
  data: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const cart = useCart();

  const handleClick = () => {};

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    cart.addItem(data);
  };

  return (
    <div
      onClick={handleClick}
      className="group cursor-pointer rounded-xl border p-3 space-y-4"
    >
      <div className="aspect-square rounded-xl relative">
        <img
          src={data?.images[0].imageUrl}
          alt="Image"
          className="aspect-square object-cover rounded-md"
        />
        <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-32">
          <div className="flex gap-x-6 justify-center">
            <IconButton
              onClick={onAddToCart}
              icon={<ShoppingCart size={20} />}
            />
          </div>
        </div>
      </div>
      <div>
        <p className="font-semibold text-lg">{data.name}</p>
        <p className="text-sm text-gray-500">STOCK {data.stock}</p>
      </div>
      <div className="flex items-center justify-between">
        <div className="font-semibold">NRS {data.price}</div>
      </div>
    </div>
  );
};

export default ProductCard;
