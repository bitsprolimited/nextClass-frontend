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
    <div className="flex items-center justify-center  my-5 relative">
      {/* Main Form */}
      <div className="bg-[#f7f5fa] py-10 px-4 md:px-20 w-full max-w-2xl relative flex justify-center">
        <div className="w-full max-w-md text-center ">
          <h2 className="text-2xl font-semibold mb-2">
            Input Your Registered <span className="text-[#FFA300]">Email</span>
          </h2>
          <p className="text-gray-600 mb-6 text-sm">
            Enter the email address you registered on NextClass to reset your
            password.
          </p>

          <div className="space-y-4 text-left">
            <Input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="my-6 border-t border-gray-800 w-[60%] mx-auto" />

          <p className="text-gray-600 mb-6 text-sm">
            Enter the email address you registered on NextClass to reset your
            password.
          </p>

          <Link href="/passwordReset">
            <Button
              className="w-full bg-[#FFA300] text-white font-semibold py-3 rounded-full hover:bg-gray-800 transition duration-300"
              onClick={handleContinue}
            >
              Continue
            </Button>
          </Link>
        </div>
      </div>

      {/* Popup Overlay */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 w-full p-10">
          <div className="bg-white rounded-xl p-20 w-full max-w-[90vw] md:max-w-[500px] lg:max-w-[600px] xl:max-w-[700px] max-h-[90vh] overflow-auto text-center shadow-xl relative">
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
              className="bg-[#FFA300] text-white py-6 rounded-full hover:bg-gray-800 w-full"
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
