"use client";

import { Button } from "@/components/ui/button";
import { useLogout } from "@/hooks/useLogout";

import { useAppSelector } from "@/lib/redux/hook";

import Link from "next/link";

const Login_logout = () => {
  const logout = useLogout();

  const { is_loading, user } = useAppSelector((state) => state.auth);
  if (is_loading) return null;

  return (
    <div>
      {user && user.id ? (
        <Button onClick={logout}>Logout</Button>
      ) : (
        <Link href={"/login"}>Login</Link>
      )}
    </div>
  );
};

export default Login_logout;
