import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { protectedRoutes } from "./lib/auth/protected_routes";
import { getCurrentUser } from "./action/session.actions";

export async function proxy(req: NextRequest) {
  const auth = await getCurrentUser();
  const pathname = req.nextUrl.pathname;

  const matched = protectedRoutes.find((r) => pathname.startsWith(r.path));
  if (!matched) return NextResponse.next();

  if (!auth) {
    return NextResponse.redirect(
      new URL(`/login?callback=${pathname}`, req.url)
    );
  }

  // 4. Reject unauthorized roles
  if (!matched.allowedRoles.includes(auth.user.role)) {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  return NextResponse.next();
}
