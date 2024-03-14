import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

const PageTitle = ({ title }: { title: string }) => {
  return (
    <h2
      className={cn(
        "w-full text-center text-lg xs:text-xl md:text-2xl border-b border-dashed border-black pb-2 mb-6",
        poppins.className
      )}
    >
      {title}
    </h2>
  );
};

export default PageTitle;
