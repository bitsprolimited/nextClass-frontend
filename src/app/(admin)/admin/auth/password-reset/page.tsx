"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PasswordMeter from "@/components/auth/passwordMeter";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const passwordResetSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase, one lowercase, and one number"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type PasswordResetSchema = z.infer<typeof passwordResetSchema>;

export default function PasswordReset({
  token,
}: {
  token: string | string[] | undefined;
}) {
  const [showPopup, setShowPopup] = useState(false);
  // const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<PasswordResetSchema>({
    resolver: zodResolver(passwordResetSchema),
    mode: "all",
  });

  const password = watch("password", "");

  // useEffect(() => {
  //   if (!token) {
  //     router.push("/forgot-password");
  //   }
  // }, [token, router]);

  const onSubmit = async (data: PasswordResetSchema) => {
    if (!token) {
      alert("Invalid or expired reset token");
      return;
    }

    // Mock API call to simulate server request
    setTimeout(() => {
      setShowPopup(true);
    }, 1200);
  };

  // if (!token) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen">
  //       <p>Loading...</p>
  //     </div>
  //   );
  // }

  return (
    <div className="p-8 bg-[#F9FAFB] min-h-screen relative">
      {/* Top-left Logo */}
      <div className="flex items-center mb-12">
        <Link href="/">
          <Image
            src="/images/next-img.png"
            alt="NextClass Logo"
            width={100}
            height={24}
            className="h-full w-full object-cover"
          />
        </Link>
      </div>

      {/* Password Reset Card */}
      <div className="flex items-center justify-center">
        <div className="w-full max-w-md bg-white shadow-md rounded-xl p-8 relative">
          {/* Center Logo */}
          <div className="flex justify-center mb-4">
            <Image
              src="/images/next-img.png"
              alt="NextClass Logo"
              width={100}
              height={40}
            />
          </div>

          <h2 className="text-3xl font-aero-trial font-medium text-[#2C241B] mb-2">
            Reset Password
          </h2>
          <p className="text-[#757575] mb-6 text-[15px]">
            Kindly set up your new password. Make sure it is secure and easy to
            remember.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label
                htmlFor="password"
                className="text-gray-400 font-bold text-sm"
              >
                Password:
              </label>
              <Input
                type="password"
                placeholder="Enter new password"
                {...register("password")}
                autoComplete="new-password"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="text-gray-400 font-bold text-sm"
              >
                Password:
              </label>
              <Input
                type="password"
                placeholder="Confirm new password"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-[#FFA300] hover:bg-[#e09000] rounded-full text-white font-semibold py-5"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Creating New Password..."
                : "Create New Password"}
            </Button>
          </form>
        </div>
      </div>

      {/* ✅ Success Popup */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 w-full p-6">
          <div className="bg-white rounded-xl p-8 sm:p-10 w-full max-w-[90vw] md:max-w-[600px] text-center shadow-xl">
            <h2 className="text-xl font-semibold mb-4">
              Password Changed{" "}
              <span className="text-[#FFA300]">Successfully</span>
            </h2>
            <p className="text-gray-700 text-sm mb-6">
              You have successfully reset your password. You will be redirected
              to the login page.
            </p>

            <Image
              src="/images/image-164.png"
              alt="Success"
              width={350}
              height={250}
              className="mx-auto mb-6"
            />

            <Link href="/login">
              <Button
                className="bg-[#FFA300] text-white py-6 rounded-full hover:bg-[#e69500] w-full"
                onClick={() => setShowPopup(false)}
              >
                Go to Login
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
