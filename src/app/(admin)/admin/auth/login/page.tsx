"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const adminLoginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type AdminLoginSchema = z.infer<typeof adminLoginSchema>;

export default function AdminLogin() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminLoginSchema>({
    resolver: zodResolver(adminLoginSchema),
    mode: "onSubmit",
  });

  const onSubmit = async (data: AdminLoginSchema) => {
    setLoading(true);

    // setTimeout(() => {
    //   console.log("✅ Mock Admin login successful:", data);

    //   localStorage.setItem("admin_token", "mock-token-12345");

    //   setLoading(false);
    //   router.push("/admin");
    // }, 1500);
  };

  return (
    <div className="p-8 bg-[#F9FAFB] min-h-screen ">
      <div className="flex items-center mb-20">
        <Link href="/">
          <Image
            src="/images/next-img.png"
            alt="Next class Logo"
            width={100}
            height={24}
            className="h-full w-full object-cover"
          />
        </Link>
      </div>
      <div className="flex  items-center justify-center ">
        <div className="w-full max-w-md bg-white shadow-md rounded-xl p-8">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <Image
              src="/images/next-img.png"
              alt="NextClass Logo"
              width={116}
              height={60}
            />
          </div>

          <h2 className="text-4xl font-aero-trial font-medium text-[#2C241B] ">
            Login
          </h2>
          <p className=" text-[#757575] mb-6 text-[15px]">
            Login to access your NextClass Admin Account
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="text-gray-400 font-bold text-sm"
              >
                Email Address:
              </label>
              <Input
                type="email"
                placeholder="john@doe.com"
                {...register("email")}
                className=" placeholder:text-[#A6B0BC]"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="text-gray-400 font-bold text-sm"
              >
                Password:
              </label>
              <Input
                type="password"
                placeholder="Enter your password"
                autoComplete="current-password"
                className=" placeholder:text-[#A6B0BC]"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember me + Forgot password */}
            <div className="flex flex-col gap-4 items-center  text-sm">
              <label className="flex items-center gap-2 text-gray-600">
                <input type="checkbox" className="accent-primary" />
                Remember me for 30 days
              </label>
              <a href="/admin/forgot-password" className="text-primary">
                Forgot password?
              </a>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full bg-[#FFA300] hover:bg-[#e09000] rounded-full text-white font-semibold py-5"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
