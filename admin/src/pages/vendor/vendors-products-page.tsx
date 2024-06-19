import ProductsTable from "@/components/table/vendors/products/products-table";
import { Button } from "@/components/ui/button";

const VendorsProductsPage = () => {
  return (
    <div className="space-y-4">
      <div className="flex w-full justify-end">
        <Button variant="ghost">NEW PRODUCT</Button>
      </div>
      <div className="">
        <ProductsTable />
      </div>
    </div>
  );
};

export default VendorsProductsPage;
