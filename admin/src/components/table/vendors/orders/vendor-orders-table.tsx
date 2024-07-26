import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import Loading from "@/components/loading";

import { columns } from "./columns";
import { DataTable } from "./data-table";

import { getVendorOrders } from "@/api/vendor";

const VendorOrdersTable = () => {
  const { vendorId } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: [vendorId, "orders"],
    queryFn: () => getVendorOrders(Number(vendorId)),
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

export default VendorOrdersTable;
