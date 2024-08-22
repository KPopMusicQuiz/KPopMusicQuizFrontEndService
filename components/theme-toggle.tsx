"use client";

import { useTheme } from "next-themes";
import { IoMoon, IoSunnySharp } from "react-icons/io5";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      onClick={() => {theme === "light" ? setTheme("dark") : setTheme("light")}}
      variant="outline"
      size="icon"
    >
      <IoSunnySharp
        className="absolute h-[1.2rem] w-[1.2rem] rotate-0
                    scale-100 duration-700 transition-all
                    dark:-rotate-180 dark:scale-0" />
      <IoMoon
        className="absolute h-[1.2rem] w-[1.2rem] rotate-180
                    scale-0 duration-700 transition-all
                    dark:rotate-0 dark:scale-100"
      />
    </Button>
  );
};
