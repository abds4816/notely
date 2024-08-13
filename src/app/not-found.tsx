import { buttonVariants } from "@/components/ui/button";
import { ArrowLeftCircle } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Page not found | Notely",
  description: "The page that you looking for not exist.",
};

export default function notFound() {
  return (
    <section className="py-12">
      <div className="w-full min-h-[30rem] grid place-content-center">
        <div className="flex flex-col items-center gap-4">
          {/* icon */}
          <Image
            src="/not-found.svg"
            alt="not found"
            width={320}
            height={320}
            className="size-[20rem]"
          />
          {/* message */}
          <div className="space-y-3 text-center">
            <h4 className="font-semibold text-2xl">Page not found.</h4>
            <p className="text-muted-foreground">
              The page that you looking for not exist.
            </p>
          </div>
          {/* CTA */}
          <Link href="/" className={buttonVariants({ size: "lg" })}>
            <ArrowLeftCircle className="size-5" />
            <span>back to home page</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
