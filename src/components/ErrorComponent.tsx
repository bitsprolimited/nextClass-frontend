import { TriangleAlert } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

function ErrorComponent() {
  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-red-600 flex items-center justify-center">
          <TriangleAlert />
        </p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
          Something went wrong
        </h1>
        <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
          Sorry, Please try again.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link href="#">
            <Button className="bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary h-auto rounded-full hover:bg-secondary">Go back home</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}

export default ErrorComponent;
