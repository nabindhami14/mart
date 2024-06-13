import { useToken } from "@/contexts/access-token";
import { Navigate, Outlet } from "react-router-dom";

const AdminAuthLayout = () => {
  const token = useToken((state) => state.token);

  if (token) {
    return <Navigate to={"/admin/dashboard"} replace />;
  }

  return (
    <>
      <Outlet />
      <p className="text-white">hello</p>
    </>
  );
};

export default AdminAuthLayout;
