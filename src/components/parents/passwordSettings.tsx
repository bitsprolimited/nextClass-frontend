"use client";

import PasswordMeter from "@/components/auth/passwordMeter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function PasswordSettings() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Integrate API here
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    console.log("Updating password:", password);
  };

  return (
    <section className="w-full max-w-4xl mx-auto space-y-4">
      {/* Header */}
      <div className="space-y-1">
        <h2 className="text-3xl font-bold text-[#2C241B]">Password Settings</h2>
        <p className="text-gray-500 text-sm">Reset your Password</p>
        <div className="border-t mt-2" />
        <p className="text-sm text-muted-foreground font-medium mt-2">
          Password{" "}
          <span className="text-xs text-gray-400 ml-2">
            Last Update 3 weeks ago
          </span>
        </p>
      </div>

      {/* Form Card */}
      <form
        onSubmit={handleSubmit}
        className="bg-[#031D95]/[0.06] p-6 rounded-xl relative flex flex-col md:flex-row gap-6 items-start"
      >
        {/* Inputs */}
        <div className="flex-1 w-full space-y-4">
          <div>
            <Input
              type="password"
              placeholder="New Password"
              className="bg-[#E2E6F9] h-12 text-sm px-4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <Input
              type="password"
              placeholder="Confirm Password"
              className="bg-[#E2E6F9] h-12 text-sm px-4"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>

        {/* Password Meter */}
        <div className="w-full md:w-[250px] mt-1">
          <PasswordMeter password={password} />
        </div>

        {/* Submit Button */}
        <div className="w-full md:absolute md:bottom-6 md:right-[-100px]">
          <Button
            type="submit"
            className="bg-secondary hover:bg-[#e49500] text-white rounded-full w-full md:w-auto px-10 py-4 text-base"
          >
            Update Password
          </Button>
        </div>
      </form>
    </section>
  );
}
