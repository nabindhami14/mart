import { useQuery } from "@tanstack/react-query";

import { getCategories } from "@/api";
import Loading from "@/components/loading";
import { Card, CardHeader } from "@/components/ui/card";
import { ICategory } from "@/types";
import { Link } from "react-router-dom";

const ProductPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  if (isLoading) return <Loading />;
  const categories = data?.data as ICategory[];

  // const uniqueCategories = [...new Set(data?.data)];
  return (
    <div>
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-10">
        {categories.map((p) => (
          <Link to={`/categories/${p.id}`} key={p.id}>
            <Card>
              <CardHeader>{p.name}</CardHeader>
            </Card>
          </Link>
        ))}
      </section>
    </div>
  );
};

export default ProductPage;
