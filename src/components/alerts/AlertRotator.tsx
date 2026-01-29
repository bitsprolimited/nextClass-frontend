"use client";
import { useModalStore } from "@/store/useModal";
import { Role, User } from "@/types";
import { Calendar, TriangleAlert, UserCheck2, UserPen } from "lucide-react";
import { useEffect, useState } from "react";
import type { AlertProps } from "./Alert";
import AlertComponent from "./Alert";

export const getAlertsForUser = (user: User): AlertProps[] => {
  const alerts: AlertProps[] = [];

  if (user.role === Role.TEACHER && user.isProfileComplete) {
    alerts.push({
      title: "You have successfully completed your Profile.",
      message:
        "Great job! Your profile is now complete and visible to parents.",
      Icon: UserCheck2,
      variant: "success",
    });
  }

  if (user.isProfileComplete && !user.isAdminVerified) {
    alerts.push({
      title: "Awaiting Verification",
      message:
        "Your account is currently awaiting confirmation. You will not be able to create lesson notes till you are verified.",
      Icon: TriangleAlert,
      variant: "error",
    });
  }

  if (user.isAdminVerified && !user.isAvailabilitySet) {
    alerts.push({
      title: "Set Your Schedule and Availability",
      message:
        "Your account has been verified. Kindly set your availability to engage parents/students in an introductory call.",
      Icon: Calendar,
      button: {
        text: "Set Your Schedule and Availability",
        className: "bg-primary hover:bg-secondary",
      },
      variant: "info",
    });
  }

  if (!user.isProfileComplete && user.role === Role.TEACHER) {
    alerts.push({
      title: "Complete Your Profile",
      message:
        "Please complete your profile to start accepting class bookings from parents.",
      Icon: UserPen,
      button: {
        text: "Complete Profile",
        href: "/dashboard/tutor/profile",
        className: "bg-primary hover:bg-secondary",
      },
      variant: "warning",
    });
  }

  if (
    user.isProfileComplete &&
    user.isAvailabilitySet &&
    user.isAdminVerified
  ) {
    alerts.push({
      title: "Profile Verified and Ready!",
      message:
        "Your account is verified and setup complete. You can now create lesson notes and accept sessions.",
      Icon: UserCheck2,
      variant: "success",
    });
  }

  // Example scheduled class
  // if (user.nextIntroCallDate) {
  //   alerts.push({
  //     title: (
  //       <>
  //         You have been booked for an introductory call on{" "}
  //         <span className="font-semibold">
  //           {new Date(user.nextIntroCallDate).toLocaleDateString()}
  //         </span>
  //         .
  //       </>
  //     ),
  //     message: (
  //       <>
  //         <span className="font-secondary font-semibold">Parent Name</span> has
  //         booked you for an introductory call. Kindly ensure you are available.
  //       </>
  //     ),
  //     Icon: CalendarCheck2,
  //     button: {
  //       text: "Accept",
  //       className: "bg-secondary hover:bg-primary",
  //     },
  //     variant: "warning",
  //   });
  // }

  return alerts;
};

interface AlertRotatorProps {
  user: User;
}

export default function AlertRotator({ user }: AlertRotatorProps) {
  const { openModal } = useModalStore();
  const [alerts, setAlerts] = useState<AlertProps[]>([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    setAlerts(getAlertsForUser(user));
  }, [user]);

  useEffect(() => {
    if (alerts.length === 0) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % alerts.length);
    }, 3000); // 7 seconds

    return () => clearInterval(interval);
  }, [alerts]);

  if (alerts.length === 0) return null;

  const currentAlert = alerts[current];

  const handleButtonClick = () => {
    if (currentAlert.title === "Set Your Schedule and Availability") {
      openModal("setAvailability", {});
    }
  };

  console.log(alerts);

  const handleClose = () => {
    // Remove current alert and go to next
    setAlerts((prev) => {
      const newAlerts = [...prev];
      newAlerts.splice(current, 1);
      if (newAlerts.length === 0) return [];
      setCurrent((prevCurrent) => prevCurrent % newAlerts.length);
      return newAlerts;
    });
  };

  return (
    <AlertComponent
      {...currentAlert}
      onButtonClick={handleButtonClick}
      onClose={handleClose}
    />
  );
}
