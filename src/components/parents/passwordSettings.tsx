// components/settings/PasswordSettings.tsx

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PasswordMeter from "../auth/passwordMeter";
// import PasswordStrengthMeter from "@/components/settings/PasswordStrengthMeter"; // Your existing component

export default function PasswordSettings() {
  return (
    <section className="space-y-2 border-b pb-6">
      <div>
        <h2 className="text-[32px] font-semibold text-[#2c241b]">
          Password Settings
        </h2>
        <p className="text-sm text-muted-foreground">Reset your Password</p>
      </div>

      <div className="bg-[#031D95] bg-opacity-[8%] p-6 rounded-xl space-y-4 w-full flex justify-between">
        <div>
          <div className="space-y-2">
            <Label htmlFor="new-password" className="text-sm font-medium">
              New Password
            </Label>
            <Input
              id="new-password"
              type="password"
              placeholder="Enter password"
              className="bg-white"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password" className="text-sm font-medium">
              Confirm Password
            </Label>
            <Input
              id="confirm-password"
              type="password"
              placeholder="Confirm password"
              className="bg-white"
            />
          </div>
        </div>
        <div>
          <PasswordMeter password="example" />{" "}
          {/* Replace with real password state */}
          <Button className="bg-[#FFA300] text-white rounded-full px-8 py-2 mt-4 hover:bg-[#e39500]">
            Update Password
          </Button>
        </div>
      </div>
    </section>
  );
}
