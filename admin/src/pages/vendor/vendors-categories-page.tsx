import CategoriesTable from "@/components/table/vendors/categories/categories-table";
import { Button } from "@/components/ui/button";

const VendorsCategoriesPage = () => {
  return (
    <div className="space-y-4">
      <div className="flex w-full justify-end">
        <Button variant="ghost">NEW CATEGORY</Button>
      </div>

      <div className="">
        <CategoriesTable />
      </div>
    </div>
  );
};

export default VendorsCategoriesPage;
