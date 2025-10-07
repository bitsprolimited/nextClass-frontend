"use client";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { navItems } from "@/lib/constants";
import { Session } from "@/services/session";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import ProfileMenu from "./ProfileMenu";
import { MobileNav } from "./MobileNav";

function Header({
  session,
}: {
  session?: Session | null | undefined;
}): React.JSX.Element {
  const pathname = usePathname();

  const hideNav =
    pathname === "/login" ||
    pathname === "/sign-up" ||
    pathname === "/sign-up/tutor" ||
    pathname === "/reset-password" ||
    pathname === "/forgot-password" ||
    pathname === "/verify-email";

  const currentNavItems = !session
    ? navItems.root
    : session.user.role === "parent"
    ? navItems.parent
    : session.user.role === "teacher"
    ? navItems.tutor
    : navItems.root;

  return (
    <header
      className={`${
        pathname === "/"
          ? "absolute top-0 w-full shadow-sm bg-white/80 backdrop-blur-md z-50"
          : ""
      } flex items-center justify-between px-4 py-8 w-full`}
    >
      <div className="w-full max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/">
            <Image
              src="/images/Logo.png"

              alt="Next class Logo"
              width={100}
              height={24}
              className="h-full w-full object-cover"
            />
          </Link>
        </div>
        {!hideNav && (
          <>
            <div className="md:flex items-center justify-between w-full hidden">
              <NavigationMenu className="mx-auto">
                <NavigationMenuList className="gap-10 flex items-center">
                  {currentNavItems.map((item) => (
                    <NavigationMenuItem key={item.href}>
                      <Link href={item.href} passHref>
                        <span
                          className={`px-0 hover:text-secondary group inline-flex h-9 w-max items-center justify-center text-sm font-medium focus:text-secondary disabled:pointer-events-none disabled:opacity-50 transition-all ${
                            pathname === item.href
                              ? "text-secondary font-bold"
                              : ""
                          }`}
                        >
                          {item.label}
                        </span>
                      </Link>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>

              {!session ? (
                <Link href="/login">
                  <Button className="cursor-pointer font-medium h-auto px-10 py-3 rounded-full hover:bg-secondary">
                    Login
                  </Button>
                </Link>
              ) : (
                <ProfileMenu user={session.user} />
              )}
            </div>
            <MobileNav currentNavItems={currentNavItems} session={session} />
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
