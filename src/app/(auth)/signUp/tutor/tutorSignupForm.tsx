"use client";

import PasswordMeter from "@/components/auth/passwordMeter";
import VerifyEmailAlert from "@/components/auth/verify-email-alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { tutorSignup } from "@/services/auth.service";
import { AuthResponse, AxioErrorResponse } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Link from "next/link";
import { JSX, useState } from "react";
import { useForm } from "react-hook-form";
import { FaApple, FaGoogle } from "react-icons/fa";
import { toast } from "sonner";
import { z } from "zod";

const tutorSignupFormSchema = z
  .object({
    fullName: z.string().min(2, "Full name must be at least 2 characters"),
    email: z.string().email("Enter a valid email"),
    phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    agreeTerms: z.boolean().refine((val) => val, "You must agree to the terms"),
    confirmAge: z
      .boolean()
      .refine((val) => val, "You must confirm you are 18 or older"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type TutorSignupFormSchema = z.infer<typeof tutorSignupFormSchema>;

export default function TutorSignupForm(): JSX.Element {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<TutorSignupFormSchema>({
    resolver: zodResolver(tutorSignupFormSchema),
    mode: "all",
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      agreeTerms: false,
      confirmAge: false,
    },
  });

  const password = watch("password");

  const { mutate, isPending } = useMutation<
    AuthResponse,
    AxiosError<AxioErrorResponse>,
    TutorSignupFormSchema
  >({
    mutationKey: ["tutorSignup"],
    mutationFn: tutorSignup,
    onSuccess: async () => {
      toast("Signup successful", {
        className: "bg-[#F5F4F8] text-[#031D95]",
        duration: 5000,
      });
      setOpen(true);
    },
    onError: (error) => {
      console.error("Signup failed:", error);
      toast("Signup failed", {
        className: "bg-[#F5F4F8] text-[#031D95]",
        description: error.response?.data.message,
        duration: 5000,
      });
    },
  });

  const onSubmit = async (data: TutorSignupFormSchema) => {
    mutate(data);
  };

  return (
    <div className="flex flex-col items-end w-[70%] mx-auto">
      <Link href="/signup" className="my-4">
        <Button className="bg-[#F5F4F8] text-[20px] text-[#031D95] px-4 py-3 rounded-full">
          Sign up as a parent
        </Button>
      </Link>

      <section className="w-full mb-5 bg-[#F5F4F8] py-10 px-2 md:px-4 lg:px-6 flex justify-center items-center">
        <div className="w-full max-w-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
            <div className="w-[70%] mx-auto space-y-5 relative">
              <h2 className="text-2xl font-semibold">
                Tutors&apos;{" "}
                <span className="text-[#FFA300]">Registration</span>
              </h2>

              <div>
                <Input
                  className="h-auto py-4 pl-5"
                  type="text"
                  placeholder="Full Name"
                  {...register("fullName")}
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              <div>
                <Input
                  className="h-auto py-4 pl-5"
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

              <div className="space-y-5">
                {/* Phone Input with Country Code */}
                <div>
                  <div className="flex gap-2">
                    <div className="w-[80px]">
                      <Input
                        className="h-auto py-4 pl-5"
                        type="text"
                        value="+234"
                        disabled
                      />
                    </div>
                    <Input
                      className="h-auto py-4 pl-5"
                      type="tel"
                      placeholder="0xxxxxxxxx00"
                      {...register("phoneNumber")}
                    />
                  </div>
                  {errors.phoneNumber && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.phoneNumber.message}
                    </p>
                  )}
                </div>

                <div>
                  <Input
                    className="h-auto py-4 pl-5"
                    type="password"
                    placeholder="Password"
                    {...register("password")}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div>
                  <Input
                    className="h-auto py-4 pl-5"
                    type="password"
                    placeholder="Confirm Password"
                    {...register("confirmPassword")}
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </div>
              {/* Floating password meter to the right */}
              <div className="absolute left-full ml-5 top-1/2 w-full">
                <PasswordMeter password={password || ""} />
              </div>
            </div>

            {/* Checkboxes */}
            <div className="space-y-3 text-sm">
              <div>
                <label className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    {...register("agreeTerms")}
                    className="accent-orange-500 mt-1"
                  />
                  <span>
                    By clicking Create Account or Sign Up with Google or Apple,
                    you agree to our{" "}
                    <a href="#" className="text-blue-500 underline">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-blue-500 underline">
                      Privacy Policy
                    </a>
                    .
                  </span>
                </label>
                {errors.agreeTerms && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.agreeTerms.message}
                  </p>
                )}
              </div>

              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    {...register("confirmAge")}
                    className="accent-orange-500"
                  />
                  I confirm that I&apos;m 18 years of age or older
                </label>
                {errors.confirmAge && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.confirmAge.message}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="w-[70%] mx-auto flex justify-center">
              <Button
                type="submit"
                disabled={isSubmitting || isPending}
                className="w-full bg-[#FFA300] hover:bg-primary rounded-full py-6 text-white text-base disabled:opacity-50"
              >
                {isSubmitting || isPending
                  ? "Creating Account..."
                  : "Create An Account"}
              </Button>
            </div>

            <p className="text-sm text-center text-gray-500">
              You can also sign up with:
            </p>

            {/* Google/Apple Buttons */}
            <div className="flex gap-4 justify-center mt-4">
              <Button
                type="button"
                className="bg-primary hover:bg-secondary rounded-full px-6 py-4 flex items-center gap-2 shadow-sm border"
              >
                <FaGoogle className="w-5 h-5" />
                Sign Up With Google
              </Button>
              <Button
                type="button"
                className="bg-primary hover:bg-secondary rounded-full px-6 py-4 flex items-center gap-2 shadow-sm"
              >
                <FaApple className="w-5 h-5" />
                Sign Up With Apple
              </Button>
            </div>
          </form>

          <div className="my-6 border-t border-gray-800 w-[60%] mx-auto" />

          <p className="mt-8 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 underline">
              Login
            </Link>
          </p>
        </div>
      </section>
      <VerifyEmailAlert open={open} onOpenChange={setOpen} />
    </div>
  );
}
