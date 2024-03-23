"use client";
import Link from "next/link";

import { loanSelectType } from "@/constant";
import { useEmiState } from "@/states/emi-states";
import { useLoan1 } from "@/states/loan-states";

import { Button } from "@/components/ui/button";
import { TextInputField } from "@/components/etc/input-fields";
import SelectLink from "@/components/views/select-link";

const SelectLoanType = () => {
  const [loanType, setLoanType] = useLoan1((state) => [
    state.loanType,
    state.setLoanType,
  ]);

  const [principle, setPrinciple] = useEmiState((state) => [
    state.principle,
    state.setPrinciple,
  ]);

  return (
    <div className="w-full flex flex-col border-b pb-2 border-slate-100 px-2">
      <div className="flex items-center justify-center gap-2 flex-wrap pb-4 border-b border-slate-100">
        {loanSelectType.map((p) => (
          <SelectLink
            data={p}
            key={p.label}
            current={loanType}
            setData={setLoanType}
          />
        ))}
      </div>
      <div className="py-4 flex flex-col items-start justify-start gap-y-2">
        <TextInputField
          label="Loan Amount"
          symbol={"₹"}
          defaultValues={principle}
          setDefaultValues={setPrinciple}
        />
      </div>
      <Button asChild>
        <Link href="/loan/amount">Get Loan info</Link>
      </Button>
    </div>
  );
};

export default SelectLoanType;
