"use client";

import PasswordMeter from "@/components/auth/passwordMeter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { resetPassword } from "@/services/auth.service";
import { AxioErrorResponse, ForgotPasswordResponse } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { JSX, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const passwordResetFormSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type PasswordResetFormSchema = z.infer<typeof passwordResetFormSchema>;

const PasswordResetForm = ({
  token,
}: {
  token: string | string[] | undefined;
}): JSX.Element => {
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<PasswordResetFormSchema>({
    resolver: zodResolver(passwordResetFormSchema),
    mode: "all",
  });

  const password = watch("password", "");

  useEffect(() => {
    if (!token) {
      router.push("/forgot-password");
    }
  }, [router, token]);

  const { mutate, isPending } = useMutation<
    ForgotPasswordResponse,
    AxiosError<AxioErrorResponse>,
    { password: string; token: string }
  >({
    mutationKey: ["reset-password"],
    mutationFn: resetPassword,
    onSuccess: () => {
      setShowPopup(true);
      toast.success("Password reset successfully!", {
        duration: 3000,
      });
    },
    onError: (error) => {
      console.error("Failed to reset password:", error);
      toast.error("Failed to reset password", {
        description: error.response?.data.message || "Please try again later",
        duration: 5000,
      });
    },
  });

  const onSubmit = async (data: PasswordResetFormSchema) => {
    if (!token) {
      alert("Invalid or expired reset token");
      return;
    }

    mutate({
      password: data.password,
      token: token as string,
    });
  };

  // Show loading or redirect if no token
  if (!token) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center my-5 relative">
      <div className="bg-[#f7f5fa] py-10 px-4 md:px-10 lg:px-20 w-full max-w-2xl relative flex justify-center">
        <div className="w-full max-w-md text-center">
          <h2 className="text-2xl font-semibold mb-2">
            Reset your <span className="text-[#FFA300]">Password</span>
          </h2>
          <p className="text-gray-600 mb-6 text-sm">
            Kindly setup your new password. Make sure it is secure, simple and
            easy-to-remember
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-4 text-left">
              <div>
                <Input
                  type="password"
                  placeholder="Input Password"
                  {...register("password")}
                  autoComplete="new-password"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div>
                <Input
                  type="password"
                  placeholder="Confirm New Password"
                  {...register("confirmPassword")}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            <Button
              type="submit"
              className="mt-6 w-full bg-[#FFA300] text-white font-semibold py-3 rounded-full hover:bg-[#e69500] transition duration-300"
              disabled={isSubmitting || isPending}
            >
              {isSubmitting || isPending
                ? "Creating New Password..."
                : "Create New Password"}
            </Button>
          </form>
        </div>

        {/* PasswordMeter floats beside the form */}
        <div className="hidden md:block absolute right-[-420px] top-[100px] z-10">
          <PasswordMeter password={password} />
        </div>
      </div>

      {/* ✅ Popup */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 w-full p-10">
          <div className="bg-white rounded-xl p-6 sm:p-10 w-full max-w-[90vw] md:max-w-[600px] xl:max-w-[700px] text-center shadow-xl relative">
            <h2 className="text-xl font-semibold mb-4">
              Password Changed
              <span className="text-[#FFA300]"> Successfully</span>
            </h2>
            <p className="text-gray-700 text-sm mb-6">
              You have successfully reset your password. You will be
              automatically redirected to the Login page to input your correct
              details.
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
};

export default PasswordResetForm;
