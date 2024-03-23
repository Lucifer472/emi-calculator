import { Poppins } from "next/font/google";
import Image from "next/image";

import { cn } from "@/lib/utils";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

const SelectLink = ({
  data,
  current,
  setData,
}: {
  data: any;
  current: string;
  setData: (v: string) => void;
}) => {
  return (
    <button
      className={cn(
        "w-[80px] h-[80px] xx:w-[120px] xx:h-[120px] xs:w-[150px] xs:h-[150px] sm:w-[180px] sm:h-[180px] bg-gray-100 rounded-md hover:shadow border border-slate-200 flex items-center justify-center flex-col",
        current === data.link && "shadow border border-black"
      )}
      onClick={() => setData(data.link)}
    >
      <figure className="relative w-[40px] h-[40px] xx:w-[60px] xx:h-[60px] xs:w-[90px] xs:h-[90px] sm:w-[120px] sm:h-[120px]">
        <Image
          src={data.img}
          alt={data.label}
          fill
          style={{
            objectFit: "contain",
          }}
        />
      </figure>
      <span
        className={cn("text-xs xx:text-sm xs:text-base", poppins.className)}
      >
        {data.label}
      </span>
    </button>
  );
};

export default SelectLink;
