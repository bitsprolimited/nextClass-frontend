"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "./ui/navigation-menu";
import { Separator } from "./ui/separator";
import { links } from "./ProfileMenu";
import Image from "next/image";
import { authClient, BetterAuthSession } from "@/lib/auth-client";

interface MobileNavProps {
  session: BetterAuthSession | null | undefined;
  currentNavItems: { label: string; href: string }[];
}

export function MobileNav({ session, currentNavItems }: MobileNavProps) {
  const user = session?.user;
  const router = useRouter();
  const pathname = usePathname();
  const currentLinks =
    user && user.role === "parent" ? links.parent : links.tutor;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="link" className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent
        side={"top"}
        className="bg-primary gap-4 flex flex-col px-0"
      >
        <SheetHeader className="px-4">
          <SheetTitle>
            <Image
              src="/images/logo-white.png"
              alt="Next class Logo"
              width={100}
              height={24}
              className="h-full w-[100px] object-cover"
            />
          </SheetTitle>
          <SheetDescription className="sr-only">
            navigation menu
          </SheetDescription>
        </SheetHeader>
        {user && (
          <SheetClose asChild>
            <Link href={currentLinks[0].href} passHref className="w-full">
              <span
                className={`text-primary bg-secondary w-full group inline-flex h-9 items-center text-sm font-semibold focus:text-secondary disabled:pointer-events-none disabled:opacity-50 transition-all px-4 ${
                  pathname === currentLinks[0].href
                    ? "text-secondary font-bold"
                    : ""
                }`}
              >
                {currentLinks[0].name}
              </span>
            </Link>
          </SheetClose>
        )}
        <NavigationMenu>
          <NavigationMenuList className="gap-5 flex flex-col items-start w-full">
            {currentNavItems.map((item) => (
              <NavigationMenuItem key={item.href}>
                <SheetClose asChild>
                  <Link href={item.href} passHref>
                    <span
                      className={`text-white hover:text-secondary group inline-flex h-9 items-center justify-center text-sm font-medium focus:text-secondary disabled:pointer-events-none disabled:opacity-50 transition-all  px-4 ${
                        pathname === item.href ? "text-secondary font-bold" : ""
                      }`}
                    >
                      {item.label}
                    </span>
                  </Link>
                </SheetClose>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        {user && (
          <>
            <Separator />
            <NavigationMenu>
              <NavigationMenuList className="gap-5 flex flex-col items-start w-full">
                {currentLinks.slice(1).map((item) => (
                  <NavigationMenuItem key={item.href}>
                    <SheetClose asChild>
                    <Link href={item.href} passHref>
                      <span
                        className={`text-white hover:text-secondary group inline-flex h-9 items-center justify-center text-sm font-medium focus:text-secondary disabled:pointer-events-none disabled:opacity-50 transition-all px-4 ${
                          pathname === item.href
                            ? "text-secondary font-bold"
                            : ""
                        }`}
                      >
                        {item.name}
                      </span>
                    </Link>
                    </SheetClose>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </>
        )}
        {!session ? (
          <div className="flex flex-col gap-2.5 w-full">
            <Link href="/sign-up">
              <Button className="cursor-pointer max-w-[340px] w-full bg-white text-primary font-medium h-auto px-10 py-3 rounded-full hover:bg-secondary font-montserrat mx-auto block">
                Create Account
              </Button>
            </Link>
            <Link href="/login">
              <Button className="w-full cursor-pointer max-w-[340px]  font-medium h-auto px-10 py-3 rounded-full hover:bg-[#ffffff44] bg-[#ffffff33] border border-white font-montserrat mx-auto block">
                Login
              </Button>
            </Link>
          </div>
        ) : (
          <Button
            onClick={async () => {
              await authClient.signOut({
                fetchOptions: {
                  onSuccess: () => {
                    router.push("/login");
                  },
                },
              });
            }}
            className="w-full px-4 py-2 flex items-center justify-center bg-white text-center max-w-[300px] text-primary rounded-full hover:bg-secondary hover:text-white cursor-pointer font-medium h-auto mx-auto text-sm"
          >
            Logout
          </Button>
        )}
      </SheetContent>
    </Sheet>
  );
}
