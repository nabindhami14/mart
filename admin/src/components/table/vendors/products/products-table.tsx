import { useQuery } from "@tanstack/react-query";

import Loading from "@/components/loading";

import { columns } from "./columns";
import { DataTable } from "./data-table";

import { getVendorsProducts } from "@/api/vendor";
import { IProduct } from "@/types";

const ProductsTable = () => {
  const { data, isLoading } = useQuery({
    queryKey: [1, "products"],
    queryFn: () => getVendorsProducts(1),
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
