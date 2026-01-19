import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export default function Account2fa() {
  return (
    <section className="space-y-10 font-montserrat">
      {/* Title */}
      <div>
        <h2 className="text-[32px] sm:text-3xl font-bold text-[#1D1D1F] mb-1 font-['Lexend']">
          Account Settings
        </h2>
        <p className="text-sm text-[#6e6e6e] font-medium border-b border-[#ddd] pb-4">
          Set your 2-FA authentication.
        </p>
      </div>

      {/* 2FA Section */}
      <div className="bg-[#EFF1FC] w-full rounded-xl p-5 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <Switch id="2fa" defaultChecked />
          <div>
            <h3 className="text-base font-semibold text-[#1D1D1F] font-montserrat">
              Two-factor Authentication
            </h3>
            <p className="text-sm text-[#6e6e6e] mt-1">
              When you log in, you will be required to enter a code that will be
              sent to your device.
            </p>
          </div>
        </div>
      </div>

      {/* Deactivate Account Section */}
      <div className="bg-[#FC5757]/8 w-full rounded-xl p-5 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="bg-[#FFE2E2] text-[#EB3D3D] w-10 h-10 flex items-center justify-center rounded-full">
            <Trash2 size={20} />
          </div>
          <div>
            <h3 className="text-base font-semibold text-[#1D1D1F] font-montserrat">
              Deactivate Account
            </h3>
            <p className="text-sm text-[#6e6e6e] mt-1 ">
              When you log in, you will be required to enter a code that will be
              sent to your device.
            </p>
          </div>
        </div>

        <Button className="bg-[#FC5757] text-white text-sm font-semibold rounded-full px-8 py-5 hover:bg-[#e14b4b]">
          Deactivate Account
        </Button>
      </div>
    </section>
  );
}
