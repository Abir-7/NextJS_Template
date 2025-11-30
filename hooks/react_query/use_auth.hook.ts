// hooks/useAuth.ts
"use client";

import { useMutation } from "@tanstack/react-query";

import { SignupInput } from "@/schema/signup.schema";
import { LoginInput } from "@/schema/login.schema";
import { loginUser, signupUser } from "@/action/auth.actions";

export function useSignup() {
  return useMutation({
    mutationFn: async (data: SignupInput) => signupUser(data),
  });
}

export function useLogin() {
  return useMutation({
    mutationFn: async (data: LoginInput) => await loginUser(data),
  });
}
