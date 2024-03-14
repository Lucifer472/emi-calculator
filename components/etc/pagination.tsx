"use client";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

interface PaginationProps {
  isNext: boolean;
  isBack: boolean;
  page: number;
}

export const Pagination = ({ isNext, isBack, page }: PaginationProps) => {
  const router = useRouter();

  return (
    <div className="w-full max-w-[340px] mx-auto my-4 border-t border-b border-slate-100 py-2">
      <div className="flex items-center justify-center w-full gap-x-2">
        <Button
          disabled={!isBack}
          size={"sm"}
          onClick={() => router.push("?page=" + (page - 1))}
        >
          <ArrowLeft className="w-4 h-4 xs:w-6 xs:h-6" />
        </Button>
        <Button
          variant={"link"}
          size={"sm"}
          className="text-base xs:text-lg sm:text-xl"
          onClick={() => router.push("?page=" + page)}
        >
          {page}
        </Button>
        <Button
          disabled={isNext}
          size={"sm"}
          onClick={() => router.push("?page=" + (page + 1))}
        >
          <ArrowRight className="w-4 h-4 xs:w-6 xs:h-6" />
        </Button>
      </div>
    </div>
  );
};
