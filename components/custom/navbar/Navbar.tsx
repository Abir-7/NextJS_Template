"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Login_logout from "../login_logout_button/login_logout";
import { ModeToggle } from "../theme/theme_toogle";
import { useAppSelector } from "@/lib/redux/hook";

const Navbar = () => {
  const { user } = useAppSelector((state) => state.auth);
  const pathname = usePathname();

  // Reusable active class
  const activeClass = "bg-accent text-accent-foreground px-2 py-0.5 rounded";
  const inactiveClass = "text-muted-foreground";

  const isActive = (path: string) =>
    path === "/" ? pathname === "/" : pathname.startsWith(path);

  return (
    <div className="w-full h-full flex justify-between items-center p-2">
      <div>Logo</div>

      <div className="flex items-center gap-4">
        <Link
          href="/product"
          className={isActive("/product") ? activeClass : inactiveClass}
        >
          Product
        </Link>

        {user && (
          <Link
            href="/dashboard"
            className={isActive("/dashboard") ? activeClass : inactiveClass}
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
