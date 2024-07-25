import { useParams } from "react-router-dom";

import NewProductForm from "@/components/forms/new-product-form";

const VendorsNewProductPage = () => {
  const { vendorId } = useParams();

  return (
    <div>
      <NewProductForm vendorId={vendorId!} />
    </div>
  );
};

export default VendorsNewProductPage;
