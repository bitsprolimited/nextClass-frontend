"use client";

import { useMemo, useState } from "react";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface TimezoneSelectProps {
  value: string;
  onValueChange: (value: string) => void;
}

export function TimezoneSelect({ value, onValueChange }: TimezoneSelectProps) {
  const [open, setOpen] = useState<boolean>(false);

  const timezones = useMemo(() => Intl.supportedValuesOf("timeZone"), []);

 const formattedTimezones = useMemo(() => {
   return timezones
     .map((timezone) => {
       const formatter = new Intl.DateTimeFormat("en", {
         timeZone: timezone,
         timeZoneName: "shortOffset",
       });
       const parts = formatter.formatToParts(new Date());
       const offset =
         parts.find((part) => part.type === "timeZoneName")?.value || "";
       const modifiedOffset = offset === "GMT" ? "GMT+0" : offset;

       return {
         value: timezone,
         label: `(${modifiedOffset}) ${timezone.replace(/_/g, " ")}`,
         numericOffset: parseInt(
           offset.replace("GMT", "").replace("+", "") || "0"
         ),
       };
     })
     .sort((a, b) => a.numericOffset - b.numericOffset);
 }, [timezones]);

  const selectedLabel = formattedTimezones.find((tz) => tz?.value === value)?.label;

  return (
    <Popover modal={true} open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between font-normal hover:bg-white"
        >
          <span className={cn("truncate", !value && "text-muted-foreground")}>
            {value ? selectedLabel : "Select timezone..."}
          </span>
          <ChevronDownIcon
            size={16}
            className="text-muted-foreground/80 shrink-0"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="border-input w-full min-w-[var(--radix-popper-anchor-width)] p-0 overflow-auto"
        align="start"
      >
        <Command
          filter={(value, search) =>
            value
              .toLowerCase()
              .includes(search.toLowerCase().replace(/\s+/g, ""))
              ? 1
              : 0
          }
        >
          <CommandInput placeholder="Search timezone..." />
          <CommandList>
            <CommandEmpty>No timezone found.</CommandEmpty>
            <CommandGroup>
              {formattedTimezones.map((tz) => (
                <CommandItem
                  key={tz!.value}
                  value={tz!.label} // Search by label
                  onSelect={() => {
                    onValueChange(tz!.value); // Use the prop function
                    setOpen(false);
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === tz!.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {tz!.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}