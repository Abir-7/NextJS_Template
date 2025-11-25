// app/actions/authActions.ts
"use server";

import { LoginInput } from "@/schema/login.schema";
import { SignupInput } from "@/schema/signup.schema";
import { createSession } from "./session.actions";

function generateToken(email: string) {
  return btoa(`${email}-fake-jwt`); // base64 just for demo
}

//signup
export async function signupUser(data: SignupInput) {
  await new Promise((res) => setTimeout(res, 1000));
  return { success: true, message: "Signup successful!", data };
}

//login
export async function loginUser(data: LoginInput) {
  await new Promise((res) => setTimeout(res, 1000));
  const token = generateToken(data.email);
  await createSession(token);
  return {
    success: true,
    message: "Login successful!",
    user: { email: data.email },
  };
}
