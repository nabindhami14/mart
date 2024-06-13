import { useToken } from "@/contexts/access-token";
import { Navigate, Outlet } from "react-router-dom";

const AdminLayout = () => {
  const token = useToken((state) => state.token);

  if (token) {
    return <Navigate to={"/"} replace />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default AdminLayout;
