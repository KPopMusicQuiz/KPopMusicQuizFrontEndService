"use client";

import { motion } from "framer-motion";

import { useSidebar } from "@/hooks/use-sidebar";
import { cn } from "@/lib/utils";

export const SidebarDesktop = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof motion.div>) => {
  const { open, setOpen, animate } = useSidebar();
  return (
    <>
      <motion.div
        className={cn(
          "h-full px-6 py-4 hidden md:flex md:flex-col bg-neutral-100 dark:bg-neutral-800 w-[66px] flex-shrink-0",
          className
        )}
        animate={{
          width: animate ? (open ? "300px" : "66px") : "300px",
        }}
        transition={{ duration: 0.3 }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        {...props}
      >
        {children}
      </motion.div>
    </>
  );
};
