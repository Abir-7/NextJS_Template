import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCurrentUser } from "./action/session.actions";
import { public_routes } from "./const/route/public_routes";
import { protected_routes } from "./const/route/protected_routes";

export async function proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Ignore static files and favicon
  if (pathname.startsWith("/_next") || pathname === "/favicon.ico") {
    return NextResponse.next();
  }

  // Check public routes (exact match only)
  const isPublicExact = public_routes.some((r) => r.path === pathname);
  if (isPublicExact) {
    return NextResponse.next();
  }

  // Check protected routes
  const matchedProtected = protected_routes.find((r) => {
    if (r.path.endsWith("/*")) {
      const basePath = r.path.slice(0, -2);
      return pathname.startsWith(basePath + "/");
    }
    return pathname === r.path || pathname.startsWith(r.path + "/");
  });

  // Not listed → allow
  if (!matchedProtected) {
    return NextResponse.next();
  }

  // Check authentication only for protected
  const auth = await getCurrentUser();
  if (!auth) {
    return NextResponse.redirect(
      new URL(`/login?callback=${pathname}`, req.url),
    );
  }

  // Check roles
  if (!matchedProtected.allowedRoles.includes(auth.user.role)) {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  return NextResponse.next();
}
