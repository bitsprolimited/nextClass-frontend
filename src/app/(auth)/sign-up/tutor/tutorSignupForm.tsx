"use client";

import PasswordMeter from "@/components/auth/passwordMeter";
import VerifyEmailAlert from "@/components/auth/verify-email-alert";
import PhoneInputComponent from "@/components/PhoneInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth-client";
import { tutorSignupFormSchema, TutorSignupFormSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { JSX, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaApple, FaGoogle } from "react-icons/fa";
import { toast } from "sonner";

export default function TutorSignupForm(): JSX.Element {
  const [open, setOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    control,
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

  // const { mutate, isPending } = useMutation<
  //   AuthResponse,
  //   AxiosError<AxioErrorResponse>,
  //   TutorSignupFormSchema
  // >({
  //   mutationKey: ["tutorSignup"],
  //   mutationFn: tutorSignup,
  //   onSuccess: async () => {
  //     toast("Signup successful", {
  //       className: "bg-[#F5F4F8] text-[#031D95]",
  //       duration: 5000,
  //     });
  //     setOpen(true);
  //   },
  //   onError: (error) => {
  //     console.error("Signup failed:", error);
  //     toast("Signup failed", {
  //       className: "bg-[#F5F4F8] text-[#031D95]",
  //       description: error.response?.data.message,
  //       duration: 5000,
  //     });
  //   },
  // });

  const onSubmit = async (data: TutorSignupFormSchema) => {
    // mutate(data);
    await authClient.signUp.email(
      {
        email: data.email,
        password: data.password,
        name: data.fullName,
        phoneNumber: data.phoneNumber,
        role: "teacher",
      },
      {
        onRequest: () => {
          setIsPending(true);
        },
        onSuccess: () => {
          toast("Signup successful", {
            className: "bg-[#F5F4F8] text-[#031D95]",
            duration: 5000,
          });
          setOpen(true);
          setIsPending(false);
        },
        onError: (ctx) => {
          console.error("Signup failed:", ctx.error);
          toast("Signup failed", {
            className: "bg-[#F5F4F8] text-[#031D95]",
            description: ctx.error.message,
            duration: 5000,
          });
          setIsPending(false);
        },
      }
    );
  };

  return (
    <div className="flex flex-col items-end w-full max-w-[1176px] mx-auto">
      <Link href="/sign-up" className="my-4 mr-4 self-end">
        <Button className="bg-[#F5F4F8] md:text-xl text-[#031D95] hover:text-white px-4 py-3 rounded-full font-playfair-display">
          Sign up as a parent
        </Button>
      </Link>

      <section className="w-full mb-5 bg-[#F5F4F8] py-8 px-4 md:px-6 flex justify-center items-center font-montserrat">
        <div className="w-full max-w-[418px]">
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
            <div className="w-full mx-auto space-y-5 relative">
              <h2 className="text-xl md:text-2xl font-semibold text-center md:text-left font-playfair-display">
                Tutors&apos;{" "}
                <span className="text-[#FFA300]">Registration</span>
              </h2>

              {/* Full Name */}
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

              {/* Email */}
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

              {/* Phone */}
              <div>
                <div className="flex gap-2">
                  <Controller
                    name="phoneNumber"
                    control={control}
                    render={({ field }) => (
                      <PhoneInputComponent
                        className="bg-white border border-gray-300 rounded-lg text-gray-700 text-sm"
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Enter phone number"
                      />
                    )}
                  />
                </div>
                {errors.phoneNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>

              {/* Passwords */}
              <div className="space-y-5">
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

              {/* Password Meter - stacked on mobile, floated on md+ */}
              <div className="mt-2 block lg:hidden">
                <PasswordMeter password={password || ""} />
              </div>
              <div className="hidden lg:block absolute left-full ml-5 top-1/2 w-full">
                <PasswordMeter password={password || ""} />
              </div>
            </div>

            {/* Checkboxes */}
            <div className="space-y-3 text-sm">
              <label className="flex items-start gap-2">
                <input
                  type="checkbox"
                  {...register("agreeTerms")}
                  className="accent-orange-500 mt-1"
                />
                <span>
                  By clicking Create Account or Sign Up with Google or Apple,
                  you agree to our{" "}
                  <Link
                    href="/terms-conditions"
                    className="text-blue-500 underline"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy-policy"
                    className="text-blue-500 underline"
                  >
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>
              {errors.agreeTerms && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.agreeTerms.message}
                </p>
              )}

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

            {/* Submit Button */}
            <div className="w-full flex justify-center">
              <Button
                type="submit"
                disabled={isSubmitting || isPending}
                className="w-full bg-[#FFA300] hover:bg-primary rounded-full py-6 text-white text-base disabled:opacity-50"
              >
                {isSubmitting || isPending ? <Spinner /> : "Create An Account"}
              </Button>
            </div>

            <p className="text-sm text-center text-gray-500">
              You can also sign up with:
            </p>

            {/* Google/Apple Buttons */}
            <div className="flex flex-col md:flex-row gap-2.5 justify-center mt-4">
              <Button
                type="button"
                className="bg-primary hover:bg-secondary rounded-full px-6 py-4 flex items-center gap-2 shadow-sm border w-full sm:w-auto"
              >
                <FaGoogle className="w-5 h-5" />
                Sign Up With Google
              </Button>
              <Button
                type="button"
                className="bg-primary hover:bg-secondary rounded-full px-6 py-4 flex items-center gap-2 shadow-sm w-full sm:w-auto"
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
