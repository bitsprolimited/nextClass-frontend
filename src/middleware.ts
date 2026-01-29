import { NextRequest, NextResponse } from "next/server";
import { authClient } from "./lib/auth-client";

const publicRoutes = new Set([
  "/",
  "/login",
  "/sign-up",
  "/sign-up/tutor",
  "/forgot-password",
]);

const roleDashboards: Record<string, string> = {
  parent: "/dashboard/parent",
  teacher: "/dashboard/tutor",
  admin: "/admin",
};

const protectedRoutes = [
  "/dashboard/meeting",
  "/dashboard/messages",
  "/dashboard/parent",
  "/dashboard/profile-setup",
  "/dashboard/schedule",
  "/dashboard/settings",
  "/dashboard/tutor",
  "/admin",
];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // Skip middleware for assets and API
  if (
    path.startsWith("/_next") ||
    path.startsWith("/api") ||
    path.endsWith(".png") ||
    path.endsWith(".jpg") ||
    path.endsWith(".jpeg") ||
    path.endsWith(".svg")
  ) {
    return NextResponse.next();
  }

  try {
    const { data: session } = await authClient.getSession({
      fetchOptions: {
        headers: {
          cookie: req.headers.get("cookie") || "",
        },
        credentials: "include",
      },
    });

    const user = session?.user;
    const isAuthenticated = Boolean(user);
    const isPublicRoute = publicRoutes.has(path);
    const isProtectedRoute = protectedRoutes.some((r) => path.startsWith(r));

    // 1️⃣ Require login for protected routes
    if (isProtectedRoute && !isAuthenticated) {
      return redirect("/login", req);
    }

    // 2️⃣ Redirect logged-in users away from public routes
    if (isAuthenticated && isPublicRoute) {
      const dashboard =
        user && user.role && roleDashboards[user.role]
          ? roleDashboards[user.role]
          : "/dashboard";
      return redirect(dashboard, req);
    }

    // 3️⃣ Role-based access control
    // if (path.startsWith("/admin") && user?.role !== "admin") {
    //   return redirect("/unauthorized", req);
    // }

    if (path.startsWith("/dashboard/tutor") && user?.role !== "teacher") {
      return redirect("/unauthorized", req);
    }

    if (path.startsWith("/dashboard/parent") && user?.role !== "parent") {
      return redirect("/unauthorized", req);
    }

    // 4️⃣ Tutor profile setup flow
    if (user?.role === "teacher") {
      const isProfileComplete = user?.isProfileComplete;

      // Redirect incomplete tutors trying to access tutor dashboard
      if (path.startsWith("/dashboard/tutor") && !isProfileComplete) {
        return redirect("/dashboard/profile-setup", req);
      }

      // Redirect complete tutors away from setup
      if (path.startsWith("/dashboard/profile-setup") && isProfileComplete) {
        return redirect("/dashboard/tutor", req);
      }
    }

    // ✅ Allow request through
    return NextResponse.next();
  } catch (error) {
    console.error("Middleware session check failed:", error);
    return redirect("/login", req);
  }
}

// Helper function for clean redirects
function redirect(path: string, req: NextRequest) {
  const url = new URL(path, req.nextUrl.origin);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
  runtime: "nodejs",
};
