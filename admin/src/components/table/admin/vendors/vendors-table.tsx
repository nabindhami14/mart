import { useQuery } from "@tanstack/react-query";

import Loading from "@/components/loading";

import { columns } from "./columns";
import { DataTable } from "./data-table";

import { getAllVendors } from "@/api/admin";
import { IVendor } from "@/types";

const VendorsTable = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["vendors"],
    queryFn: getAllVendors,
  });

  if (isLoading) {
    return <Loading />;
  }
  const vendors = data?.data as IVendor[];
  return (
    <div>
      <DataTable columns={columns} data={vendors} />
    </div>
  );
};

export default VendorsTable;
