import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

import { getVendors } from "@/api/customer";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

const VendorsPage = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["vendors"],
    queryFn: getVendors,
    staleTime: 10000, // in Milli-seconds
  });

  if (isLoading || isError) return <Loader2 />;

  console.log(data?.data);

  return (
    <div>
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-10">
        {data?.data.map((p) => (
          <Card key={p.id}>
            <CardHeader>{p.name}</CardHeader>
            <CardContent>
              <CardDescription>{p.description}</CardDescription>
            </CardContent>
            <CardFooter>{p.phone}</CardFooter>
          </Card>
        ))}
      </section>
    </div>
  );
};

export default VendorsPage;
