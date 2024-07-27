// import { useToken } from "@/contexts/access-token";
import { Outlet } from "react-router-dom";

const AdminAuthLayout = () => {
  return (
    <>
      <Outlet />
      <p className="text-white">hello</p>
    </>
  );
};

export default AdminAuthLayout;
