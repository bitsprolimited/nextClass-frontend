"use client";

import { useState } from "react";
import PasswordMeter from "@/components/auth/passwordMeter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const PasswordResetForm = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  // const [email, setEmail] = useState("demo@mailinator.com"); // or however you're getting the email

  const handleContinue = () => {
    if (password && confirmPassword && password === confirmPassword) {
      setShowPopup(true);
    } else {
      alert("Passwords must match and not be empty.");
    }
  };

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

          <div className="space-y-4 text-left">
            <Input
              type="password"
              placeholder="Input Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <Button
            className="mt-6 w-full bg-[#FFA300] text-white font-semibold py-3 rounded-full hover:bg-[#e69500] transition duration-300"
            onClick={handleContinue}
          >
            Create New Password
          </Button>
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
              <span className="text-[#FFA300]">Successfully </span>
            </h2>
            <p className="text-gray-700 text-sm mb-6 ">
              You have successfully reset your password. You will be
              automatically redirected to the Login page to input your correct
              details.
            </p>

            <Image
              src="/images/image-164.png"
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

export default PasswordResetForm;
