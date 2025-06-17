"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function NavigationEvents() {
  const pathname = usePathname();

  useEffect(() => {}, [pathname]);

  return <></>;
}
