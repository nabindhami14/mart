"use client";

import useCart from "@/components/hooks/use-cart";
import CartItem from "@/components/product/cart-item";
import Summary from "@/components/product/summary";
import { Info } from "lucide-react";

const CheckOutPage = () => {
  const cart = useCart();
  console.log(cart.items[0], "OKK");

  return (
    <div className="">
      <div className="px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold">Shopping Cart</h1>
        <div className="flex py-2">
          <Info size={18} strokeWidth={0.75} />
          <p className="text-xs md:text-sm font-extralight ">
            &nbsp;Do not wait with the purchase, adding items to the basket does
            not mean booking them!
          </p>
        </div>
        <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
          <div className="sm:col-span-7">
            {cart.items.length === 0 && (
              <p className="text-neutral-500">No items added to cart.</p>
            )}
            <ul>
              {cart.items.map((item, i) => (
                <CartItem key={i} data={item} />
              ))}
            </ul>
          </div>
          <Summary />
        </div>
      </div>
    </div>
  );
};

export default CheckOutPage;
