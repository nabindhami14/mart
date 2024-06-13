"use client";

import { Button } from "@/components/ui/button";
import useCart from "../hooks/use-cart";

const Summary = () => {
  const items = useCart((state) => state.items);
  //   const removeAll = useCart((state) => state.removeAll);

  //   useEffect(() => {
  //     if (searchParams.get("success")) {
  //       toast.success("Payment completed.");
  //       removeAll();
  //     }

  //     if (searchParams.get("canceled")) {
  //       toast.error("Something went wrong.");
  //     }
  //   }, [searchParams, removeAll]);

  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.price) * item.quantity || 1;
  }, 0);

  return (
    <div className="px-4 py-6 mt-16 rounded-lg sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      {/* Order summary */}
      <h2 className="text-lg font-medium 0">Order summary</h2>
      <div className="mt-6 ">
        {items.map((item) => (
          <div
            className="flex items-center justify-between py-2 border-t border-gray-200"
            key={item.id}
          >
            <div className="flex flex-col text-sm font-light titems-center">
              <span className="font-semibold">{item.name}</span>
              <div className="text-xs">{item.stock}</div>
            </div>

            <div className="font-semibold">NRS {item.price}</div>
          </div>
        ))}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="text-base font-medium ">Order total</div>
          <div className="font-semibold">NRS {totalPrice}</div>
        </div>
      </div>
      <Button
        onClick={() => {}}
        disabled={items.length === 0}
        className="w-full mt-6"
      >
        Checkout
      </Button>
    </div>
  );
};

export default Summary;
