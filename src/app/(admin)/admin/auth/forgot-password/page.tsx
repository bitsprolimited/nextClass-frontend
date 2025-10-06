"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";
import Link from "next/link";

const forgotPasswordSchema = z.object({
  email: z.string().email("Enter a valid email"),
});

type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPassword() {
  const [loading] = useState(false);
  const [emailSent] = useState(false);
  const [submittedEmail] = useState("");

  const {
    register,
    // handleSubmit,
    formState: { errors },
    // getValues,
  } = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onSubmit",
  });

  // const onSubmit = async (data: ForgotPasswordSchema) => {
  //   setLoading(true);
  //   // Mock API call
  //   setTimeout(() => {
  //     setSubmittedEmail(getValues("email"));
  //     setEmailSent(true);
  //     setLoading(false);
  //   }, 1500);
  // };

  const maskEmail = (email: string): string => {
    if (!email.includes("@")) return email;
    const [username, domain] = email.split("@");
    const maskedUsername =
      username.length > 2
        ? `${username[0]}***${username[username.length - 1]}`
        : `${username[0]}***`;
    return `${maskedUsername}@${domain}`;
  };

  return (
    <div className="p-8 bg-[#F9FAFB] min-h-screen relative">
      {/* Top-left Logo */}
      <div className="flex items-center mb-12">
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

      {/* Forgot Password Card */}
      <div className="flex items-center justify-center">
        <div className="w-full max-w-md bg-white shadow-md rounded-xl p-8">
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
            Forgot Password
          </h2>
          <p className="text-[#757575] mb-6 text-[15px]">
            Enter the email address you registered on NextClass to reset your
            password.
          </p>

          {emailSent && (
            <div className="bg-green-50 text-green-700 text-sm rounded-md p-3 mb-4 border border-green-200">
              ✅ An email with password reset instructions has been sent to{" "}
              <strong>{maskEmail(submittedEmail)}</strong>, if it exists in our
              system.
            </div>
          )}

          <form className="space-y-6">
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
                className="placeholder:text-[#A6B0BC] mt-1"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-[#FFA300] hover:bg-[#e09000] rounded-full text-white font-semibold py-5"
              disabled={loading}
            >
              {loading ? "Sending..." : "Continue"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
