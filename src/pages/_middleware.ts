import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/admin")) {
    if (req.cookies["admin-token"] !== process.env.NEXT_PUBLIC_ADMIN_TOKEN) {
      return NextResponse.redirect("/login-admin");
    }

    NextResponse.redirect("/admin");
  }

  if (req.nextUrl.pathname === "/login-admin") {
    if (req.cookies["admin-token"] === process.env.NEXT_PUBLIC_ADMIN_TOKEN)
      return NextResponse.redirect("/admin");
  }
  return NextResponse.next();
}
