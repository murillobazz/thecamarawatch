"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { DateRange, SelectRangeEventHandler } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerProps extends React.HTMLAttributes<HTMLDivElement> {
  sendDateToParent: (range: DateRange | undefined) => void;
}

export function DatePicker({
  className, sendDateToParent
}: DatePickerProps) {

  const [date, setDate] = React.useState<DateRange | undefined>({ from: new Date(2024, 0, 1), to: new Date(2025, 0, 1) })

  const handleDate: SelectRangeEventHandler = (range) => {
    setDate(range);
    sendDateToParent(range);
  }

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "dd/MM/yyyy")} -{" "}
                  {format(date.to, "dd/MM/yyyy")}
                </>
              ) : (
                format(date.from, "dd/MM/yyyy")
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
            defaultMonth={date?.from}
            selected={date}
            onSelect={(range, selectedDay, activeModifiers, e) => handleDate(range, selectedDay, activeModifiers, e)}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
