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
import { Session } from "@/services/session";
import { getAvailableSlots } from "@/services/tutors.service";
import { Teacher } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { addMinutes, format, parse } from "date-fns";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { Calendar } from "../ui/calendar";
import { ScrollArea } from "../ui/scroll-area";
import { Skeleton } from "../ui/skeleton";

export default function AlertComponent({
  selectedSlots,
  selectedDates,
  onSubmit,
  isPending,
  isAlertOpen,
  onAlertClose,
}: {
  selectedSlots: Record<string, string>;
  selectedDates: Date[] | undefined;
  onSubmit: () => void;
  isPending: boolean;
  isAlertOpen: boolean;
  onAlertClose: Dispatch<SetStateAction<boolean>>;
}) {
  const hasSelectedSlots = Object.keys(selectedSlots).length > 0;
  const slotCount = Object.keys(selectedSlots).length;

  return (
    <AlertDialog open={isAlertOpen} onOpenChange={onAlertClose}>
      <AlertDialogTrigger asChild>
        <Button
          type="submit"
          className="bg-secondary rounded-full"
          disabled={!hasSelectedSlots}
        >
          Book Introduction Call{slotCount > 1 ? "s" : ""}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            You are about to book {slotCount} introductory call
            {slotCount > 1 ? "s" : ""}:
            <div className="mt-2 space-y-1">
              {Object.entries(selectedSlots).map(([dateKey, timeString]) => {
                const date = selectedDates?.find(
                  (d) => format(d, "yyyy-MM-dd") === dateKey
                );
                return (
                  <div key={dateKey} className="text-sm font-medium">
                    • {date && format(date, "EEEE, MMM d, yyyy")} at{" "}
                    {timeString}
                  </div>
                );
              })}
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={isPending} onClick={onSubmit}>
            {isPending ? (
              <Loader className="animate-spin" />
            ) : (
              `Yes, Book ${slotCount} call${slotCount > 1 ? "s" : ""}`
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function BookAClassModal({
  tutor,
  duration,
  session,
}: {
  session: Session | null;
  tutor: Teacher;
  duration: number;
}) {
  const router = useRouter();
  const today = new Date();

  // Changed to support multiple date selection
  const [selectedDates, setSelectedDates] = useState<Date[] | undefined>([]);

  // Track which date is currently being viewed for time slots
  const [currentViewDate, setCurrentViewDate] = useState<Date | null>(
    selectedDates?.[0] || null
  );

  // Track selected times for each date
  const [selectedSlots, setSelectedSlots] = useState<Record<string, string>>(
    {}
  );

  const [isMainModalOpen, setIsMainModalOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  // Fetch available slots for the current view date
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["schedule", tutor._id, currentViewDate, duration],
    queryFn: async () => {
      if (!currentViewDate) return [];
      return getAvailableSlots(tutor._id, {
        date: format(currentViewDate, "yyyy-MM-dd"),
        duration,
      });
    },
    refetchOnWindowFocus: false,
    retry: false,
    enabled: !!session && !!currentViewDate,
  });

  const { mutate: createBooking, isPending } = useCreateBooking();

  const onSubmit = () => {
    if (session && selectedDates && Object.keys(selectedSlots).length > 0) {
      // Create slots array for all selected dates and times
      const slots = selectedDates
        .filter((date) => {
          const dateKey = format(date, "yyyy-MM-dd");
          return selectedSlots[dateKey]; // Only include dates with selected times
        })
        .map((date) => {
          const dateKey = format(date, "yyyy-MM-dd");
          const timeString = selectedSlots[dateKey];
          const start = parse(timeString, "HH:mm", date);
          return {
            startTime: start,
            duration,
          };
        });

      if (slots.length === 0) return;

      // Use the latest end time for the booking end time
      const endTimes = slots.map((slot) =>
        addMinutes(slot.startTime, duration)
      );
      const latestEndTime = new Date(
        Math.max(...endTimes.map((date) => date.getTime()))
      );

      console.log({
        teacherId: tutor._id,
        endTime: latestEndTime.toISOString(),
        eventType: "introduction_call",
        slots: slots,
        bookingType: "one_time",
      });
      

      createBooking(
        {
          teacherId: tutor._id,
          endTime: latestEndTime.toISOString(),
          eventType: "introduction_call",
          slots: slots,
          bookingType: "one_time",
        },
        {
          onSuccess: () => {
            setIsMainModalOpen(false);
            setIsAlertOpen(false);
            setSelectedSlots({}); // Reset selected slots
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

  // Handle date selection - supports multiple dates
  const handleDateSelect = (dates: Date[] | undefined) => {
    setSelectedDates(dates);
    // Clear selected slots for dates that are no longer selected
    if (dates) {
      const dateKeys = dates.map((date) => format(date, "yyyy-MM-dd"));
      setSelectedSlots((prev) => {
        const filtered = Object.keys(prev).reduce((acc, key) => {
          if (dateKeys.includes(key)) {
            acc[key] = prev[key];
          }
          return acc;
        }, {} as Record<string, string>);
        return filtered;
      });
    } else {
      setSelectedSlots({});
    }

    // Set the first selected date as the current view date
    if (dates && dates.length > 0) {
      setCurrentViewDate(dates[0]);
    } else {
      setCurrentViewDate(null);
    }
  };

  // Handle clicking on a specific selected date to view its time slots
  const handleDateClick = (date: Date) => {
    setCurrentViewDate(date);
  };

  // Handle time slot selection
  const handleTimeSelect = (timeString: string) => {
    if (currentViewDate) {
      const dateKey = format(currentViewDate, "yyyy-MM-dd");
      setSelectedSlots((prev) => ({
        ...prev,
        [dateKey]: timeString,
      }));
    }
  };

  // Get current selected time for the viewed date
  const getCurrentSelectedTime = () => {
    if (currentViewDate) {
      const dateKey = format(currentViewDate, "yyyy-MM-dd");
      return selectedSlots[dateKey] || null;
    }
    return null;
  };

  return (
    <Dialog open={isMainModalOpen} onOpenChange={setIsMainModalOpen}>
      <form>
        <DialogTrigger asChild>
          <Button
            onClick={handleBookingClick}
            className="bg-primary text-white px-6 rounded-full"
          >
            Book a class
          </Button>
        </DialogTrigger>

        {/* Only render dialog content if user is authenticated */}
        {session && (
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="text-primary">Book a Class</DialogTitle>
              <DialogDescription>
                Select multiple dates and view tutor availability to book a
                class with them
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4">
              <div className="rounded-md border">
                <div className="flex max-sm:flex-col">
                  {/* Calendar */}
                  <Calendar
                    mode="multiple"
                    selected={selectedDates}
                    onSelect={handleDateSelect}
                    className="p-2 sm:pe-5 w-full max-w-[300px]"
                    disabled={[{ before: today }]}
                  />

                  {/* Selected Dates Overview */}
                  {selectedDates && selectedDates.length > 0 && (
                    <div className="w-full max-w-[200px] border-r max-sm:border-r-0 max-sm:border-t p-4">
                      <h4 className="text-sm font-medium mb-3">
                        Selected Dates
                      </h4>
                      <ScrollArea className="h-48">
                        <div className="space-y-2">
                          {selectedDates.map((date) => {
                            const dateKey = format(date, "yyyy-MM-dd");
                            const hasTimeSelected = selectedSlots[dateKey];
                            return (
                              <Button
                                key={date.toISOString()}
                                variant={
                                  currentViewDate?.toDateString() ===
                                  date.toDateString()
                                    ? "default"
                                    : "outline"
                                }
                                size="sm"
                                className={`w-full text-xs justify-start h-auto py-2 ${
                                  hasTimeSelected ? "ring-2 ring-green-500" : ""
                                }`}
                                onClick={() => handleDateClick(date)}
                              >
                                <div className="flex flex-col items-start w-full">
                                  <span>{format(date, "MMM d, yyyy")}</span>
                                  {hasTimeSelected && (
                                    <span className="text-xs text-green-600 font-medium">
                                      {hasTimeSelected}
                                    </span>
                                  )}
                                </div>
                              </Button>
                            );
                          })}
                        </div>
                      </ScrollArea>
                    </div>
                  )}

                  {/* Timeslot Section */}
                  <div className="relative w-full max-sm:h-48 sm:w-40">
                    <div className="absolute inset-0 py-4 max-sm:border-t">
                      <ScrollArea className="h-full sm:border-s">
                        <div className="space-y-3">
                          <div className="flex h-5 shrink-0 items-center px-5">
                            <p className="text-sm font-medium">
                              {currentViewDate
                                ? format(currentViewDate, "EEEE, d")
                                : "Select a date"}
                            </p>
                          </div>

                          <div className="grid gap-1.5 px-5 max-sm:grid-cols-2">
                            {/* Show message if no date is selected */}
                            {!currentViewDate && (
                              <p className="text-gray-500 text-sm col-span-2">
                                Please select a date to view available slots.
                              </p>
                            )}

                            {/* Loading skeletons */}
                            {currentViewDate &&
                              isLoading &&
                              Array.from({ length: 6 }).map((_, idx) => (
                                <Skeleton
                                  key={idx}
                                  className="h-8 w-full rounded-md"
                                />
                              ))}

                            {/* Error state */}
                            {currentViewDate && isError && (
                              <p className="text-red-500 text-sm col-span-2">
                                Failed to load slots:{" "}
                                {(error as Error)?.message || "Unknown error"}
                              </p>
                            )}

                            {/* Success state */}
                            {currentViewDate &&
                              data &&
                              !isLoading &&
                              !isError && (
                                <>
                                  {data.length > 0 ? (
                                    data.map(({ startTime }) => {
                                      const currentTime =
                                        getCurrentSelectedTime();
                                      return (
                                        <Button
                                          key={startTime}
                                          variant={
                                            currentTime === startTime
                                              ? "default"
                                              : "outline"
                                          }
                                          size="sm"
                                          className="w-full"
                                          onClick={() =>
                                            handleTimeSelect(startTime)
                                          }
                                        >
                                          {startTime}
                                        </Button>
                                      );
                                    })
                                  ) : (
                                    <p className="text-gray-500 text-sm col-span-2">
                                      No available slots for this day.
                                    </p>
                                  )}
                                </>
                              )}
                          </div>
                        </div>
                      </ScrollArea>
                    </div>
                  </div>
                </div>
              </div>

              {/* Show selected date and time info */}
              {selectedDates && selectedDates.length > 0 && (
                <div className="text-sm space-y-1">
                  {Object.keys(selectedSlots).length > 0 && (
                    <div className="mt-2">
                      <p className="font-medium mb-1">Selected Days and Time:</p>
                      <div className="text-xs space-y-1 max-h-20 overflow-y-auto">
                        {Object.entries(selectedSlots).map(
                          ([dateKey, timeString]) => {
                            const date = selectedDates.find(
                              (d) => format(d, "yyyy-MM-dd") === dateKey
                            );
                            return (
                              <div
                                key={dateKey}
                                className="p-1 rounded text-primary font-bold"
                              >
                                {date && format(date, "MMM d")} at {timeString}
                              </div>
                            );
                          }
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <p className="text-sm">
                Timezone:{" "}
                <span className="font-semibold">{tutor.timezone}</span>
              </p>
            </div>

            <DialogFooter className="flex items-center justify-center w-full">
              <AlertComponent
                selectedSlots={selectedSlots}
                selectedDates={selectedDates}
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
