import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

import { getOrders } from "@/api";
import { Order } from "@/types";

const Orders = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: getOrders,
    staleTime: 10000, // in Milli-seconds
  });

  if (isLoading || isError) return <Loader2 />;
  return (
    <div className="space-y-4">
      {data?.data.map((order: Order) => (
        <div key={order.id}>
          <h2>{order.totalAmount}</h2>
          <p>{order.status}</p>
          <p>{order.payments.method || "ONLINE"}</p>
          <p>{new Date(order.createdAt).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
};

export default Orders;
