"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import Image from "next/image";
import Link from "next/link";
import { JSX } from "react";
import { AxioErrorResponse, ForgotPasswordResponse } from "@/types";
import { forgotPassword } from "@/services/auth.service";
import { AxiosError } from "axios";
import { toast } from "sonner";

const forgotPasswordFormSchema = z.object({
  email: z.string().email("Enter a valid email"),
});

export type ForgotPasswordFormSchema = z.infer<typeof forgotPasswordFormSchema>;

const ForgotPasswordForm = (): JSX.Element => {
  const [showPopup, setShowPopup] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm<ForgotPasswordFormSchema>({
    resolver: zodResolver(forgotPasswordFormSchema),
    mode: "all",
  });

  const { mutate, isPending } = useMutation<
    ForgotPasswordResponse,
    AxiosError<AxioErrorResponse>,
    ForgotPasswordFormSchema
  >({
    mutationKey: ["forgot-password"],
    mutationFn: forgotPassword,
    onSuccess: () => {
      const email = getValues("email");
      setSubmittedEmail(email);
      setShowPopup(true);
      toast.success("Password reset email sent successfully!", {
        duration: 3000,
      });
    },
    onError: (error) => {
      console.error("Failed to send password reset email:", error);
      toast.error("Failed to send password reset email", {
        description: error.response?.data.message || "Please try again later",
        duration: 5000,
      });
    },
  });

  const onSubmit = async (data: ForgotPasswordFormSchema) => {
    mutate(data);
  };

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
    <div className="bg-white flex items-center justify-center px-4 py-[60px]">
      <div className="bg-[#F5F4F8] w-full max-w-5xl py-[60px] px-40 text-center mx-auto">
        <h2 className="text-2xl sm:text-[28px] font-semibold text-[#2C1E1E] mb-2">
          Input Your Registered <span className="text-[#FFA300]">Email</span>
        </h2>
        <p className="text-[#3A3A3A] text-base sm:text-lg mb-8">
          Enter the email address you registered on NextClass to reset your
          password.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="w-[70%] mb-8 mx-auto">
            <Input
              type="email"
              placeholder="Email Address"
              className="h-[56px] text-base px-4"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-2 text-left">
                {errors.email.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="bg-[#FFA300] hover:bg-[#e69900] text-white font-medium w-[50%] py-6 rounded-full text-base mb-6"
            disabled={isSubmitting || isPending}
          >
            {isSubmitting || isPending ? "Sending..." : "Continue"}
          </Button>
        </form>

        <hr className="border-t border-gray-700 w-[60%] mx-auto my-4" />

        <p className="text-sm text-gray-700">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-medium hover:underline">
            Create an Account
          </Link>
        </p>
      </div>

      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-6">
          <div className="bg-white rounded-xl p-10 max-w-lg w-full text-center shadow-xl">
            <h2 className="text-xl font-semibold mb-4">
              Kindly Reset your <span className="text-[#FFA300]">Password</span>
            </h2>
            <p className="text-gray-700 text-sm mb-6">
              We sent a password reset link to{" "}
              <strong>{maskEmail(submittedEmail)}</strong>. Email messages may
              take a few minutes to arrive.
            </p>
            <Image
              src="/images/mailbox.png"
              alt="Mailbox"
              width={350}
              height={250}
              className="mx-auto mb-6"
            />
            <Button
              className="bg-[#FFA300] hover:bg-[#e69900] text-white py-4 rounded-full w-full text-sm font-medium"
              onClick={() => setShowPopup(false)}
            >
              Continue
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPasswordForm;
