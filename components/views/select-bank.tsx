"use client";
import Link from "next/link";

import { loanSelectBank } from "@/constant";

import { Button } from "@/components/ui/button";
import SelectLink from "@/components/views/select-link";
import { useLoan2 } from "@/states/loan-states";

const SelectBank = () => {
  const [bank, setBank] = useLoan2((set) => [set.bank, set.setBank]);

  return (
    <div className="w-full flex flex-col border-b pb-2 border-slate-100 px-2">
      <div className="flex items-center justify-center gap-2 flex-wrap pb-4 border-b border-slate-100">
        {loanSelectBank.map((p) => (
          <SelectLink data={p} key={p.label} current={bank} setData={setBank} />
        ))}
      </div>
      <Button asChild>
        <Link href={`/article/loan-${bank}`}>Get Loan info</Link>
      </Button>
    </div>
  );
};

export default SelectBank;
