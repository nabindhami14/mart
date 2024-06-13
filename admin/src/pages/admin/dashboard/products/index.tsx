import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

import { getProducts } from "@/api";
import { Product } from "@/types";

const Products = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: getProducts,
    staleTime: 10000, // in Milli-seconds
  });

  if (isLoading || isError) return <Loader2 />;

  return (
    <div className="space-y-4 text-white">
      {data?.data.map((product: Product) => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          <img
            src={product.images[0].imageUrl}
            alt={product.name}
            width={100}
            height={100}
          />
          <p>{product.description}</p>
          <p>{product.isArchived}</p>
          <p>{product.stock}</p>
          <p>{new Date(product.createdAt).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
};

export default Products;
