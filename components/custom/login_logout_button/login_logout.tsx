"use client";
import { logout } from "@/action/session.actions";
import { Button } from "@/components/ui/button";
import { clearAuth } from "@/lib/redux/features/authSlice/auth_slice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hook";

import Link from "next/link";

const Login_logout = () => {
  const dispatch = useAppDispatch();
  const { is_loading, user } = useAppSelector((state) => state.auth);
  if (is_loading) return null;

  const handleLogout = async () => {
    await logout();
    dispatch(clearAuth());
  };

  return (
    <div>
      {user && user.id ? (
        <Button onClick={handleLogout}>Logout</Button>
      ) : (
        <Link href={"/login"}>Login</Link>
      )}
    </div>
  );
};

export default Login_logout;
