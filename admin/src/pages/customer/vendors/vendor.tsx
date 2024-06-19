import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";

import { getVendor } from "@/api/customer";
import Loading from "@/components/loading";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const VendorPage = () => {
  const { vendorId } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["vendors", vendorId],
    queryFn: () => getVendor(+vendorId!),
  });

  if (isLoading) return <Loading />;

  const vendor = data?.data;
  console.log(vendor);

  return (
    <div>
      <div className="relative">
        <img
          src={
            vendor?.billboard?.image?.uri ||
            "https://www.scnsoft.com/web-portals-development/vendor-portals-icp/cover-pic-vendor-portal-new.svg"
          }
          className="w-full h-96 object-cover opacity-40 hover:opacity-90 transition-colors duration-300 ease-in-out"
        />
        <div className="absolute bottom-10 right-1/2">
          <h2 className="text-4xl">
            {vendor?.billboard?.title || "DEFAULT TITLE"}
          </h2>
          <p className="text-xl">
            {vendor?.billboard?.description || "DEFAULT DESCRIPTION"}
          </p>
        </div>
      </div>

      <div className="">
        <h3>{vendor.name}</h3>
        <p>{vendor.description}</p>
        <p>{vendor.location}</p>
      </div>

      {/* CATEGORIES */}
      <div className="my-4">
        <h2>CATEGORIES</h2>
        <div className="grid grid-cols-4 gap-4 py-4">
          {vendor.categories.map((c) => (
            <Link key={c.id} to={`/categories/${c.id}`}>
              <Card>
                <CardHeader>
                  <CardTitle>{c.name}</CardTitle>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
      {/* PRODUCTS */}
    </div>
  );
};

export default VendorPage;
