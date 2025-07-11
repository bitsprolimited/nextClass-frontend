import { User } from "@/types";
import { Bell, ChevronDown, LogOut, UserCircle2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

function ProfileMenu({ user }: { user: User }) {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  return (
    <div className="flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 gap-x-4">
      <Button
        type="button"
        variant="outline"
        className="relative border border-[#7c4dff8a] h-8 w-8 rounded-full flex  items-center justify-center bg-[#7c4dff0f] p-1 text-primary hover:text-primary focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 flex-shrink-0 focus:ring-offset-gray-800"
      >
        <span className="absolute -inset-1.5" />
        <span className="sr-only">View notifications</span>
        <Bell className="h-6 w-6" aria-hidden="true" />
      </Button>

      <DropdownMenu
        open={isProfileMenuOpen}
        onOpenChange={setIsProfileMenuOpen}
      >
        <div>
          <DropdownMenuTrigger className="relative flex items-center rounded-full  focus:outline-none focus:ring-2 group focus:ring-white focus:ring-offset-2 text-xs sm:text-sm md:text-base">
            <span className="absolute -inset-1.5" />
            <span className="sr-only">Open user menu</span>
            <UserCircle2 className="h-6 w-6 md:h-8 md:w-8 rounded-full text-primary" />
            <p className=" text-primary font-medium ml-2 capitalize">
              {user?.fullName}
            </p>
            <ChevronDown
              className="h-4 w-4 ml-2 text-primary group-data-[state=open]:rotate-180 transition-all"
              aria-hidden="true"
            />
          </DropdownMenuTrigger>
        </div>
        <DropdownMenuContent className="z-[999] mt-2 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <DropdownMenuItem
          className="hover:bg-[#D9D9D9]"
            asChild
            onSelect={(e) => {
              e.preventDefault();
              setIsProfileMenuOpen(false);
            }}
          >
            <Link
              href="/dashboard/parent/profile"
              className="block px-4 py-2 text-gray-700 hover:bg-[#D9D9D9]"
            >
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-[#9A98C1]" />
          <DropdownMenuItem
          className="hover:bg-[#D9D9D9]"
            asChild
            onSelect={(e) => {
              e.preventDefault();
              setIsProfileMenuOpen(false);
            }}
          >
            <a
              className="w-full hover:bg-[#D9D9D9] "
              href={"/api/auth/signout"}
            >
              <LogOut className="mr-2 h-4 w-4 text-[#E63E3E]" /> Logout
            </a>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default ProfileMenu;
