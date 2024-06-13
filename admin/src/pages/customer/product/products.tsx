import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

import { getProducts } from "@/api";
import ProductList from "@/components/product/product-list";

const ProductPage = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    staleTime: 10000, // in Milli-seconds
  });

  if (isLoading || isError) return <Loader2 />;
  return (
    <div>
      <section className="my-10">
        <ProductList items={data?.data} title="" />
      </section>
    </div>
  );
};

export default ProductPage;
