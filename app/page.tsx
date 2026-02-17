"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col gap-5 items-center justify-center bg-neutral-900 text-white p-4">
      <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold text-center">
        Task Board Application
      </h1>

      <Link
        href="/board"
        className="bg-blue-600 hover:bg-blue-700 transition px-3 md:px-6 py-2 md:py-3 rounded-lg text-sm md:text-lg font-medium shadow-md"
      >
        All Tasks
      </Link>
    </div >
  );
}
