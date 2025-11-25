// app/actions/sessionActions.ts
"use server";

import { cookies } from "next/headers";

export async function getCurrentUser() {
  const token = (await cookies()).get("token")?.value;

  if (!token) return null;

  const email = atob(token).split("-fake-jwt")[0];

  return { email, name: "Demo User" };
}

export async function createSession(token: string) {
  const cookieStore = await cookies();
  cookieStore.set({
    name: "token",
    value: token,
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24,
  });
}
