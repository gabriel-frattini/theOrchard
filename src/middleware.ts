import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/admin")) {
    if (
      req.cookies.get("admin-token") !== process.env.NEXT_PUBLIC_ADMIN_TOKEN
    ) {
      return NextResponse.rewrite(new URL("/login-admin", req.url));
    }
    NextResponse.rewrite(new URL("/admin", req.url));
  }
  if (req.nextUrl.pathname === "/login-admin") {
    if (
      req.cookies.get("admin-token") === process.env.NEXT_PUBLIC_ADMIN_TOKEN
    ) {
      return NextResponse.rewrite(new URL("/admin", req.url));
    }
    return NextResponse.rewrite(new URL("/", req.url));
  }

  return NextResponse.next();
}
