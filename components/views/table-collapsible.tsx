"use client";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

import { TableRows } from "@/components/etc/table-row";

import { useEmiState } from "@/states/emi-states";
import { calculateLoanPayments } from "@/lib/month-interest-calc";
import { cn } from "@/lib/utils";

interface TableCollapsibleProps {
  currentDuration: number;
}

const TableCollapsible = ({ currentDuration }: TableCollapsibleProps) => {
  const [open, setOpen] = useState(false);
  const [principle, interest, duration] = useEmiState((state) => [
    state.principle,
    state.interest,
    state.duration,
  ]);
  const [dataRows, setDataRows] = useState<string[][]>([[]]);

  const [range, setRange] = useState([1, 12]);

  useEffect(() => {
    const currentMonth = new Date().getMonth() + 1;
    const monthlyDuration = Math.round(duration * 12);
    const currentMonthlyDuration = currentDuration * 12 - 12;

    if (currentDuration === 1) {
      if (monthlyDuration < currentMonth) {
        setRange([currentMonth, currentMonth + monthlyDuration]);
      } else {
        setRange([currentMonth, 12]);
      }
    } else {
      if (monthlyDuration - currentMonthlyDuration + currentMonth - 1 < 13) {
        setRange([
          1,
          monthlyDuration - currentMonthlyDuration + currentMonth - 1,
        ]);
      } else {
        setRange([1, 12]);
      }
    }
  }, [duration, currentDuration]);

  useEffect(() => {
    const currentMonthlyDuration =
      currentDuration === 1 ? 0 : currentDuration * 12 - 12;

    let rowIndex = [];
    for (let m = range[0]; m <= range[1]; m++) {
      let currentMonth = currentMonthlyDuration + m - new Date().getMonth();
      // console.log(currentMonth);

      const result = calculateLoanPayments(
        principle,
        interest,
        duration,
        currentMonth
      );
      rowIndex.push([
        new Date(0, m - 1).toLocaleString("default", {
          month: "short",
        }),
        `₹ ${result.monthlyPrincipalPayment.toLocaleString()}`,
        `₹ ${result.monthlyInterestPayment.toLocaleString()}`,
        `₹ ${Math.round(
          result.monthlyPrincipalPayment + result.monthlyInterestPayment
        ).toLocaleString()}`,
        `₹ ${result.remainingBalance.toLocaleString()}`,
      ]);
    }
    setDataRows(rowIndex);
  }, [principle, interest, duration, currentDuration, range]);

  return (
    <div className="flex flex-col w-full border-b border-slate-300 my-2 px-2 overflow-x-hidden">
      <div
        className="flex items-center justify-between w-full pb-4 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <span className="font-medium text-gray-700">
          {new Date().getFullYear() + currentDuration - 1}
        </span>
        <span
          className={cn(
            "transition-all duration-300",
            open ? "rotate-0" : "-rotate-90"
          )}
        >
          <ChevronDown />
        </span>
      </div>
      {open && dataRows && (
        <div className="flex flex-col w-full gap-y-[2px] overflow-x-scroll sm:overflow-hidden">
          <TableRows rows={dataRows} />
        </div>
      )}
    </div>
  );
};

export default TableCollapsible;
