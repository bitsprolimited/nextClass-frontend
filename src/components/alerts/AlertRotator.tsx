"use client";
import {
  Calendar,
  CalendarCheck2,
  TriangleAlert,
  UserCheck2,
  UserPen,
} from "lucide-react";
import { useEffect, useState } from "react";
import type { AlertProps } from "./Alert";
import AlertComponent from "./Alert";

const alerts: AlertProps[] = [
  {
    title: "Awaiting Verification",
    Icon: TriangleAlert,
    message:
      "Your account is currently awaiting confirmation. You will not be able to create lesson notes till you are verified.",
    variant: "error",
  },
  {
    title: "Verification Successful.",
    message:
      "Your account is currently awaiting confirmation. You will not be able to create lesson notes till you are verified.",
    Icon: UserCheck2,
    variant: "success",
  },
  {
    title: "Complete Your Profile",
    message:
      "Your account is currently awaiting confirmation. You will not be able to create lesson notes till you are verified.",
    Icon: UserPen,
    button: {
      text: "Complete Profile",
      href: "/dashboard/tutor/profile",
      className: "bg-primary hover:bg-secondary",
    },
    variant: "warning",
  },
  {
    title: "You have successfully completed your Profile.",
    message:
      "Your account is currently awaiting confirmation. You will not be able to create lesson notes till you are verified.",
    Icon: UserCheck2,
    variant: "success",
  },
  {
    title: "Set Your Schedule and Availability",
    message:
      "Your account has been verified. Kindly set your availability to engage parents/students in an introductory call",
    Icon: Calendar,
    button: {
      text: "Set Your Schedule and Availability",
      href: "/dashboard/tutor/schedule",
      className: "bg-primary hover:bg-secondary",
    },
    variant: "info",
  },
  {
    title: (
      <>
        You have been booked for an introductory call on
        <span className="font-semibold"> 25, May 2025</span> by{" "}
        <span className="font-semibold">6pm</span>.
      </>
    ),
    message: (
      <>
        <span className="font-secondary font-semibold">J. P. Morgan</span> has
        booked you for an introductory call by 6pm. Kindly ensure you are
        available to meet with them.
      </>
    ),
    Icon: CalendarCheck2,
    button: {
      text: "Accept",
      className: "bg-secondary hover:bg-primary",
    },
    variant: "warning",
  },
];

export default function AlertRotator() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % alerts.length);
    }, 10000); // 10 seconds

    return () => clearInterval(interval);
  }, []);

  return <AlertComponent {...alerts[current]} />;
}
