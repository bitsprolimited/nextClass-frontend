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
import { Spinner } from "@/components/ui/spinner";

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
    <div className="bg-white flex items-center justify-center py-12 sm:py-[60px]">
      <div className="bg-[#F5F4F8] w-full max-w-5xl py-10 sm:py-[60px] px-4 sm:px-12 lg:px-40 md:text-center mx-auto rounded-md font-montserrat">
        <h2 className="text-xl sm:text-[28px] font-semibold text-[#2C1E1E] mb-2 font-playfair-display">
          Input Your Registered <span className="text-secondary">Email</span>
        </h2>
        <p className="text-[#3A3A3A] text-sm sm:text-base lg:text-lg mb-8">
          Enter the email address you registered on NextClass to reset your
          password.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="w-full sm:w-[70%] mb-6 sm:mb-8 mx-auto">
            <Input
              type="email"
              placeholder="Email Address"
              className="h-[50px] sm:h-[56px] text-sm sm:text-base px-4"
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
            className="bg-secondary hover:bg-[#e69900] text-white font-medium w-full sm:w-[60%] md:w-[50%] py-4 sm:py-6 rounded-full text-sm sm:text-base mb-4 sm:mb-6"
            disabled={isSubmitting || isPending}
          >
            {isSubmitting || isPending ? <Spinner /> : "Continue"}
          </Button>
        </form>

        <hr className="border-t border-gray-700 w-[80%] sm:w-[60%] mx-auto my-4" />

        <p className="text-xs sm:text-sm text-gray-700 text-center">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="font-medium hover:underline">
            Create an Account
          </Link>
        </p>
      </div>

      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4 sm:p-6">
          <div className="bg-white rounded-xl p-6 sm:p-10 max-w-md w-full text-center shadow-xl">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">
              Kindly Reset your <span className="text-secondary">Password</span>
            </h2>
            <p className="text-gray-700 text-xs sm:text-sm mb-6">
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
              className="bg-secondary hover:bg-[#e69900] text-white py-3 sm:py-4 rounded-full w-full text-xs sm:text-sm font-medium"
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
