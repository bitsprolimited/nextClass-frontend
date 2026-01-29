import React from "react";
import { useForm, useFieldArray, Control } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { PlusCircle, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useAvailabilityStore } from "@/store/useAvailabilityStore";
import { selectTimesSchema, SelectTimesFormData } from "@/lib/schema";
import { days, times } from "@/lib/constants";
import { TimezoneSelect } from "../timezone-select";

interface SelectTimesFormProps {
  onNext: () => void;
  onPrevious: () => void;
}

function SelectTimesForm({ onNext }: SelectTimesFormProps) {
  const { formData, updateAvailabilities, updateTimezone } = useAvailabilityStore();

  // Filter only available days
  const availableDays = formData.availabilities.filter(
    (day) => day.isAvailable
  );

  const userSystemTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const form = useForm<SelectTimesFormData>({
    resolver: zodResolver(selectTimesSchema),
    defaultValues: {
      timezone: formData.timezone || userSystemTimezone || "Africa/Lagos",
      availabilities: availableDays.map((day) => ({
        ...day,
      })),
    },
  });

  const { fields } = useFieldArray({
    control: form.control,
    name: "availabilities",
  });

  const onSubmit = (data: SelectTimesFormData) => {
    // Update the full availabilities array, preserving non-available days
    const updatedAvailabilities = formData.availabilities.map((originalDay) => {
      const updatedDay = data.availabilities.find(
        (day) => day.dayOfWeek === originalDay.dayOfWeek
      );

      if (updatedDay) {
        return {
          ...updatedDay,
          // Filter out empty slots
          slots: updatedDay.slots.filter(
            (slot) => slot.startTime && slot.endTime
          ),
        };
      }

      return originalDay;
    });

    updateTimezone(data.timezone);
    updateAvailabilities(updatedAvailabilities);
    onNext();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-8 px-5 py-6 bg-[#f5f5f5] rounded-xl"
      >
        <div className="flex w-full justify-between">
          <div className="flex flex-col items-start gap-1">
            <p className="font-semibold text-primary text-xl font-montserrat">
              Select Available Times
            </p>
            <div className="flex items-start gap-1.5">
              <Separator className="bg-secondary w-5 h-1 rounded-full" />
              <Separator className="bg-secondary w-[7px] h-1 rounded-full" />
              <Separator className="bg-secondary w-[11px] h-1 rounded-full" />
            </div>
          </div>
          <FormField
            control={form.control}
            name="timezone"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="font-semibold text-primary">
                  Timezone
                </FormLabel>
                <FormControl>
                  <TimezoneSelect
                    value={field.value}
                    onValueChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <p className="text-[#242424] text-sm">
          Select the times you will be available on each day.
        </p>

        {fields.map((field, dayIndex) => {
          const dayName = days[field.dayOfWeek];

          return (
            <DayTimeSlots
              key={field.id}
              dayName={dayName}
              dayIndex={dayIndex}
              control={form.control}
            />
          );
        })}

        <div className="flex gap-4 justify-between">
          {/* <Button type="button" variant="outline" onClick={onPrevious}>
            Previous
          </Button> */}
          <Button
            className="max-w-[300px] w-full h-[50px] bg-[#ffa300] rounded-full hover:bg-[#e89400] mx-auto"
            type="submit"
          >
            Proceed
          </Button>
        </div>
      </form>
    </Form>
  );
}

function DayTimeSlots({
  dayName,
  dayIndex,
  control,
}: {
  dayName: string;
  dayIndex: number;
  control: Control<SelectTimesFormData>;
}) {
  const {
    fields: slotFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: `availabilities.${dayIndex}.slots`,
  });

  return (
    <div className="py-4 p-6 border border-[#0A4D3C33] bg-white rounded-xl">
      <div className="flex justify-between items-center">
        <p className="text-primary font-semibold">{dayName}</p>
        <Button
          type="button"
          variant="ghost"
          className="hover:bg-transparent"
          size="sm"
          onClick={() => append({ startTime: "", endTime: "" })}
        >
          <PlusCircle className="size-4" />
          Add Slot
        </Button>
      </div>

      <div className="flex flex-col gap-4 mt-5">
        {slotFields.map((slotField, slotIndex) => (
          <div key={slotField.id} className="flex items-center gap-x-3">
            <FormField
              control={control}
              name={`availabilities.${dayIndex}.slots.${slotIndex}.startTime`}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="From Time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {times.map((time) => (
                            <SelectItem
                              value={time.time}
                              key={`from-${time.id}`}
                            >
                              {time.time}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <span>-</span>

            <FormField
              control={control}
              name={`availabilities.${dayIndex}.slots.${slotIndex}.endTime`}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="To Time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {times.map((time) => (
                            <SelectItem value={time.time} key={`to-${time.id}`}>
                              {time.time}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {slotFields.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                className="hover:bg-transparent"
                size="icon"
                onClick={() => remove(slotIndex)}
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SelectTimesForm;
