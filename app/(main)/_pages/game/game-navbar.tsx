import * as React from "react"
import { BsShop } from "react-icons/bs";
import { FaVolumeDown, FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import { FiActivity } from "react-icons/fi";
import { RiMenu3Fill } from "react-icons/ri";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useSidebar } from "@/hooks/use-sidebar";
import { cn } from "@/lib/utils";


const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none \
            no-underline outline-none transition-colors hover:bg-accent \
            hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
});
ListItem.displayName = "ListItem";

interface GameNavBarProps {
  volume: number;
  handleVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const GameNavBar = ({
  volume,
  handleVolumeChange,
}: GameNavBarProps) => {
  const volumeIcon = () => {
    if (volume === 0) {
      return <FaVolumeMute />;
    } else if (volume > 0.5) {
      return <FaVolumeUp />;
    } else {
      return <FaVolumeDown />;
    }
  };

  return (
    <NavigationMenu className="absolute top-0 left-0">
      <NavigationMenuList className="space-x-1 w-full pr-8 h-full bg-custom-slate-800 clip-trapezoid">
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent hover:bg-transparent">
            <RiMenu3Fill />
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 w-[400px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md \
                               bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none \
                               focus:shadow-md"
                    href="/"
                  >
                    <FiActivity className="h-6 w-6" />
                    <div className="mb-2 mt-4 text-lg font-medium">
                      shadcn/ui
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Beautifully designed components built with Radix UI and
                      Tailwind CSS.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/docs" title="Introduction">
                Re-usable components built using Radix UI and Tailwind CSS.
              </ListItem>
              <ListItem href="/docs/installation" title="Installation">
                How to install dependencies and structure your app.
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="Shop">
                <BsShop /> Shopshopshopshop
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <div className="transform w-32 flex items-center space-x-2">
            {volumeIcon()}
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-full h-1 bg-slate-300 rounded-lg cursor-pointer"
            />
          </div>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export default GameNavBar;
