"use client";
import { useEffect, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Category } from "@/constant";
import { useArticleState } from "@/states/article-states";

export const CategoryBox = ({ category }: { category: string }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useArticleState((state) => [
    state.category,
    state.setCat,
  ]);

  const router = useRouter();

  useEffect(() => {
    setValue(category);
  }, []);

  useEffect(() => {
    router.push("/article/" + value);
  }, [value, router]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? Category.find((c) => c.value === value)?.label
            : "Select Category..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandGroup>
            {Category.map((c) => (
              <CommandItem
                key={c.value}
                value={c.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === c.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {c.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
