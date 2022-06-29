import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname === "/admin-dashboard") {
    if (req.cookies["admin-token"] !== process.env.NEXT_PUBLIC_ADMIN_TOKEN) {
      return NextResponse.redirect("/admin-login");
    }

    NextResponse.redirect("/admin-dashboard");
  }

  if (req.nextUrl.pathname === "/admin-login") {
    if (req.cookies["admin-token"] === process.env.NEXT_PUBLIC_ADMIN_TOKEN)
      return NextResponse.redirect("/admin-dashboard");
  }
  return NextResponse.next();
}
