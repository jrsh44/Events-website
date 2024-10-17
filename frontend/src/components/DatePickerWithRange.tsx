import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface IDatePickerWithRangeProps {
  dateRange: DateRange;
  setDate: (dateRange: DateRange | undefined) => void;
  className?: string;
}

export const DatePickerWithRange = (props: IDatePickerWithRangeProps) => (
  <div className={cn("grid gap-2", props.className)}>
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id="date"
          variant={"outline"}
          className={cn(
            "w-[300px] justify-start text-left font-normal",
            !props.dateRange && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {props.dateRange?.from ? (
            props.dateRange.to ? (
              <>
                {format(props.dateRange.from, "LLL dd, y")} -{" "}
                {format(props.dateRange.to, "LLL dd, y")}
              </>
            ) : (
              format(props.dateRange.from, "LLL dd, y")
            )
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={props.dateRange?.from}
          selected={props.dateRange}
          onSelect={props.setDate}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  </div>
);
