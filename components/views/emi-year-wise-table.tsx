"use client";
import TableCollapsible from "@/components/views/table-collapsible";
import { useEmiState } from "@/states/emi-states";
import { XCircleIcon } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const EmiYearWiseData = ({ isOpen }: { isOpen?: boolean }) => {
  const [open, setOpen] = useState(isOpen ? isOpen : false);

  const [duration] = useEmiState((state) => [state.duration]);
  const currentMonth = new Date().getMonth() + 1;
  const durationNeeded = Math.ceil(duration + currentMonth / 12);

  return (
    <div className="flex items-center justify-center flex-col gap-y-2 mt-4 w-full">
      <span className="text-xs text-gray-600">
        Your Amortization Details (Yearly/Monthly)
      </span>
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "text-gray-700 transition-all duration-300",
          !open ? "rotate-45" : "rotate-0"
        )}
      >
        <XCircleIcon />
      </button>
      {open &&
        [...Array(Math.ceil(durationNeeded)).keys()].map((number) => (
          <TableCollapsible currentDuration={number + 1} key={number} />
        ))}
    </div>
  );
};

export default EmiYearWiseData;
