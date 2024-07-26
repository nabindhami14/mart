import { verifyVendor } from "@/api/admin";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Check, Edit } from "lucide-react";

const VerifyVendorDialog = ({
  vendorId,
  isVerified,
}: {
  vendorId: number;
  isVerified: boolean;
}) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: verifyVendor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vendors"] });
    },
  });
  const handleClick = () => {
    console.log("first");
    mutation.mutate(vendorId);
  };

  return (
    <>
      {isVerified ? (
        <button className="flex items-center text-green-400" disabled>
          <Check className="w-4 h-4 mr-2" /> VERIFIED
        </button>
      ) : (
        <button className="flex items-center" onClick={handleClick}>
          <Edit className="w-4 h-4 mr-2" /> VERIFY
        </button>
      )}
    </>
  );
};

export default VerifyVendorDialog;
