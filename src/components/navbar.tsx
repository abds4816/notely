import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ModeToggle } from "./mode-toggle";

const Navbar = () => {
  return (
    <header className="fixed top-0 start-0 w-full h-20 bg-background/60 backdrop-blur-md border-b py-4 z-50 align-middle">
      <div className="container flex items-center justify-between">
        {/* logo */}
        <Link href="/">
          <Image src="/logo.svg" alt="logo" width={120} height={50} />
        </Link>
        {/* mode toggle */}
        <ModeToggle />
      </div>
    </header>
  );
};

export default Navbar;
