"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

interface CalendarWithSlotsProps {
  date: Date;
  setDate: (date: Date) => void;
  time: string | null;
  setTime: (time: string | null) => void;
  today?: Date;
  isLoading: boolean;
  isError: boolean;
  error?: Error | null;
  slots: { startTime: string; endTime: string }[] | undefined;
}

export default function CalendarWithSlots({
  date,
  setDate,
  time,
  setTime,
  today = new Date(),
  isLoading,
  isError,
  error,
  slots,
}: CalendarWithSlotsProps) {
  return (
    <div className="rounded-md border">
      <div className="flex max-sm:flex-col">
        {/* Calendar */}
        <Calendar
          mode="single"
          selected={date}
          onSelect={(newDate) => {
            if (newDate) {
              setDate(newDate);
              setTime(null);
            }
          }}
          className="p-2 sm:pe-5 w-full max-w-[300px]"
          disabled={[{ before: today }, { dayOfWeek: new Date().getDay() }]}
        />

        {/* Timeslot Section */}
        <div className="relative w-full max-sm:h-48 sm:w-52">
          <div className="absolute inset-0 py-4 max-sm:border-t">
            <ScrollArea className="h-full sm:border-s">
              <div className="space-y-3">
                <div className="flex h-5 shrink-0 items-center px-5">
                  <p className="text-sm font-medium">
                    {format(date, "EEEE, d")}
                  </p>
                </div>

                <div className="grid gap-1.5 px-5 max-sm:grid-cols-2">
                  {/* Loading skeletons */}
                  {isLoading &&
                    Array.from({ length: 6 }).map((_, idx) => (
                      <Skeleton key={idx} className="h-8 w-full rounded-md" />
                    ))}

                  {/* Error state */}
                  {isError && (
                    <p className="text-red-500 text-sm col-span-2">
                      Failed to load slots: {error?.message || "Unknown error"}
                    </p>
                  )}

                  {/* Success state */}
                  {slots && !isLoading && !isError && (
                    <>
                      {slots.length > 0 ? (
                        slots.map(({ startTime }) => (
                          <Button
                            key={startTime}
                            variant={time === startTime ? "default" : "outline"}
                            size="sm"
                            className="w-full"
                            onClick={() => setTime(startTime)}
                          >
                            {startTime}
                          </Button>
                        ))
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
  );
}
