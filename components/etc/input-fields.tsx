"use client";
import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TextInputFieldProps {
  label: string;
  defaultValues: number;
  setDefaultValues: (v: number) => void;
  symbol: string;
}

export const TextInputField = ({
  label,
  defaultValues,
  setDefaultValues,
  symbol,
}: TextInputFieldProps) => {
  const [value, setValue] = useState(
    defaultValues.toLocaleString() || "10,00,000"
  );

  useEffect(() => {
    const text = defaultValues.toLocaleString();
    setValue(text);
  }, [defaultValues]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow only numbers and a dot in the input
    const sanitizedValue = e.target.value.replace(/[^0-9.]/g, "");

    // Ensure only one dot is present
    const formattedValue = sanitizedValue.replace(/(\..*)\./g, "$1");

    // Update the state with the sanitized and formatted value
    setValue(formattedValue || "0");
  };

  const handleBlur = () => {
    // Handle the blur event when the user finishes input
    if (!isNaN(parseFloat(value.replaceAll(",", "")))) {
      const text = parseFloat(value.replaceAll(",", "")).toLocaleString();
      setValue(text);
      setDefaultValues(parseFloat(value.replaceAll(",", "")));
    }
  };

  return (
    <div className="flex flex-col items-start justify-center gap-y-1 w-full">
      <Label htmlFor={label} className="text-lg">
        {label}
      </Label>
      <div className="flex items-center justify-center gap-0 w-full border border-input rounded hover:border-sky-500">
        <Input
          type="text"
          id={label}
          name={label}
          className="rounded-l rounded-r-none border-0"
          value={value}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <p
          className="text-lg min-w-8 flex items-center justify-center bg-gray-100 h-10 px-3 py-2 cursor-default border-0 rounded-r"
          aria-hidden="true"
        >
          {`${symbol}`}
        </p>
      </div>
    </div>
  );
};

interface SliderInputFieldProps {
  defaultValue: number;
  steps: number;
  min: number;
  max: number;
  marks: any;
  setValue: (v: number) => void;
}

export const SliderInputField = ({
  defaultValue,
  steps,
  min,
  max,
  marks,
  setValue,
}: SliderInputFieldProps) => {
  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
  };
  return (
    <Box sx={{ width: "90%" }}>
      <Slider
        value={defaultValue}
        step={steps}
        marks={marks}
        valueLabelDisplay="auto"
        min={min}
        max={max}
        onChange={handleChange}
      />
    </Box>
  );
};
