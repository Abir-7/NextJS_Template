"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { useAppDispatch, useAppSelector } from "@/lib/redux/hook";
import { setIsLoading } from "@/lib/redux/features/authSlice/auth_slice";

interface RoleGuardProps {
  allowedRoles: string[];
  children: React.ReactNode;
}

export default function RoleGuard({ allowedRoles, children }: RoleGuardProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { is_loading, user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!user || !allowedRoles.includes(user.role)) {
      router.replace("/login");
      return;
    }

    Promise.resolve().then(() => dispatch(setIsLoading(false)));
  }, [user, allowedRoles, router, dispatch]);

  if (is_loading) return null;

  return <>{children}</>;
}
