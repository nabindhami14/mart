import { Link, useParams } from "react-router-dom";

import ProductsTable from "@/components/table/vendors/products/products-table";
import { Button } from "@/components/ui/button";

const VendorsProductsPage = () => {
  const { vendorId } = useParams();

  return (
    <div className="space-y-4">
      <div className="flex w-full justify-end">
        <Link to={`/vendors/${vendorId}/dashboard/products/new`}>
          <Button variant="ghost">NEW PRODUCT</Button>
        </Link>
      </div>

      <div className="">
        <ProductsTable />
      </div>
    </div>
  );
};

export default VendorsProductsPage;
