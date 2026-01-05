"use client";

import { useRouter, usePathname } from "next/navigation";
import { useAppDispatch } from "@/lib/redux/hook";
import { clearAuth } from "@/lib/redux/features/authSlice/auth_slice";
import { logout } from "@/action/session.actions";

import { public_routes } from "@/const/route/public_routes";

export function useLogout() {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  const is_public_route = (path: string) =>
    public_routes.some((r) => path === r.path);

  return async function handleLogout() {
    await logout();

    dispatch(clearAuth());

    if (!is_public_route(pathname)) {
      router.replace(`/login?callback=${encodeURIComponent(pathname)}`);
    } else {
      router.refresh();
    }
  };
}
