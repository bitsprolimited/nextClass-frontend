"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Bell, Mail, Search } from "lucide-react";
import Image from "next/image";

export default function Topbar({ title = "Dashboard" }: { title?: string }) {
  return (
    <header className="flex items-center justify-between bg-white border-b px-6 py-3 shadow-sm w-full">
      {/* Title */}
      <h1 className="text-3xl font-aero-trial font-medium text-[#2c241b]">
        {title}
      </h1>

      {/* Right side */}
      <div className="flex items-center gap-10 ml-auto">
        {/* Search bar */}
        <div className="flex items-center bg-[#F5F4F8] rounded-lg px-2 py-1 max-w-lg">
          <Input
            type="text"
            placeholder="Enter keywords"
            className="bg-transparent border-none focus:ring-0 px-2 text-sm w-[110px] sm:w-auto"
          />
          <Button
            size="sm"
            className="ml-2 rounded-full px-4 bg-secondary hover:bg-[#e6a700] text-white text-xs font-semibold flex items-center gap-1"
          >
            <Search size={16} />
            Search
          </Button>
        </div>
        {/* Notifications */}
        <button className="relative">
          <Bell size={22} className="text-gray-600" />
          <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        {/* Messages */}
        <button>
          <Mail size={22} className="text-gray-600" />
        </button>
        {/* Divider */}
        <div className="h-8 w-px bg-gray-200 mx-2" />
        {/* User Profile */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-[#FFB800]">
            <Image
              src="/avatar.png"
              alt="User"
              width={36}
              height={36}
              className="object-cover"
            />
          </div>
          <span className="text-sm font-medium text-[#2c241b]">John Doe</span>
        </div>
      </div>
    </header>
  );
}
