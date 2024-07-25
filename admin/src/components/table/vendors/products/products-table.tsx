import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import Loading from "@/components/loading";

import { columns } from "./columns";
import { DataTable } from "./data-table";

import { getVendorsProducts } from "@/api/vendor";
import { IProduct } from "@/types";

const ProductsTable = () => {
  const { vendorId } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: [vendorId, "products"],
    queryFn: () => getVendorsProducts(Number(vendorId)),
  });

  if (isLoading) {
    return <Loading />;
  }
  const vendors = data?.data as IProduct[];

  return (
    <div>
      <DataTable columns={columns} data={vendors} />
    </div>
  );
};

export default ProductsTable;
