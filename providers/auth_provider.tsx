"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "@/action/session.actions";
import {
  clearAuth,
  setAuth,
  setIsLoading,
} from "@/lib/redux/features/authSlice/auth_slice";
import { useAppSelector } from "@/lib/redux/hook";

export default function AuthCheck({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const { is_loading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    let ignore = false;

    async function verify() {
      try {
        const auth = await getCurrentUser();

        if (!auth) {
          dispatch(clearAuth());
          //   router.replace("/login");
          return;
        }

        dispatch(setAuth(auth.user));
      } catch (err) {
        console.error("AUTH ERROR:", err);
        dispatch(clearAuth());
        router.replace("/login");
      } finally {
        if (!ignore) dispatch(setIsLoading(false));
      }
    }

    verify();

    return () => {
      ignore = true;
    };
  }, [dispatch, router]);

  if (is_loading) return null;

  return <>{children}</>;
}
