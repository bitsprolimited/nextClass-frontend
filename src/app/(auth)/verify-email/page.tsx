"use client";

import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import Footer from "@/components/footer";
import Header from "@/components/Header";
import { resendVerificationEmail, verifyEmail } from "@/services/auth.service";
import { AxioErrorResponse } from "@/types";
import { AxiosError } from "axios";
import {
  ArrowRight,
  CheckCircle,
  Loader2,
  Mail,
  RefreshCw,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Image from "next/image";

export default function EmailVerificationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [verificationStatus, setVerificationStatus] = useState<
    "loading" | "success" | "error" | "expired"
  >("loading");
  const [userEmail, setUserEmail] = useState("");
  const [countdown, setCountdown] = useState(5);

  const { mutate: verify } = useMutation({
    mutationFn: verifyEmail,
    onSuccess: () => {
      setVerificationStatus("success");
      toast.success("Email verified successfully!", {
        className: "bg-green-50 text-green-800 border-green-200",
        duration: 3000,
      });

      // Start countdown for redirect
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            router.push("/login");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    },
    onError: (error: AxiosError<AxioErrorResponse>) => {
      const errorMessage = error.response?.data.message;

      if (
        typeof errorMessage === "string" &&
        (errorMessage.includes("expired") || errorMessage.includes("invalid"))
      ) {
        setVerificationStatus("expired");
      } else {
        setVerificationStatus("error");
      }

      toast.error("Verification failed", {
        className: "bg-red-50 text-red-800 border-red-200",
        description: errorMessage,
        duration: 5000,
      });
    },
  });

  // Resend verification mutation
  const { mutate: resend, isPending: isResending } = useMutation({
    mutationFn: resendVerificationEmail,
    onSuccess: () => {
      toast.success("Verification email sent!", {
        className: "bg-blue-50 text-blue-800 border-blue-200",
        description: "Please check your inbox and spam folder",
        duration: 5000,
      });
    },
    onError: (error: Error) => {
      toast.error("Failed to resend email", {
        className: "bg-red-50 text-red-800 border-red-200",
        description: error.message || "Please try again later",
        duration: 5000,
      });
    },
  });

  useEffect(() => {
    if (token) {
      verify(token);
    } else {
      setVerificationStatus("error");
    }
  }, [token, verify]);

  const handleResendVerification = () => {
    if (userEmail) {
      resend(userEmail);
    }
  };

  const renderContent = () => {
    switch (verificationStatus) {
      case "loading":
        return (
          <div className="text-center space-y-6">
            <div className="mx-auto w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
              <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Verifying Your Email
              </h1>
              <p className="text-gray-600">
                Please wait while we verify your email address...
              </p>
            </div>
          </div>
        );

      case "success":
        return (
          <div className="text-center space-y-6">
            <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Email Verified Successfully!
              </h1>
              <p className="text-gray-600 mb-4">
                Your email has been verified. You can now access your account.
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <p className="text-green-800 text-sm">
                  Redirecting to login in{" "}
                  <span className="font-bold text-green-600">{countdown}</span>{" "}
                  seconds...
                </p>
              </div>
            </div>
            <Link href="/login">
              <Button className="bg-[#FFA300] hover:bg-[#e6920a] text-white rounded-full px-8 py-3 font-medium transition-all duration-200 transform hover:scale-105">
                Go to Login
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        );

      case "expired":
        return (
          <div className="text-center space-y-6">
            <div className="mx-auto w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center">
              <XCircle className="w-10 h-10 text-amber-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Verification Link Expired
              </h1>
              <p className="text-gray-600 mb-6">
                The verification link has expired or is invalid. Please request
                a new verification email.
              </p>
            </div>
            <div className="space-y-4">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-amber-600" />
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="flex-1 bg-transparent border-none outline-none text-amber-800 placeholder-amber-500"
                  />
                </div>
              </div>
              <Button
                onClick={handleResendVerification}
                disabled={isResending || !userEmail}
                className="bg-[#FFA300] hover:bg-[#e6920a] text-white rounded-full px-8 py-3 font-medium transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
              >
                {isResending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Resend Verification Email
                  </>
                )}
              </Button>
            </div>
          </div>
        );

      case "error":
        return (
          <div className="text-center space-y-6">
            <div className="mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
              <XCircle className="w-10 h-10 text-red-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Verification Failed
              </h1>
              <p className="text-gray-600 mb-6">
                We couldn&apos;t verify your email address. The link may be
                invalid or expired.
              </p>
            </div>
            <div className="space-y-4">
              <Link href="/signup">
                <Button className="bg-gray-600 hover:bg-gray-700 text-white rounded-full px-8 py-3 font-medium transition-all duration-200 transform hover:scale-105 mr-4">
                  Sign Up Again
                </Button>
              </Link>
              <Link href="/login">
                <Button className="bg-[#FFA300] hover:bg-[#e6920a] text-white rounded-full px-8 py-3 font-medium transition-all duration-200 transform hover:scale-105">
                  Go to Login
                </Button>
              </Link>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          {/* Logo/Brand Section */}
          <div className="text-center mb-8">
            <div className="mx-auto flex items-center justify-center mb-4">
              <Image
                src="/images/Logo.png"
                alt="Logo"
                width={200}
                height={200}
              />
            </div>
          </div>

          {/* Main Content Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            {renderContent()}
          </div>

          {/* Footer */}
          <div className="text-center mt-8 text-sm text-gray-500">
            <p>
              Need help?{" "}
              <Link href="/support" className="text-[#031D95] hover:underline">
                Contact Support
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
