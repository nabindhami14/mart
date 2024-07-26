// import { useToken } from "@/contexts/access-token";
import { Outlet } from "react-router-dom";

const AdminAuthLayout = () => {
  // const token = useToken((state) => state.token);

  return (
    <>
      <Outlet />
      <p className="text-white">hello</p>
    </>
  );
};

export default AdminAuthLayout;
