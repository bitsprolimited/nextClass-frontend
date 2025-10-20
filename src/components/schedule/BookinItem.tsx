import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BookOpenIcon,
  CalendarIcon,
  ClockIcon,
  Loader2,
  UserIcon,
  UsersIcon,
} from "lucide-react";
import {
  acceptBooking,
  Booking,
  BookingStatus,
  EventType,
} from "@/services/booking.service";
import Image from "next/image";
import { bookingUtils } from "@/hooks/useBooking";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format, isAfter, parseISO } from "date-fns";
import { useRouter } from "next/navigation";
import { BetterAuthSession } from "@/lib/auth-client";

type BookingActionProps = {
  booking: Booking;
  isHistory: boolean;
  isTutor: boolean;
  canReschedule: boolean;
  isPending: boolean;
  onAccept: () => void;
  onJoin: () => void;
};

export function BookingItem({
  booking,
  isHistory = false,
  session,
}: {
  booking: Booking;
  isHistory?: boolean;
  session: BetterAuthSession | null | undefined;
}) {
  const startTime = parseISO(booking.startTime);
  const endTime = parseISO(booking.endTime);
  const router = useRouter();
  const queryClient = useQueryClient();

  // Format date and time
  const formattedDate = format(startTime, "E, MMM d");
  const formattedTime = `${format(startTime, "h:mmaaa")} - ${format(
    endTime,
    "h:mmaaa"
  )}`;
  const duration = bookingUtils.formatDuration(booking.duration);

  // Get status color
  const statusColor = bookingUtils.getStatusColor(booking.status);

  // Check if booking is reschedulable
  const canReschedule =
    !isHistory &&
    isAfter(startTime, new Date()) &&
    ![BookingStatus.COMPLETED, BookingStatus.CANCELED].includes(booking.status);

  // Get images
  const tutorImage = booking.teacher?.profilePicture || "/images/tutor-1.png";
  const parentImage = booking.parent?.profilePicture || "/images/tutor-1.png";

  const isTutor = session?.user && session?.user.role === "teacher";

  const { mutate: acceptBookingMutation, isPending } = useMutation({
    mutationKey: ["accept-booking", booking._id],
    mutationFn: acceptBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      toast.success("Booking accepted successfully");
    },
  });

  const handleAcceptBooking = () => {
    acceptBookingMutation(booking._id);
  };

  const handleJoinSession = () => {
    router.push(`/dashboard/meeting/${booking.meetingLink}`);
  };

  // Create title
  const title = booking.subject
    ? `${booking.subject} ${bookingUtils.getEventTypeDisplay(
        booking.eventType
      )} with ${booking.teacher?.fullName || "Teacher"}`
    : `${bookingUtils.getEventTypeDisplay(booking.eventType)} with ${
        booking.teacher?.fullName || "Teacher"
      }`;

  return (
    <div className="grid grid-cols-[auto_1fr] sm:grid-cols-[auto_1fr_auto] gap-4 sm:gap-6 w-full">
      {/* Left: Image */}
      <div className="relative w-16 h-16 sm:w-24 sm:h-24 md:w-36 md:h-36 rounded-[10px] border border-[#ada1a1] overflow-hidden">
        <Image
          src={isTutor ? parentImage : tutorImage}
          alt="User"
          fill
          className="object-cover"
          onError={(e) => {
            e.currentTarget.src = "/images/tutor-default.png";
          }}
        />
        {!isHistory && (
          <div
            className={`absolute top-2 right-2 w-3 h-3 rounded-full bg-${statusColor}-500`}
          />
        )}
      </div>

      {/* Middle: Content */}
      <div className="flex flex-col justify-between gap-2 sm:gap-3">
        <h2 className="text-base sm:text-lg md:text-3xl text-[#2c241b] leading-snug font-aero-trial">
          {title}
        </h2>

        {/* ... (user info, date, time, etc. - no changes here) ... */}
        <div className="flex items-center gap-3 sm:gap-6 flex-wrap text-[#2c241b] text-xs sm:text-sm md:text-2xl font-medium">
          {booking.learners && booking.learners.length > 0 && (
            <span className="flex items-center gap-2">
              <UsersIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              {booking.learners.map((l) => l.name).join(", ")}
            </span>
          )}
          <span className="flex items-center gap-2">
            <UserIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            {booking.teacher?.fullName || "Teacher"}
          </span>
        </div>

        {isHistory ? (
          // ... (History view - no changes) ...
          <div className="flex flex-wrap items-start justify-between gap-4 sm:gap-6 w-full max-w-[656px] text-xs sm:text-sm md:text-base">
            <div className="flex flex-col gap-2 items-start">
              <CalendarIcon className="w-4 h-4 sm:w-5 sm:h-5 text-[#2c241b]" />
              <div className="font-medium text-[#2c241b] leading-tight font-montserrat">
                {formattedDate}
                <br />
                <span className="text-[#2c241b99] text-[11px] sm:text-sm md:text-lg">
                  {formattedTime}
                </span>
              </div>
            </div>
            <div className="hidden sm:block text-[24px] sm:text-[40px] md:text-[64px] leading-none opacity-20 text-[#2c241b]">
              |
            </div>
            <div className="flex flex-col gap-2 items-start">
              <ClockIcon className="w-4 h-4 sm:w-5 sm:h-5 text-[#2c241b]" />
              <div className="font-medium text-[#2c241b] leading-tight font-montserrat whitespace-nowrap text-xs sm:text-sm md:text-lg">
                {duration}
              </div>
            </div>
            <div className="hidden sm:block text-[24px] sm:text-[40px] md:text-[64px] leading-none opacity-20 text-[#2c241b]">
              |
            </div>
            <div className="flex flex-col gap-2 items-start">
              <BookOpenIcon className="w-4 h-4 sm:w-5 sm:h-5 text-[#2c241b]" />
              <div className="font-medium text-[#2c241b] leading-tight font-montserrat whitespace-nowrap text-xs sm:text-sm md:text-lg">
                {booking.subject || "General Session"}
              </div>
            </div>
          </div>
        ) : (
          // ... (Upcoming view - no changes) ...
          <>
            <div className="flex items-center gap-3 sm:gap-6 flex-wrap text-[#2c241b] text-xs sm:text-sm md:text-2xl font-medium">
              <span className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                {formattedDate}
              </span>
              <span className="hidden sm:inline text-[24px] sm:text-[32px] leading-none opacity-20">
                |
              </span>
              <span className="flex items-center gap-2">
                <ClockIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                {formattedTime}
              </span>
            </div>
            <div className="text-[#9e9e9e] text-xs sm:text-sm md:text-lg flex gap-2 sm:gap-4 font-medium">
              <span>Duration: {duration}</span>
              {booking.subject && (
                <>
                  <span className="opacity-40">.</span>
                  <span>{booking.subject}</span>
                </>
              )}
            </div>
          </>
        )}

        {/* Action buttons (CLEANED UP) */}
        <div
          className={`flex justify-end gap-3 sm:gap-6 mt-3 sm:mt-0 ${
            !isHistory ? "sm:self-end" : ""
          }`}
        >
          <BookingActionButtons
            booking={booking}
            isHistory={isHistory}
            isTutor={isTutor ?? false}
            canReschedule={canReschedule}
            isPending={isPending}
            onAccept={handleAcceptBooking}
            onJoin={handleJoinSession}
          />
        </div>
      </div>
    </div>
  );
}

export function BookingActionButtons({
  booking,
  isHistory,
  isTutor,
  canReschedule,
  isPending,
  onAccept,
  onJoin,
}: BookingActionProps) {
  const actionButtonClasses =
    "px-5 sm:px-8 h-[36px] sm:h-[45px] rounded-full bg-secondary text-white font-semibold text-xs sm:text-sm";

  if (isHistory) {
    if (booking.eventType === EventType.CLASS) {
      return (
        <Button className="px-5 sm:px-8 md:px-10 py-0 h-[36px] sm:h-[45px] bg-secondary rounded-full">
          <span className="text-white text-xs sm:text-sm md:text-base font-medium leading-[36px] sm:leading-[45px] whitespace-nowrap">
            View Lesson Notes
          </span>
        </Button>
      );
    }
    return (
      <Badge className="bg-[#007B0C33] text-[#007B0C] rounded-full px-5 py-3 font-montserrat">
        Completed
      </Badge>
    );
  }

  // --- 2. Upcoming/Active View ---

  // Render Reschedule button if applicable
  const rescheduleButton = canReschedule ? (
    <button className="text-[#e94e4e] text-xs sm:text-sm font-medium px-4 sm:px-8 h-[36px] sm:h-[45px]">
      Reschedule
    </button>
  ) : null;

  // Render the Main Action Button based on status and role
  let mainButton;

  switch (booking.status) {
    case BookingStatus.PENDING:
      if (isTutor) {
        // Teacher sees "Accept"
        mainButton = (
          <Button
            className={actionButtonClasses}
            onClick={onAccept}
            disabled={isPending}
          >
            {isPending ? <Loader2 className="animate-spin" /> : "Accept"}
          </Button>
        );
      } else {
        // Parent sees "Join Session" but it's disabled
        mainButton = (
          <Button
            className={actionButtonClasses}
            disabled={true}
            title="Waiting for teacher to accept booking"
          >
            Join Session
          </Button>
        );
      }
      break;

    case BookingStatus.CONFIRMED:
      // Both parent and teacher see an enabled "Join Session" button
      mainButton = (
        <Button className={actionButtonClasses} onClick={onJoin}>
          Join Session
        </Button>
      );
      break;

    case BookingStatus.CANCELED:
      // Both see a "Canceled" disabled button
      mainButton = (
        <Button className={actionButtonClasses} disabled>
          Canceled
        </Button>
      );
      break;

    default:
      // Fallback for other statuses (e.g., COMPLETED, though it should be in history)
      mainButton = (
        <Button className={actionButtonClasses} disabled>
          {/* Capitalize status for display */}
          {booking.status.charAt(0).toUpperCase() +
            booking.status.slice(1).toLowerCase()}
        </Button>
      );
  }

  // Return the Reschedule button (if any) and the main action button
  return (
    <>
      {rescheduleButton}
      {mainButton}
    </>
  );
}
