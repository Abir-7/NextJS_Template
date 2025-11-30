"use client";

import { useRouter, usePathname } from "next/navigation";
import { useAppDispatch } from "@/lib/redux/hook";
import { clearAuth } from "@/lib/redux/features/authSlice/auth_slice";

import { logout } from "@/action/session.actions";
import { protectedRoutes } from "@/lib/auth/protected_routes";

export function useLogout() {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  return async function handleLogout() {
    const isProtected = protectedRoutes.some((r) =>
      pathname.startsWith(r.path)
    );
    await logout();
    dispatch(clearAuth());

    if (isProtected) {
      router.replace(`/login?callback=${encodeURIComponent(pathname)}`);
    } else {
      router.refresh();
    }
  };
}
