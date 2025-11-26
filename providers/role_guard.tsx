"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/lib/redux/store";

interface RoleGuardProps {
  allowedRoles: string[];
  children: React.ReactNode;
}

export default function RoleGuard({ allowedRoles, children }: RoleGuardProps) {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !allowedRoles.includes(user.role)) {
      router.replace("/login");
      return;
    }

    Promise.resolve().then(() => setLoading(false));
  }, [user, allowedRoles, router]);

  if (loading) return null;

  return <>{children}</>;
}
