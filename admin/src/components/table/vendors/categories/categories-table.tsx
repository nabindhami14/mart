import { useQuery } from "@tanstack/react-query";

import Loading from "@/components/loading";

import { columns } from "./columns";
import { DataTable } from "./data-table";

import { getVendorCategories } from "@/api/vendor";
import { ICategory } from "@/types";
import { useParams } from "react-router-dom";

const CategoriesTable = () => {
  const { vendorId } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: [vendorId!, "categories"],
    queryFn: () => getVendorCategories(Number(vendorId)),
  });

  if (isLoading) {
    return <Loading />;
  }
  const vendors = data?.data as ICategory[];
  return (
    <div>
      <DataTable columns={columns} data={vendors} />
    </div>
  );
};

export default CategoriesTable;
