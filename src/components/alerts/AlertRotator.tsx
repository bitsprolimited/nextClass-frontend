"use client";
import React, { useEffect, useState } from "react";
import Alert from "./Alert";
import type { AlertProps } from "./Alert";

const alerts: AlertProps[] = [
  {
    title: "🛑 Awaiting Verification",
    message:
      "Your account is currently awaiting confirmation. You will not be able to create lesson notes till you are verified.",
    variant: "error",
  },
  {
    title: "✅ Verification Successful.",
    message:
      "Your account is currently awaiting confirmation. You will not be able to create lesson notes till you are verified.",
    variant: "success",
  },
  {
    title: "⚠️ Complete Your Profile",
    message:
      "Your account is currently awaiting confirmation. You will not be able to create lesson notes till you are verified.",
    buttonText: "Complete Your Profile",
    variant: "warning",
  },
  {
    title: "✅ You have successfully completed your Profile.",
    message:
      "Your account is currently awaiting confirmation. You will not be able to create lesson notes till you are verified.",
    variant: "success",
  },
  {
    title: "🕒 Set Your Schedule and Availability",
    message:
      "Your account has been verified. Kindly set your availability to engage parents/students in an introductory call",
    buttonText: "Set Availability",
    variant: "info",
  },
  {
    title:
      "📅 You have been booked for an introductory call on 25, May 2025 by 6PM",
    message:
      "J. P. Morgan has booked you for an introductory call by 6pm. Kindly ensure you are available to meet with them.",
    buttonText: "Book A Session",
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

  return <Alert {...alerts[current]} />;
}
