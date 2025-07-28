import { User } from "@/types";
import {
  Bell,
  ChevronDown,
  Layers,
  LogOut,
  NotepadText,
  PieChart,
  Settings,
  ThumbsUp,
  UserCircle2,
  UserPen,
} from "lucide-react";
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
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const links = {
  parent: [
    {
      name: "Become a Teacher",
      href: "#",
      icon: UserPen,
    },
    {
      name: "Transactions",
      href: "/dashboard/parent/transaction",
      icon: Layers,
    },
    {
      name: "Lesson Notes",
      href: "/dashboard/parent/lesson",
      icon: NotepadText,
    },
    {
      name: "View Profile",
      href: "/dashboard/parent/profile",
      icon: UserCircle2,
    },
    {
      name: "Account Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ],
  tutor: [
    {
      name: "Get a Parent Profile",
      href: "#",
      icon: UserPen,
    },
    {
      name: "Earnings",
      href: "/dashboard/parent/transactions",
      icon: Layers,
    },
    {
      name: "Statistics",
      href: "/dashboard/parent/lesson",
      icon: PieChart,
    },
    {
      name: "Reviews",
      href: "/dashboard/parent/lesson",
      icon: ThumbsUp,
    },
    {
      name: "View Profile",
      href: "/dashboard/parent/profile",
      icon: UserCircle2,
    },
    {
      name: "Account Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ],
};

function ProfileMenu({ user }: { user: User }) {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const currentLinks = user.role === "parent" ? links.parent : links.tutor;

  return (
    <div className="flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 gap-x-4">
      <Button
        type="button"
        variant="outline"
        className="relative border border-primary size-8 rounded-full flex  items-center justify-center bg-[#031D95]/10 hover:bg-transparent p-1 text-primary hover:text-primary focus:outline-hidden shrink-0 transition-all duration-200"
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
          <DropdownMenuTrigger className="relative flex items-center rounded-full  focus:outline-hidden focus:ring-2 group focus:ring-white focus:ring-offset-2 text-xs sm:text-sm md:text-base">
            <span className="absolute -inset-1.5" />
            <span className="sr-only">Open user menu</span>
            <Avatar className="h-8 w-8">
              <AvatarImage src={user?.profilePicture} />
              <AvatarFallback className="uppercase border border-primary bg-white">
                {user.fullName[0]}
              </AvatarFallback>
            </Avatar>
            <p className=" text-primary font-medium ml-2 capitalize">
              {user?.fullName}
            </p>
            <ChevronDown
              className="h-4 w-4 ml-2 text-primary group-data-[state=open]:rotate-180 transition-all"
              aria-hidden="true"
            />
          </DropdownMenuTrigger>
        </div>
        <DropdownMenuContent className="z-999 mt-2 p-0 origin-top-right w-full rounded-md bg-white shadow-lg  focus:outline-hidden">
          {currentLinks.map((link, i) => (
            <DropdownMenuItem
              key={i}
              className={cn(
                "focus:bg-[#D9D9D9] font-medium transition-all duration-300",
                {
                  "hover:focus:bg-primary hover:focus:text-secondary": i === 0,
                }
              )}
              asChild
              onSelect={(e) => {
                e.preventDefault();
                setIsProfileMenuOpen(false);
              }}
            >
              <Link
                href={link.href}
                className={cn(
                  "block px-4 py-2 text-gray-700 transition-all duration-300",
                  {
                    "bg-secondary text-primary": i === 0,
                  }
                )}
              >
                {link.icon && <link.icon className="mr-2 h-4 w-4" />}{" "}
                {link.name}
              </Link>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator className="bg-[#9A98C1] m-0" />
          <DropdownMenuItem
            className="focus:bg-[#D9D9D9]"
            asChild
            onSelect={(e) => {
              e.preventDefault();
              setIsProfileMenuOpen(false);
            }}
          >
            <a
              className="w-full px-4 py-2 flex items-center gap-2"
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
