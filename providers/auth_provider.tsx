/* eslint-disable @typescript-eslint/no-unused-vars */
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

  const { user, is_loading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      console.log("object");
      dispatch(setIsLoading(false));
      return;
    }

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
  }, [user, dispatch, router]);

  // Hide content until auth is resolved → prevents flash
  if (is_loading) return null;

  return <>{children}</>;
}
