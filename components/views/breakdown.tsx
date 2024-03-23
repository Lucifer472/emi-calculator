"use client";

import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

import { useEmiState } from "@/states/emi-states";

const EmiBreakdown = () => {
  const [emi, setEmi] = useState(0);
  const [payableInterest, setPayableInterest] = useState(0);

  const [principle, interest, duration] = useEmiState((state) => [
    state.principle,
    state.interest,
    state.duration,
  ]);

  useEffect(() => {
    const calculateEMI = () => {
      const monthlyInterestRate = interest / 12 / 100;

      // Convert loan duration from years to months
      const totalInstallments = Math.round(duration * 12);

      // Calculate EMI using the formula
      const emi =
        (principle *
          monthlyInterestRate *
          Math.pow(1 + monthlyInterestRate, totalInstallments)) /
        (Math.pow(1 + monthlyInterestRate, totalInstallments) - 1);

      setEmi(Math.round(emi));
      // Calculate total payable interest
      const totalInterest = emi * totalInstallments - principle;
      setPayableInterest(Math.round(totalInterest));
    };

    calculateEMI();
  }, [principle, interest, duration]);

  // Convert the principal and payable interest to percentages
  const principalPercentage = (principle / (principle + payableInterest)) * 100;
  const interestPercentage =
    (payableInterest / (principle + payableInterest)) * 100;

  const data = [
    ["name", "percentage"],
    ["Principle*", Math.round(principalPercentage)],
    ["Interest*", Math.round(interestPercentage)],
  ];

  return (
    <div className="p-2 flex flex-wrap items-center justify-center border rounded-md ">
      <div className="w-[50%] py-4 flex flex-col items-center justify-center gap-y-2">
        <h2 className="text-xs text-muted-foreground text-center">Loan EMI</h2>
        <span className="text-lg font-medium">₹ {emi.toLocaleString()}</span>
      </div>
      <div className="w-[50%] py-8 flex flex-col items-center justify-center gap-y-2 border-l border-slate-300 border-dashed">
        <h2 className="text-xs text-muted-foreground text-center">
          Total Interest Payable
        </h2>
        <span className="text-lg font-medium">
          ₹ {payableInterest.toLocaleString()}
        </span>
      </div>
      <div className="w-full border-t border-dashed border-slate-300 py-4 flex flex-col items-center justify-center gap-y-2">
        <h2 className="text-xs text-muted-foreground text-center">
          Total Payment <br /> (Principal + Interest)
        </h2>
        <span className="text-lg font-medium">
          ₹ {(principle + payableInterest).toLocaleString()}
        </span>
        <Chart
          chartType="PieChart"
          data={data}
          options={{
            backgroundColor: "transparent",
            legend: "none",
          }}
          width={"220px"}
          height={"220px"}
        />
        <div className="w-full flex items-center justify-center">
          <div className="flex flex-col items-center justify-center gap-0 border border-black rounded-sm">
            <div className="flex items-center justify-center gap-x-1 p-1">
              <span className="w-1 h-1 rounded-full bg-red-500"></span>
              <span className="text-xs">Interest Amount</span>
            </div>
            <div className="flex items-center justify-center gap-x-1 p-1">
              <span className="w-1 h-1 rounded-full bg-blue-500"></span>
              <span className="text-xs">Principal Amount</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmiBreakdown;
