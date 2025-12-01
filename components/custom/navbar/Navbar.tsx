"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Login_logout from "../login_logout_button/login_logout";
import { ModeToggle } from "../theme/theme_toogle";
import { useAppSelector } from "@/lib/redux/hook";

const Navbar = () => {
  const { user } = useAppSelector((state) => state.auth);
  const pathname = usePathname();

  const isActive = (path: string) => pathname.startsWith(path);

  return (
    <div className="w-full h-full flex justify-between items-center p-2">
      <div>Logo</div>

      <div className="flex items-center gap-4">
        <Link
          href="/product"
          className={
            isActive("/product")
              ? "text-blue-500 font-semibold"
              : "text-muted-foreground"
          }
        >
          Product
        </Link>

        {user && (
          <Link
            href="/dashboard"
            className={
              isActive("/dashboard")
                ? "text-blue-500 font-semibold"
                : "text-muted-foreground"
            }
          >
            Dashboard
          </Link>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Login_logout />
        <ModeToggle />
      </div>
    </div>
  );
};

export default Navbar;
