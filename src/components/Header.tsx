"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList
} from "@/components/ui/navigation-menu";
import { navItems } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";

function Header(): React.JSX.Element {
  const pathname = usePathname();
  return (
    <header
      className={`${
        pathname === "/"
          ? "absolute top-0 w-full shadow bg-white/80 backdrop-blur-md"
          : ""
      } flex items-center justify-between px-4 py-8`}
    >
      <div className="w-full max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Image
            src="/images/logo.png"
            alt="Next class Logo"
            width={100}
            height={24}
          />
        </div>
        <NavigationMenu className="mx-auto">
          <NavigationMenuList className="gap-10 flex items-center">
            {navItems.map((item) => (
              <NavigationMenuItem key={item.href}>
                <Link href={item.href} passHref>
                  <span
                    className={`px-0 hover:text-secondary group inline-flex h-9 w-max items-center justify-center text-sm font-medium focus:text-secondary disabled:pointer-events-none disabled:opacity-50 transition-all ${
                      pathname === item.href ? "text-secondary font-bold" : ""
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <Link href="/login" passHref>
          <Button className="font-medium h-auto px-10 py-3 rounded-full hover:bg-secondary">
            Login
          </Button>
        </Link>
      </div>
    </header>
  );
}

export default Header;
