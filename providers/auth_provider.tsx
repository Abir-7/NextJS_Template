"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "@/action/session.actions";
import { clearAuth, setAuth } from "@/lib/redux/features/authSlice/auth_slice";

export default function AuthCheck({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    async function verify() {
      try {
        const auth = await getCurrentUser();

        if (!auth) {
          dispatch(clearAuth());
          router.replace("/login");
          return;
        }

        dispatch(setAuth(auth.user));
      } catch (err) {
        console.error("AUTH ERROR:", err);
        dispatch(clearAuth());
        router.replace("/login");
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    verify();

    return () => {
      ignore = true;
    };
  }, [dispatch, router]);

  if (loading) return null;

  return <>{children}</>;
}
