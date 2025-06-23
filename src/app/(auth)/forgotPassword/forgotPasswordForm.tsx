"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const ForgotPasswordForm = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [email, setEmail] = useState("");

  const handleContinue = () => {
    if (email) {
      setShowPopup(true);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-[20px]">
      <div className="bg-[#F5F4F8] w-full max-w-5xl py-[60px] px-40 text-center mx-auto">
        <h2 className="text-2xl sm:text-[28px] font-semibold text-[#2C1E1E] mb-2">
          Input Your Registered <span className="text-[#FFA300]">Email</span>
        </h2>
        <p className="text-[#3A3A3A] text-base sm:text-lg mb-8">
          Enter the email address you registered on NextClass to reset your
          password.
        </p>

        <div className="w-[70%] mb-8 mx-auto">
          <Input
            type="email"
            placeholder="Email Address"
            className="h-[56px] text-base px-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <Link href="/passwordReset">
          <Button
            className="bg-[#FFA300] hover:bg-[#e69900] text-white font-medium w-[50%] py-6 rounded-full text-base mb-6"
            onClick={handleContinue}
          >
            Continue
          </Button>
        </Link>

        <hr className="border-t border-gray-700 w-[60%] mx-auto mb-4" />

        <p className="text-sm text-gray-700">
          Don’t have an account?{" "}
          <Link href="/signup" className="font-medium hover:underline">
            Create an Account
          </Link>
        </p>
      </div>

      {/* POPUP */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-6">
          <div className="bg-white rounded-xl p-10 max-w-lg w-full text-center shadow-xl">
            <h2 className="text-xl font-semibold mb-4">
              Kindly Reset your <span className="text-[#FFA300]">Password</span>
            </h2>
            <p className="text-gray-700 text-sm mb-6">
              We sent a password reset link to{" "}
              <strong>o***o@{email.split("@")[1]}</strong>. Email messages may
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
              Back To Dashboard
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPasswordForm;
