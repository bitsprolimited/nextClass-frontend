import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRescheduleBooking } from "@/hooks/useBooking";
import { BetterAuthSession } from "@/lib/auth-client";
import { Booking } from "@/services/booking.service";
import { getAvailableSlots } from "@/services/tutors.service";
import { useQuery } from "@tanstack/react-query";
import { format, parse } from "date-fns";
import { AlertCircle, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import CalendarWithSlots from "../CalenderWithSlots";
import { Alert, AlertTitle } from "../ui/alert";
import { AxiosError } from "axios";
import { AxioErrorResponse, Teacher } from "@/types";

export default function AlertComponent({
  tutor,
  time,
  onSubmit,
  isPending,
  isAlertOpen,
  onAlertClose,
}: {
  time: Date | undefined;
  tutor: Teacher;
  onSubmit: () => void;
  isPending: boolean;
  isAlertOpen: boolean;
  onAlertClose: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <AlertDialog open={isAlertOpen} onOpenChange={onAlertClose}>
      <AlertDialogTrigger asChild>
        <Button
          type="submit"
          className="bg-secondary rounded-full"
          disabled={!time}
        >
          Reschedule Call
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            You are about to reschedule Your call with <b>{tutor.fullName}</b>{" "}
            on <b>{time ? format(time, "PPP p") : "—"}</b>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            onClick={(e) => {
              e.preventDefault();
              onSubmit();
            }}
          >
            {isPending ? (
              <Loader className="animate-spin" />
            ) : (
              "Yes, reschedule call"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function RescheduleModal({
  booking,
  session,
}: {
  session: BetterAuthSession | null | undefined;
  booking: Booking;
}) {
  const router = useRouter();
  const today = new Date();
  const [date, setDate] = useState<Date>(new Date(booking.startTime));
  const [time, setTime] = useState<string | null>(null);
  const [isMainModalOpen, setIsMainModalOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const parsedTime = time ? parse(time, "HH:mm", date) : undefined;
  const teacherId =
    typeof booking.teacherId === "string"
      ? booking.teacherId
      : booking.teacherId._id;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["schedule", teacherId, date, booking.duration],
    queryFn: async () =>
      getAvailableSlots(teacherId, {
        date: format(date, "yyyy-MM-dd"),
        duration: booking.duration,
      }),
    refetchOnWindowFocus: false,
    retry: false,
    enabled: !!session && isMainModalOpen,
  });

  const { mutate: reschedule, isPending } = useRescheduleBooking();

  const onSubmit = () => {
    if (time && session) {
      const start = parse(time, "HH:mm", date);
      reschedule(
        {
          startTime: start,
          id: booking._id,
        },
        {
          onSuccess: () => {
            setIsAlertOpen(false);
            setIsMainModalOpen(false);
          },
          onError: () => {
            // Keep alert open on error so user can retry
            // Main modal stays open as well
          },
        }
      );
    }
  };

  const handleBookingClick = () => {
    if (!session) {
      const redirectData = {
        returnTo: window.location.pathname + window.location.search,
      };

      sessionStorage.setItem("postLoginRedirect", JSON.stringify(redirectData));

      router.push("/login");
      return false;
    }
    return true;
  };

  return (
    <Dialog open={isMainModalOpen} onOpenChange={setIsMainModalOpen}>
      <form>
        <DialogTrigger asChild>
          <Button
            onClick={handleBookingClick}
            variant="link"
            className="text-[#e94e4e] bg-transparent text-xs sm:text-sm font-medium px-4 sm:px-8 h-9 sm:h-[45px]"
          >
            Reschedule
          </Button>
        </DialogTrigger>

        {/* Only render dialog content if user is authenticated */}
        {session && (
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-primary">
                Reschedule Call
              </DialogTitle>
              <DialogDescription>
                View tutor availability to reschedule a call
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4">
              <CalendarWithSlots
                date={date}
                setDate={setDate}
                time={time}
                setTime={setTime}
                today={today}
                isLoading={isLoading}
                isError={isError}
                error={error as AxiosError<AxioErrorResponse>}
                slots={data}
              />
              <Alert className="bg-[#DBE4FC]">
                <AlertCircle className="size-4" />
                <AlertTitle className="text-primary text-xs">
                  Kindly note that you Rescheduling is only allowed up to 24
                  hours before class
                </AlertTitle>
              </Alert>
            </div>

            <DialogFooter className="flex items-center justify-center w-full">
              <AlertComponent
                time={parsedTime}
                tutor={booking.teacherId as Teacher}
                onSubmit={onSubmit}
                isPending={isPending}
                isAlertOpen={isAlertOpen}
                onAlertClose={setIsAlertOpen}
              />
            </DialogFooter>
          </DialogContent>
        )}
      </form>
    </Dialog>
  );
}
