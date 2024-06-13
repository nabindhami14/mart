import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

import { getCategories } from "@/api";

interface Category {
  id: number;
  name: string;
}
const Categories = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 10000, // in Milli-seconds
  });

  if (isLoading || isError) return <Loader2 />;

  return (
    <div className="space-y-4">
      {data?.data.map((category: Category) => (
        <div key={category.id}>
          <h2>{category.name}</h2>
        </div>
      ))}
    </div>
  );
};

export default Categories;
