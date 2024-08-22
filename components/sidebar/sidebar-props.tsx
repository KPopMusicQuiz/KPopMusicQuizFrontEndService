"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link, { LinkProps } from "next/link";

import { IconLogin, IconWritingSign } from "@tabler/icons-react";

import { useCurrentUser } from "@/hooks/use-current-user";
import { ModalType, useModal } from "@/hooks/use-modal-store";
import { useSidebar } from "@/hooks/use-sidebar";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "../theme-toggle";
import { FaCog } from "react-icons/fa";
import { usePathname } from "next/navigation";


interface Links {
  label: string;
  href: string;
  icon: React.ComponentType<any>;
};

export const SidebarLink = ({
  link,
  className,
  ...props
}: {
  link: Links;
  className?: string;
  props?: LinkProps;
}) => {
  const { open, animate } = useSidebar();
  const pathname = usePathname();

  return (
    <Link
      href={link.href}
      className={cn(
        "flex items-center justify-start gap-2 group/sidebar py-2",
        className,
        pathname === link.href ? "text-blue-700 dark:text-blue-500" : "text-neutral-700 dark:text-neutral-200"
      )}
      {...props}
    >
      <link.icon className="h-5 w-5 flex-shrink-0" />
      <motion.span
        animate={{
          display: animate ? (open ? "inline-block" : "none") : "inline-block",
          opacity: animate ? (open ? 1 : 0) : 1,
        }}
        // initial={{ opacity: 0 }}
        // animate={{ opacity: 1 }}
        // exit={{ opacity: 0 }}
        // removes blinking issue when open
        className="text-sm group-hover/sidebar:translate-x-1 transition duration-150 \
                   whitespace-pre inline-block !p-0 !m-0"
      >
        {link.label}
      </motion.span>
    </Link>
  );
};

export const SidebarButton = ({
  className,
  icon,
  label,
  onClick,
}: {
  className?: string;
  icon: React.JSX.Element | React.ReactNode;
  label: string;
  onClick: () => void;
}) => {
  const { open, animate } = useSidebar();

  return (
    <motion.button
      animate={{
        display: animate ? (open ? "inline-block" : "none") : "inline-block",
        opacity: animate ? (open ? 1 : 0) : 1,
      }}
      className={cn(
        "flex justify-center group/modal-btn \
         px-4 py-2 rounded-md text-center relative overflow-hidden",
        className,
      )}
      onClick={onClick}
    >
      <div className="group-hover/modal-btn:translate-x-40 text-center transition duration-500 whitespace-nowrap overflow-hidden">
        {label}
      </div>
      <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center \
                      absolute inset-0 transition duration-500 z-20">
        {icon}
      </div>
    </motion.button>
  );
};

export const SidebarAuth = () => {
  const user = useCurrentUser();
  const { onOpen } = useModal();
  const { open } = useSidebar();

  return (
    <div className="flex flex-col overflow-y-auto overflow-x-hidden space-y-2">
      {user?.id && (
        <motion.div
          layout  
          className="flex overflow-hidden items-center justify-between"
          style={{ flexDirection: open ? "row" : "column-reverse" }}
        >
          <SidebarButton
            className="bg-gray-500 dark:bg-gray-950 text-black dark:text-white"
            icon={<IconLogin size={18} strokeWidth={2} />}
            label="Log Out"
            onClick={() => onOpen(ModalType.Logout)}
          />
          <FaCog size={18} strokeWidth={2} />
          <ThemeToggle />
        </motion.div>
      )}

      {!user?.id && (
        <>
          <SidebarButton
            className="bg-gray-500 dark:bg-gray-950 text-black dark:text-white"
            icon={<IconLogin size={18} strokeWidth={2} />}
            label="Log In"
            onClick={() => onOpen(ModalType.Login)}
          />
          <SidebarButton
            className="bg-custom-blue-900 text-white"
            icon={<IconWritingSign size={18} strokeWidth={2} />}
            label="Register"
            onClick={() => onOpen(ModalType.Register)}
          />
        </>
      )}
    </div>
  )
}
