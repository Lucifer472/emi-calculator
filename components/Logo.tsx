import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  width?: number;
  height?: number;
}

const Logo = ({ width, height }: LogoProps) => {
  return (
    <Link
      href="/"
      className={cn(
        "relative p-2 bg-white",
        width ? `w-[${width}px]` : "w-[50px]",
        height ? `w-[${height}px]` : "h-[50px]"
      )}
    >
      <Image src="/calc.png" alt="logo" fill className="object-contain" />
    </Link>
  );
};

export default Logo;
