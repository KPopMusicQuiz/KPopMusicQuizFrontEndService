"use client";

import { Poppins } from "next/font/google";

import { useCurrentUser } from "@/hooks/use-current-user";
import { cn } from "@/lib/utils";


const font = Poppins({
  subsets: ["latin"],
  weight: ["600"]
});

const SettingsPage = () => {
  const session = useCurrentUser();

  return (
    <main className="flex h-full w-full flex-col items-center justify-center">
      <div className="space-y-6 text-center">
        <h1 className={cn("text-6xl font-semibold text-white drop-shadow-md", font.className)}>
          Home
        </h1>
        <p className="text-white text-lg">
          Settings page supposedly...
        </p>
        <p className="text-white text-md">
          {JSON.stringify(session)}
        </p>
      </div>
    </main>
  );
};

export default SettingsPage;
