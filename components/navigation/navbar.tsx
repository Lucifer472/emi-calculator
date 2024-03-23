"use client";
import { useState } from "react";
import Link from "next/link";
import { MenuIcon, XIcon } from "lucide-react";

import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";

import { navLinks } from "@/constant";

const Navbar = () => {
  const [nav, setNav] = useState(true);

  return (
    <nav className="w-full min-h-16 bg-[#0072aa] bg-[url('/textured_stripes_brand_primary.png')] mb-4 shadow">
      <div className="w-full min-h-16 max-w-6xl mx-auto px-4 sm:px-2 flex items-center justify-between">
        <Logo />
        <ul className="hidden items-center justify-self-center gap-x-4 sm:flex">
          {navLinks.map((l) => (
            <li key={l.link}>
              <Button variant={"link"} asChild>
                <Link className="text-white text-[1rem]" href={l.link}>
                  {l.label}
                </Link>
              </Button>
            </li>
          ))}
        </ul>
        <Button variant={"outline"} className="hidden sm:block" asChild>
          <Link href={"/loan"}>Get Loan</Link>
        </Button>
        <button
          onClick={() => setNav(!nav)}
          className="flex sm:hidden items-center justify-center cursor-pointer"
        >
          {nav ? (
            <MenuIcon className="text-white" />
          ) : (
            <XIcon className="text-white" />
          )}
        </button>
      </div>
      {!nav && (
        <ul className="flex flex-col items-start justify-start gap-y-2">
          {navLinks.map((l) => (
            <li key={l.link}>
              <Button variant={"link"} onClick={() => setNav(true)} asChild>
                <Link className="text-white text-[1rem]" href={l.link}>
                  {l.label}
                </Link>
              </Button>
            </li>
          ))}
          <li>
            <Button variant={"link"} onClick={() => setNav(true)} asChild>
              <Link className="text-white text-[1rem]" href={"/loan"}>
                Get Loan
              </Link>
            </Button>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
