import { getCategory } from "@/api";
import Loading from "@/components/loading";
import { ICategory } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const CategoryPage = () => {
  const { categoryId } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["categories", categoryId],
    queryFn: () => getCategory(+categoryId!),
  });

  if (isLoading) return <Loading />;

  const category = data?.data as ICategory;

  return (
    <div>
      <div className="relative">
        <img
          src={
            category?.billboard?.image?.uri ||
            "https://www.scnsoft.com/web-portals-development/vendor-portals-icp/cover-pic-vendor-portal-new.svg"
          }
          className="w-full h-96 object-cover opacity-40 hover:opacity-90 transition-colors duration-300 ease-in-out"
        />
        <div className="absolute bottom-10 right-1/2">
          <h2 className="text-4xl">
            {category?.billboard?.title || "DEFAULT TITLE"}
          </h2>
          <p className="text-xl">
            {category?.billboard?.description || "DEFAULT DESCRIPTION"}
          </p>
        </div>
      </div>

      {/* PRODUCTS */}
      <div className="my-4">
        <h2>PRODUCTS</h2>

        <div className="grid grid-cols-4 gap-4"></div>
      </div>
    </div>
  );
};

export default CategoryPage;
