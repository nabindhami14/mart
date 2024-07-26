import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import useCart from "../hooks/use-cart";
import { createOrder } from "@/api/customer";

const Summary = () => {
  const { items } = useCart();
  const queryClient = useQueryClient();

  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.price) * item.quantity || 1;
  }, 0);

  const mutation = useMutation({
    mutationFn: createOrder,
    onSuccess: (data) => {
      window.location.href = data.data.paymentUrl;
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  const handleCheckout = () => {
    const orderItems = items.map((p) => ({
      productId: p.id,
      quantity: p.quantity,
    }));

    mutation.mutate({ amount: totalPrice, orderItems });
  };

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
              <div className="text-xs">Total Items: {item.quantity}</div>
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
        onClick={handleCheckout}
        disabled={items.length === 0}
        className="w-full mt-6"
      >
        Checkout
      </Button>
    </div>
  );
};

export default Summary;
