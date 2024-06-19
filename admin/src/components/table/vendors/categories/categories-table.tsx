import { useQuery } from "@tanstack/react-query";

import Loading from "@/components/loading";

import { columns } from "./columns";
import { DataTable } from "./data-table";

import { getVendorCategories } from "@/api/vendor";
import { ICategory } from "@/types";

const CategoriesTable = () => {
  const { data, isLoading } = useQuery({
    queryKey: [1, "categories"],
    queryFn: () => getVendorCategories(1),
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
