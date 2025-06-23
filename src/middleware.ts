import { getSession } from "@/services/session";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/tutorDashboard"];
const publicRoutes = ["/login", "/signUp", "/"];

export default async function middleware(req: NextRequest) {    
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const session = await getSession();
  if (isProtectedRoute && (!session || !session.user))
    return NextResponse.redirect(new URL("/login", req.nextUrl));

  if (
    isPublicRoute &&
    session?.user &&
    !req.nextUrl.pathname.startsWith("/tutorDashboard")
  ) {
    return NextResponse.redirect(new URL("/tutorDashboard", req.nextUrl));
  }

  NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};