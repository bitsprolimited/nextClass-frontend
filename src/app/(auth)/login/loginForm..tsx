"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { JSX } from "react";
import { useForm } from "react-hook-form";
import { FaApple } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa6";
import { z } from "zod";
import { useRouter } from "next/navigation"; // ✅ import router

const formSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type FormSchema = z.infer<typeof formSchema>;

export function LoginForm(): JSX.Element {
  const router = useRouter(); // ✅ initialize router

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormSchema) => {
    console.log(data);

    // Normally you would verify login here.
    // For now, simulate login success and redirect:
    setTimeout(() => {
      router.push("/tutorDashboard"); // ✅ redirect to dashboard
    }, 1000);
  };

  return (
    <div className="bg-[#F5F4F8] px-8 py-10 rounded-md w-[50%] max-w-lg shadow-md my-3">
      <div>
        <h2 className="text-2xl font-semibold mb-8">
          <span className="text-gray-900">Login </span>
          <span className="text-[#FFA300] font-bold">Form</span>
        </h2>

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
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
            <Link
              href="/forgotPassword"
              passHref
              className="text-blue-800 text-sm float-right mt-2 block"
            >
              Forgot Password?
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#FFA300] hover:bg-gray-800 rounded-full py-6 text-white"
          >
            {isSubmitting ? "Logging in..." : "Login To My Account"}
          </Button>
        </form>

        <p className="text-center text-gray-500 mt-6">
          You can also login with:
        </p>

        <div className="flex gap-4 justify-center mt-4">
          <Button className="bg-blue-900 text-white rounded-full px-6 py-3 flex items-center gap-2 shadow border">
            <FaGoogle className="w-5 h-5" />
            Sign Up With Google
          </Button>
          <Button className="bg-blue-900 text-white rounded-full px-6 py-3 flex items-center gap-2 shadow">
            <FaApple className="w-5 h-5" />
            Sign Up With Apple
          </Button>
        </div>

        <div className="my-6 border-t border-black w-[60%] mx-auto" />

        <p className="text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link href="/signUp" className="text-blue-700 font-medium">
            Create an Account
          </Link>
        </p>
      </div>
    </div>
  );
}
