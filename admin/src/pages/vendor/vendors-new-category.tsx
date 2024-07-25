import NewCategoryForm from "@/components/forms/new-category-form";
import { useParams } from "react-router-dom";

const VendorsNewCategoryPage = () => {
  const { vendorId } = useParams();

  return (
    <div>
      <NewCategoryForm vendorId={vendorId!} />
    </div>
  );
};

export default VendorsNewCategoryPage;
