"use client";

import {
  SliderInputField,
  TextInputField,
} from "@/components/etc/input-fields";

import { durationStopPoints, interestStopPoints } from "@/constant";
import { useEmiState } from "@/states/emi-states";

interface EmiCalculatorProps {
  maxPri: number;
  marks: any;
}

const EmiCalculator = ({ maxPri, marks }: EmiCalculatorProps) => {
  const [
    principle,
    setPrinciple,
    interest,
    setInterest,
    duration,
    setDuration,
  ] = useEmiState((state) => [
    state.principle,
    state.setPrinciple,
    state.interest,
    state.setInterest,
    state.duration,
    state.setDuration,
  ]);

  return (
    <div className="flex items-center justify-start flex-col gap-y-6 mb-4">
      <div className="flex flex-col items-center justify-start w-full gap-y-2">
        <TextInputField
          label="Loan Amount"
          symbol={"₹"}
          defaultValues={principle}
          setDefaultValues={setPrinciple}
        />
        <SliderInputField
          defaultValue={principle}
          setValue={setPrinciple}
          marks={marks}
          max={maxPri}
          min={10000}
          steps={10000}
        />
      </div>{" "}
      <div className="flex flex-col items-center justify-start w-full gap-y-2">
        <TextInputField
          label="Interest"
          symbol={`%`}
          defaultValues={interest}
          setDefaultValues={setInterest}
        />
        <SliderInputField
          defaultValue={interest}
          setValue={setInterest}
          marks={interestStopPoints}
          max={25}
          min={1}
          steps={0.25}
        />
      </div>
      <div className="flex flex-col items-center justify-start w-full gap-y-2">
        <TextInputField
          label="Loan Tenure"
          symbol={`Yr`}
          defaultValues={duration}
          setDefaultValues={setDuration}
        />
        <SliderInputField
          defaultValue={duration}
          setValue={setDuration}
          marks={durationStopPoints}
          max={30}
          min={1}
          steps={1}
        />
      </div>
    </div>
  );
};

export default EmiCalculator;
