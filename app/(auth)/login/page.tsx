/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { getCurrentUser } from "@/action/session.actions";
import { RHFForm } from "@/components/custom/form/RHFForm";
import { RHFInput } from "@/components/custom/form/RHFInput";
import { Button } from "@/components/ui/button";
import { useLogin } from "@/hooks/react_query/use_auth.hook";
import { useZodForm } from "@/hooks/zod/use-zod-form";
import { setAuth } from "@/lib/redux/features/authSlice/auth_slice";
import { useAppDispatch } from "@/lib/redux/hook";
import { LoginInput, LoginSchema } from "@/schema/login.schema";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const callback = searchParams.get("callback") || "/";
  const dispatch = useAppDispatch();
  const router = useRouter();
  const login = useLogin();
  const form = useZodForm({
    schema: LoginSchema,
    defaultValues: {
      email: "dev.abir.07@gmail.com",
      password: "123456",
    },
  });

  const handleLogin = async (data: LoginInput) => {
    try {
      const res = await login.mutateAsync(data);
      if (res.success) {
        toast.success("Login Successful.");
        const auth = await getCurrentUser();
        if (auth) {
          dispatch(setAuth(auth?.user));
        }
        router.push(callback);
      }
    } catch (err: any) {
      toast.error(err.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-semibold text-center mb-6">Login</h1>

        <RHFForm form={form} onSubmit={handleLogin} className="space-y-4">
          <RHFInput
            control={form.control}
            name="email"
            label="Email"
            type="email"
            placeholder="Enter your email"
          />

          <RHFInput
            control={form.control}
            name="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
          />

          <Button type="submit" className="w-full">
            Login
          </Button>
        </RHFForm>
      </div>
    </div>
  );
}
