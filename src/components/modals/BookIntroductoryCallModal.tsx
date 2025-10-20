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
import { useCreateBooking } from "@/hooks/useBooking";
import { getAvailableSlots } from "@/services/tutors.service";
import { Teacher } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { addMinutes, format, parse } from "date-fns";
import { AlertCircle, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import CalendarWithSlots from "../CalenderWithSlots";
import { Alert, AlertTitle } from "../ui/alert";
import { BetterAuthSession } from "@/lib/auth-client";

export default function AlertComponent({
  time,
  onSubmit,
  isPending,
  isAlertOpen,
  onAlertClose,
}: {
  time: string | null;
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
          Book Introduction Call
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            You are about to book an introductory call with <b>{time}</b>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={isPending} onClick={onSubmit}>
            {isPending ? <Loader className="animate-spin" /> : "Yes, Book call"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function BookIntroductoryCallModal({
  tutor,
  duration,
  session,
}: {
  session: BetterAuthSession | null | undefined;
  tutor: Teacher;
  duration: number;
}) {
  const router = useRouter();
  const today = new Date();
  const [date, setDate] = useState<Date>(today);
  const [time, setTime] = useState<string | null>(null);
  const [isMainModalOpen, setIsMainModalOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["schedule", tutor._id, date, duration],
    queryFn: async () =>
      getAvailableSlots(tutor._id, {
        date: format(date, "yyyy-MM-dd"),
        duration,
      }),
    refetchOnWindowFocus: false,
    retry: false,
    enabled: !!session,
  });

  const { mutate: createBooking, isPending } = useCreateBooking();

  const onSubmit = () => {
    if (time && session) {
      const start = parse(time, "HH:mm", date);
      const end = addMinutes(start, duration);
      createBooking(
        {
          teacherId: tutor._id,
          slots: [{ startTime: start, duration }],
          endTime: end.toISOString(),
          eventType: "introduction_call",
          bookingType: "one_time",
        },
        {
          onSuccess: () => {
            setIsMainModalOpen(false);
            setIsAlertOpen(false);
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
            className="bg-primary text-white px-6 rounded-full"
          >
            Book Introduction Call
          </Button>
        </DialogTrigger>

        {/* Only render dialog content if user is authenticated */}
        {session && (
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-primary">
                Book an Introductory Call
              </DialogTitle>
              <DialogDescription>
                View tutor availability to book a call with them
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
                error={error as Error}
                slots={data}
              />
              <p className="text-sm">
                Timezone:{" "}
                <span className="font-semibold">{tutor.timezone}</span>
              </p>
              <Alert className="bg-[#DBE4FC]">
                <AlertCircle className="size-4" />
                <AlertTitle className="text-primary text-xs">
                  Kindly note that introductory calls last for a maximum of{" "}
                  <span className="font-semibold">15mins</span> only. Engage
                  tutors to ensure they are the right fit for your child/ward
                </AlertTitle>
              </Alert>
            </div>

            <DialogFooter className="flex items-center justify-center w-full">
              <AlertComponent
                time={time}
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
