import { Link, useParams } from "react-router-dom";

import CategoriesTable from "@/components/table/vendors/categories/categories-table";
import { Button } from "@/components/ui/button";

const VendorsCategoriesPage = () => {
  const { vendorId } = useParams();

  return (
    <div className="space-y-4">
      <div className="flex w-full justify-end">
        <Link to={`/vendors/${vendorId}/dashboard/categories/new`}>
          <Button variant="ghost">NEW CATEGORY</Button>
        </Link>
      </div>

      <div className="">
        <CategoriesTable />
      </div>
    </div>
  );
};

export default VendorsCategoriesPage;
