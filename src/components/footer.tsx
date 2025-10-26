"use client";
import { SOCIAL_ICONS } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="mt-6">
      <footer className="relative bg-[#0027A5] text-white pt-12 pb-6 px-4 md:px-20 overflow-hidden">
        {/* Watermark Logo */}
        <Image
          src="/images/logo-background.png"
          alt="Background Logo"
          width={128}
          height={128}
          className="absolute right-0 bottom-6 rotate-[-10deg] pointer-events-none"
        />

        {/* Main Grid */}
        <div className="grid md:grid-cols-4 gap-6 z-10 it relative">
          {/* Logo & Description */}
          <div className="md:mr-20 self-center">
            <Image
              src="/images/footerLogo.png"
              alt="NextClass Logo"
              height="156"
              width="267"
              className="  mb-4"
            />
            <p className="text-white/80 text-sm leading-relaxed">
              NextClass is your best choice for afterschool and/or
              extracurricular lessons for your children/ward
            </p>
          </div>

          {/* All Tutors */}
          <div className="mt-4 min-w-0">
            <h4 className="text-lg font-semibold mb-4">All Tutors</h4>
            <ul className="space-y-4 text-sm">
              {[
                "KG/Nursery",
                "Primary 1-3",
                "Primary 3-6",
                "JSS 1-3",
                "SSS 1-3",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-white/80 hover:text-orange-500 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="mt-4 min-w-0">
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-4 text-sm">
              <li>
                <Link
                  href="/terms-conditions"
                  className="hover:text-orange-500 transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
              {["Customer Support", "FAQs"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-white/80 hover:text-orange-500 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
              <li>
                <Link
                  href="/privacy-policy"
                  className="hover:text-orange-500 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect with Us */}
          <div className="mt-4 min-w-0">
            <h4 className="text-lg font-semibold mb-4">Connect with us:</h4>
            <div className="flex space-x-4 mb-4">
              {SOCIAL_ICONS.map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="border border-white rounded-full p-2 text-lg hover:text-orange-500 hover:border-orange-500 transition-colors"
                >
                  <Icon />
                </a>
              ))}
            </div>{" "}
            <ul className="space-y-1 text-sm text-white/80">
              <li>
                <a
                  href="mailto:ask@bitspro.com"
                  className="hover:text-orange-500"
                >
                  ask@bitspro.com
                </a>
              </li>
              <li>
                <a href="tel:+1234567890000" className="hover:text-orange-500">
                  +123 456 789 0000
                </a>
              </li>
              <li>
                <span>176 W street name, New York, NY 10014</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Black Bar */}
      </footer>
      <div className="bg-black py-4 px-6 md:px-20 flex flex-col md:flex-row justify-between items-center text-xs text-white/70 gap-2">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="text-yellow-400 font-bold">NEXTCLASS</span> Made with{" "}
          <span className="text-yellow-400">💛</span> by{" "}
          <span className="text-orange-500 font-bold">BITSPRO</span>
        </p>
        <div className="space-x-4">
          <Link
            href="/terms-conditions"
            className="hover:text-orange-500 transition-colors"
          >
            Terms & Conditions
          </Link>
          <Link
            href="/privacy-policy"
            className="hover:text-orange-500 transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            href="/admin/auth/login"
            className="hover:text-orange-500 transition-colors"
          >
            Site Map
          </Link>
          <a href="#" className="hover:text-orange-500 transition-colors">
            Security
          </a>
        </div>
      </div>
    </div>
  );
}
