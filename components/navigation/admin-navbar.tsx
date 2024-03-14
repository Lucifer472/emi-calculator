"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { logOut } from "@/actions/logout-user";
import { Separator } from "@/components/ui/separator";
import { usePathname } from "next/navigation";

const AdminNavbar = () => {
  const pathname = usePathname();

  const handleLogout = () => {
    logOut();
  };
  return (
    <nav className="w-full max-w-5xl mx-auto h-16 border border-gray-300 shadow-md rounded-xl my-8">
      <div className="w-full flex items-center justify-center gap-x-2 h-16 py-2">
        <Button variant={"link"} size={"sm"}>
          <Link href={"/"}>Home</Link>
        </Button>
        <Separator orientation="vertical" />
        <Button
          variant={"link"}
          size={"sm"}
          className={pathname === "/blogs" ? "underline" : ""}
        >
          <Link href={"/blogs"}>Add Blogs</Link>
        </Button>
        <Separator orientation="vertical" />
        <Button
          variant={"link"}
          size={"sm"}
          className={pathname === "/user" ? "underline" : ""}
        >
          <Link href={"/user"}>Add User</Link>
        </Button>
        <Separator orientation="vertical" />
        <Button variant={"link"} onClick={handleLogout} size={"sm"}>
          Logout
        </Button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
