import { days } from "@/lib/constants";
import { SelectDaysFormData, selectDaysSchema } from "@/lib/schema";
import { useAvailabilityStore } from "@/store/useAvailabilityStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Separator } from "../ui/separator";

const options = [
  { label: "Everyday", value: "everyday" },
  { label: "Weekdays", value: "weekdays" },
  { label: "Weekend", value: "weekend" },
  { label: "Custom", value: "custom" },
];

interface SelectDaysFormProps {
  onNext: () => void;
}

function SelectDaysForm({ onNext }: SelectDaysFormProps) {
  const {
    formData,
    daySelection: selectedDays,
    updateAvailabilities,
    setDaySelection,
  } = useAvailabilityStore();

  const form = useForm<SelectDaysFormData>({
    resolver: zodResolver(selectDaysSchema),
    defaultValues: {
      daySelection: selectedDays || "everyday",
      customDays: formData.availabilities
        .filter((day) => day.isAvailable)
        .map((day) => day.dayOfWeek),
    },
  });

  const daySelection = form.watch("daySelection");

  const getDaysForPreset = (selection: string): number[] => {
    switch (selection) {
      case "everyday":
        return [0, 1, 2, 3, 4, 5, 6];
      case "weekdays":
        return [1, 2, 3, 4, 5];
      case "weekend":
        return [0, 6];
      default:
        return form.getValues("customDays") || [];
    }
  };

  const selectedDaysForDisplay = getDaysForPreset(daySelection);

  const handleDayToggle = (dayIndex: number) => {
    const currentSelectedDays = getDaysForPreset(
      form.getValues("daySelection")
    );

    const newCustomDays = currentSelectedDays.includes(dayIndex)
      ? currentSelectedDays.filter((d) => d !== dayIndex)
      : [...currentSelectedDays, dayIndex];

    form.setValue("customDays", newCustomDays, { shouldValidate: true });
    form.setValue("daySelection", "custom");
  };

  const onSubmit = (data: SelectDaysFormData) => {
    const finalSelectedDays = getDaysForPreset(data.daySelection);

    const updatedAvailabilities = formData.availabilities.map((day) => ({
      ...day,
      isAvailable: finalSelectedDays.includes(day.dayOfWeek),
      slots: finalSelectedDays.includes(day.dayOfWeek)
        ? day.slots.length > 0
          ? day.slots
          : [{ startTime: "", endTime: "" }]
        : [],
    }));

    setDaySelection(data.daySelection);
    updateAvailabilities(updatedAvailabilities);
    onNext();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-8 px-5 py-6 bg-[#f5f5f5] rounded-xl"
      >
        <div className="flex flex-col items-start gap-1">
          <p className="font-semibold text-primary text-xl font-montserrat">
            Select Teaching Days
          </p>
          <div className="flex items-start gap-1.5">
            <Separator className="bg-secondary w-5 h-1 rounded-full" />
            <Separator className="bg-secondary w-[7px] h-1 rounded-full" />
            <Separator className="bg-secondary w-[11px] h-1 rounded-full" />
          </div>
        </div>

        <FormField
          control={form.control}
          name="daySelection"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <RadioGroup
                  onValueChange={(value) => {
                    field.onChange(value);
                    form.setValue("customDays", getDaysForPreset(value));
                  }}
                  value={field.value}
                  className="flex flex-wrap justify-between items-center gap-4"
                >
                  {options.map((opt) => (
                    <div key={opt.value} className="flex items-center gap-2">
                      <RadioGroupItem
                        value={opt.value}
                        id={opt.value}
                        className="size-5 border-2 border-primary"
                      />
                      <Label className="text-gray-900 font-semibold">
                        {opt.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="py-4 p-6 border border-[#0A4D3C33] bg-white rounded-xl">
          <p className="flex items-center gap-2">
            <Calendar className="text-secondary" />
            <span className="text-primary font-semibold">Selected Days</span>
          </p>

          <div className="flex flex-wrap gap-x-3 gap-y-3 mt-5">
            {days.map((dayName, dayIndex) => {
              const isSelected = selectedDaysForDisplay.includes(dayIndex);
              return (
                <Badge
                  key={dayIndex}
                  variant={isSelected ? "default" : "outline"}
                  className={`cursor-pointer transition-colors px-3 py-1 text-sm rounded-full ${
                    isSelected
                      ? "bg-[#DFDDFF] text-primary hover:text-white border-[#031D95]"
                      : "border-[#031D95] text-primary hover:bg-[#eef0ff]"
                  }`}
                  onClick={() => handleDayToggle(dayIndex)}
                >
                  {dayName}
                  {isSelected && <X className="ml-2 size-3" />}
                </Badge>
              );
            })}
            {/* {selectedDaysForDisplay.length === 0 && (
              <p className="text-gray-500 text-sm">
                No days selected. Click to add days.
              </p>
            )} */}
          </div>
        </div>

        <div className="flex items-center justify-end gap-4">
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

export default SelectDaysForm;
