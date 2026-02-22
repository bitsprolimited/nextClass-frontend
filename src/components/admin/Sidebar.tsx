"use client";

import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  UserCheck,
  Users,
  BookOpen,
  Briefcase,
  Calendar,
  FileText,
  CreditCard,
  Sliders,
  Settings,
  User,
  Users2,
} from "lucide-react";
import { usePathname } from "next/navigation";

const navSections = [
  {
    title: "",
    links: [
      {
        name: "Dashboard",
        href: "/admin/dashboard/dashboard",
        icon: LayoutDashboard,
        active: true, // Set this dynamically based on route
        highlight: true,
      },
      {
        name: "Verification",
        href: "/admin/dashboard/verification",
        icon: UserCheck,
      },
    ],
  },
  {
    title: "Users Management",
    links: [
      { name: "Parents", href: "/admin/dashboard/parents", icon: Users2 },
      { name: "Learners", href: "/admin/dashboard/learners", icon: BookOpen },
      { name: "Tutors", href: "/admin/dashboard/tutors", icon: Briefcase },
      { name: "Sessions", href: "/admin/dashboard/sessions", icon: Calendar },
    ],
  },
  {
    title: "Application",
    links: [
      { name: "Reports", href: "/reports", icon: FileText },
      { name: "Transactions", href: "/admin/dashboard/transactions", icon: CreditCard },
    ],
  },
  {
    title: "Admin Settings",
    links: [
      { name: "Plans", href: "/plans", icon: Sliders },
      { name: "Platform", href: "/platform", icon: Settings },
      { name: "Profile", href: "/profile", icon: User },
      { name: "Teams", href: "/teams", icon: Users },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-primary text-white flex flex-col p-4 font-sans">
      {/* Logo */}
      <div className="flex items-center  mb-8 px-2">
        <Image
          src="/images/logo-white.png"
          alt="NextClass"
          width={116}
          height={60}
        />
      </div>
      {/* Navigation */}
      <nav className="flex flex-col gap-2">
        {navSections.map((section, idx) => (
          <div key={section.title + idx}>
            {section.title && (
              <div className="uppercase text-xs text-white/60 px-2 mb-2 mt-2 tracking-widest">
                {section.title}
              </div>
            )}
            <ul className="flex flex-col gap-1">
              {section.links.map(({ name, href, icon: Icon }) => {
                const isActive = pathname === href;
                return (
                  <li key={name}>
                    <Link
                      href={href}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors
                        ${
                          isActive
                            ? "bg-[#FFB800]/10 text-[#FFB800] font-semibold"
                            : "hover:bg-white/10 text-white"
                        }
                      `}
                    >
                      <Icon
                        size={18}
                        className={isActive ? "text-secondary" : "text-white"}
                      />
                      <span className="text-lg">{name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
            {/* Divider except after last section */}
            {idx < navSections.length - 1 && (
              <hr className="my-3 border-white/20" />
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}
