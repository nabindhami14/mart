import { getOverview } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

const Dashboard = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: getOverview,
    staleTime: 10000, // in Milli-seconds
  });

  if (isLoading || isError) return <Loader2 />;
  return (
    <div>
      <div>CUSTOMERS {data?.data.usersCount}</div>
      <div>VENDORS {data?.data.vendorsCount}</div>
      <div>ORDERS {data?.data.ordersCount}</div>
    </div>
  );
};

export default Dashboard;
