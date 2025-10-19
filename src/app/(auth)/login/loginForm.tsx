"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { JSX, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaApple } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa6";
import { toast } from "sonner";
import { z } from "zod";

const loginFormSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type LoginFormSchema = z.infer<typeof loginFormSchema>;

interface PostLoginRedirect {
  returnTo?: string;
  action?: string;
  tutorId?: string;
  tutorName?: string;
}

export function LoginForm(): JSX.Element {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [redirectInfo, setRedirectInfo] = useState<PostLoginRedirect | null>(
    null
  );
  const [isPending, setIsPending] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    mode: "all",
  });

  useEffect(() => {
    const storedRedirect = sessionStorage.getItem("postLoginRedirect");
    if (storedRedirect) {
      try {
        const redirectData = JSON.parse(storedRedirect);
        setRedirectInfo(redirectData);
        sessionStorage.removeItem("postLoginRedirect");
      } catch (error) {
        console.error("Error parsing redirect data:", error);
      }
    } else {
      const returnTo = searchParams.get("returnTo");
      if (returnTo) {
        setRedirectInfo({ returnTo: decodeURIComponent(returnTo) });
      }
    }
  }, [searchParams]);

  // const { mutate, isPending } = useMutation<
  //   LoginResponse,
  //   AxiosError<AxioErrorResponse>,
  //   LoginFormSchema
  // >({
  //   mutationKey: ["login"],
  //   mutationFn: login,
  //   onSuccess: async (data) => {
  //     await createSession({
  //       user: { ...data.user },
  //       accessToken: data.accessToken,
  //       refreshToken: data.refreshToken,
  //     });

  //     if (redirectInfo) {
  //       const redirectTo =
  //         redirectInfo.returnTo ||
  //         getDefaultDashboard(data.user.role, data.user.isProfileComplete);
  //       router.push(redirectTo);
  //       return;
  //     }

  //     if (data.user.role === "parent") {
  //       router.push("/dashboard/parent");
  //       return;
  //     }
  //     if (!data.user.isProfileComplete) {
  //       router.push("/dashboard/profile-setup");
  //       return;
  //     }
  //     router.push("/dashboard/tutor");
  //   },
  //   onError: (error) => {
  //     toast.error("Login failed", {
  //       description: error.response?.data.message || "Please try again later",
  //       duration: 5000,
  //     });
  //   },
  // });

  const getDefaultDashboard = (
    role: string,
    isProfileComplete: boolean
  ): string => {
    if (role === "parent") {
      return "/dashboard/parent";
    }
    if (!isProfileComplete) {
      return "/dashboard/profile-setup";
    }
    return "/dashboard/tutor";
  };

  const onSubmit = async (data: LoginFormSchema) => {
    // mutate(data);
    await authClient.signIn.email(
      {
        email: data.email,
        password: data.password,
      },
      {
        onRequest: () => {
          //show loading
          setIsPending(true);
        },
        onSuccess: (ctx) => {
          toast.success("Login successful");
          if (redirectInfo) {
            const redirectTo =
              redirectInfo.returnTo ||
              getDefaultDashboard(
                ctx.data.user.role,
                ctx.data.user.isProfileComplete
              );
            router.push(redirectTo);
            return;
          }

          if (ctx.data.user.role === "parent") {
            router.push("/dashboard/parent");
            return;
          }
          if (!ctx.data.user.isProfileComplete) {
            router.push("/dashboard/profile-setup");
            return;
          }
          router.push("/dashboard/tutor");
        },
        onError: (ctx) => {
          toast.error("Login failed", {
            description: ctx.error.message || "Please try again later",
            duration: 5000,
          });
        },
      }
    );
  };

  return (
    <div className="bg-[#F5F4F8] px-8 py-10 rounded-md w-full sm:w-[80%] md:w-[50%] max-w-lg shadow-md my-3">
      <div>
        <h2 className="text-2xl font-semibold mb-4">
          <span className="text-gray-900">Login </span>
          <span className="text-[#FFA300] font-bold">Form</span>
        </h2>

        {redirectInfo?.returnTo && !redirectInfo.action && (
          <div className="mb-6 p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-sm text-amber-800">Please login to continue.</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Input
              type="email"
              placeholder="Email Address"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <Input
              type="password"
              placeholder="Password"
              {...register("password")}
              autoComplete="current-password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
            <Link
              href="/forgot-password"
              passHref
              className="text-primary text-sm float-right mt-2 block"
            >
              Forgot Password?
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#FFA300] hover:bg-primary rounded-full py-6 text-white"
            disabled={isSubmitting || isPending}
          >
            {isSubmitting || isPending ? "Logging in..." : "Login"}
          </Button>
        </form>

        <p className="text-center text-gray-500 mt-6">
          You can also login with:
        </p>

        <div className="flex gap-4 justify-center mt-4">
          <Button
            className="bg-primary hover:bg-secondary text-white rounded-full px-6 py-3 flex items-center gap-2 shadow-sm border"
            disabled={isSubmitting || isPending}
            onClick={async () => {
              await authClient.signIn.social({
                provider: "google",
              });
            }}
          >
            <FaGoogle className="w-5 h-5" />
            Sign Up With Google
          </Button>
          <Button
            className="bg-primary hover:bg-secondary text-white rounded-full px-6 py-3 flex items-center gap-2 shadow-sm"
            disabled={isSubmitting || isPending}
          >
            <FaApple className="w-5 h-5" />
            Sign Up With Apple
          </Button>
        </div>

        <div className="my-6 border-t border-black w-[60%] mx-auto" />

        <p className="text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            href={
              redirectInfo
                ? `/sign-up?returnTo=${encodeURIComponent(
                    redirectInfo.returnTo || ""
                  )}`
                : "/sign-up"
            }
            className="text-primary font-medium"
          >
            Create an Account
          </Link>
        </p>
      </div>
    </div>
  );
}
