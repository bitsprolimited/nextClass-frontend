"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";

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

    // Mocked login (replace with API call when backend is ready)
    setTimeout(() => {
      setLoading(false);
      console.log("✅ Admin logged in:", data);
      router.push("/admin"); // redirect to admin dashboard
    }, 1500);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F9FAFB]">
      <div className="w-full max-w-md bg-white shadow-md rounded-xl p-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src="/logo.svg" alt="NextClass Logo" className="h-10" />
        </div>

        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Login
        </h2>
        <p className="text-center text-gray-500 mb-6 text-sm">
          Login to access your NextClass Admin Account
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div>
            <Input
              type="email"
              placeholder="Email Address"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <Input
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Remember me + Forgot password */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-600">
              <input type="checkbox" className="accent-[#FFA300]" />
              Remember me for 30 days
            </label>
            <a href="/admin/forgot-password" className="text-[#FFA300]">
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
  );
}
