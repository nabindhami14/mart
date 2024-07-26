import { useQuery } from "@tanstack/react-query";

import Loading from "@/components/loading";

import { columns } from "./columns";
import { DataTable } from "./data-table";

import { getOrders } from "@/api";

const AdminOrdersTable = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });

  if (isLoading) {
    return <Loading />;
  }

  const orders = data?.data;

  return (
    <div>
      <DataTable columns={columns} data={orders} />
    </div>
  );
};

export default AdminOrdersTable;
