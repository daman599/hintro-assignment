"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-900 text-white px-4">
      <h1 className="text-3xl font-semibold mb-6 text-center">
        Task Board Application
      </h1>

      <div className="flex items-center justify-center gap-4">
        <Link
          href="/board"
          className="bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-lg text-lg font-medium shadow-md"
        >
          All Tasks
        </Link>
      </div>
    </div>
  );
}
