import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

import { getCategories } from "@/api";
import { Card, CardHeader } from "@/components/ui/card";

const ProductPage = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 10000, // in Milli-seconds
  });

  if (isLoading || isError) return <Loader2 />;

  const uniqueCategories = [...new Set(data?.data)];
  return (
    <div>
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-10">
        {uniqueCategories.splice(0, 10).map((p) => (
          <Card key={p.id}>
            <CardHeader>{p.name}</CardHeader>
          </Card>
        ))}
      </section>
    </div>
  );
};

export default ProductPage;
