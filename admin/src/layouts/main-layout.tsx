import useCart from "@/components/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { useToken } from "@/contexts/access-token";
import { ShoppingBag } from "lucide-react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

const MainLayout = () => {
  const { token, setToken } = useToken();
  const { items } = useCart();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen container">
      <nav className="h-16 border-b flex items-center justify-between">
        <h2>WEB MART</h2>

        <div className="hidden sm:flex">
          <ul className="w-full h-full flex items-center gap-4">
            <li>
              <NavLink
                to="/"
                className={({ isActive, isPending }) =>
                  isPending ? "text-blue-100" : isActive ? "text-blue-400" : ""
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/products"
                className={({ isActive, isPending }) =>
                  isPending ? "text-blue-100" : isActive ? "text-blue-400" : ""
                }
              >
                Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/vendors"
                className={({ isActive, isPending }) =>
                  isPending ? "text-blue-100" : isActive ? "text-blue-400" : ""
                }
              >
                Vendors
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/categories"
                className={({ isActive, isPending }) =>
                  isPending ? "text-blue-100" : isActive ? "text-blue-400" : ""
                }
              >
                Categories
              </NavLink>
            </li>
            {token ? (
              <li>
                <Button variant="link" onClick={() => setToken("")}>
                  Logout
                </Button>
              </li>
            ) : (
              <li>
                <NavLink
                  to="/auth/login"
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "text-blue-100"
                      : isActive
                      ? "text-blue-400"
                      : ""
                  }
                >
                  Login
                </NavLink>
              </li>
            )}
            <Button onClick={() => navigate("/checkout")} variant="ghost">
              <ShoppingBag size={20} color="white" />
              <span className="ml-2 text-sm font-medium">{items.length}</span>
            </Button>
          </ul>
        </div>
      </nav>

      <main>
        <Outlet />
      </main>
      <footer className="mt-auto h-16 border-t text-center flex items-center justify-center w-full">
        <p className="text-center"> &copy; Copyright!!</p>
      </footer>
    </div>
  );
};

export default MainLayout;
