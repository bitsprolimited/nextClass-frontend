import { getSession } from "@/services/session";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/dashboard/tutor", "/dashboard/parent"];
// const protectedRoutes: string[] = [];
const publicRoutes = [
  "/login",
  "/sign-up",
  "/sign-up/tutor",
  "/",
  "/forgot-password",
];

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
    !req.nextUrl.pathname.startsWith("/dashboard")
  ) {
    return NextResponse.redirect(
      new URL(
        `${
          session.user.role === "parent"
            ? "/dashboard/parent"
            : "/dashboard/tutor"
        }`,
        req.nextUrl
      )
    );
  }

  if (path.includes("/admin") && session?.user.role !== "admin") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  if (path.startsWith("/dashboard/tutor") && session?.user.role !== "teacher") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  if (path.startsWith("/dashboard/parent") && session?.user.role !== "parent") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  // if (
  //   path.includes("dashboard/tutor") &&
  //   session?.user.role == "teacher" &&
  //   !session?.user.isProfileComplete
  // ) {
  //   return NextResponse.redirect(new URL("/dashboard/profile-setup", req.url));
  // }

  NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
