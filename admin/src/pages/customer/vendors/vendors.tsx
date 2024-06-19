import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import { getVendors } from "@/api/customer";
import { IVendor } from "@/types";

const VendorsPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["vendors"],
    queryFn: getVendors,
  });

  if (isLoading) return <Loader2 />;

  const vendors = data?.data as IVendor[];

  return (
    <div>
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-10">
        {vendors.map((p) => (
          <Link to={`/vendors/${p.id}`} key={p.id}>
            <Card>
              <CardHeader>{p.name}</CardHeader>
              <CardContent>
                <CardDescription>{p.description}</CardDescription>
              </CardContent>
              <CardFooter>{p.location}</CardFooter>
            </Card>
          </Link>
        ))}
      </section>
    </div>
  );
};

export default VendorsPage;
