/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { RHFForm } from "@/components/custom/form/RHFForm";
import { RHFInput } from "@/components/custom/form/RHFInput";
import { Button } from "@/components/ui/button";
import { useSignup } from "@/hooks/react_query/use_auth.hook";
import { useZodForm } from "@/hooks/zod/use-zod-form";
import { SignupSchema, SignupInput } from "@/schema/signup.schema";
import { toast } from "sonner";

export default function SignupPage() {
  const signup = useSignup();

  const form = useZodForm({
    schema: SignupSchema,
    defaultValues: {
      name: "Abir",
      email: "dev.abir.07@gmail.com",
      password: "123456",
      confirm_password: "123456",
    },
  });

  const handleSignup = async (data: SignupInput) => {
    try {
      const res = await signup.mutateAsync(data);
      if (res.success) {
        toast.success("Login Successful.");
      }
    } catch (err: any) {
      toast.success(err.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-semibold text-center mb-6">Sign Up</h1>

        <RHFForm form={form} onSubmit={handleSignup} className="space-y-4">
          <RHFInput
            control={form.control}
            name="name"
            label="Full Name"
            placeholder="Enter your name"
          />

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

          <RHFInput
            control={form.control}
            name="confirm_password"
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
          />

          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        </RHFForm>
      </div>
    </div>
  );
}
