"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { t } from "@/providers/intl";

interface IDatePickerProps {
  date?: Date;
  setDate: (date: Date | undefined) => void;
  minDate?: Date;
  maxDate?: Date;
}

export const DatePicker = (props: IDatePickerProps) => (
  <Popover>
    <PopoverTrigger asChild>
      <Button
        variant={"outline"}
        className={cn(
          "justify-start text-left font-normal",
          !props.date && "text-muted-foreground",
        )}
      >
        <CalendarIcon className="mr-2 h-4 w-4" />
        {props.date ? format(props.date, "PPP") : <span>{t("datepicker.pick")}</span>}
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-auto p-0">
      <Calendar
        mode="single"
        selected={props.date}
        onSelect={props.setDate}
        initialFocus
        disabled={{
          before: props.minDate ?? new Date("2000-01-01"),
          after: props.maxDate ?? new Date("2040-01-01"),
        }}
      />
    </PopoverContent>
  </Popover>
);
