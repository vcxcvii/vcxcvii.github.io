import * as React from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

// shadcn/ui NavigationMenu, restyled with the site's monochrome tokens and
// tagged with data-nav-* attributes so index.css can scope animations to the
// island (no tailwindcss-animate dependency).

const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    data-nav-menu=""
    className={cn("relative z-10 flex max-w-max flex-1 items-center", className)}
    {...props}
  >
    {children}
    <NavigationMenuViewport />
  </NavigationMenuPrimitive.Root>
));
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName;

const NavigationMenuList = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn("flex flex-1 list-none items-center gap-1", className)}
    {...props}
  />
));
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName;

const NavigationMenuItem = NavigationMenuPrimitive.Item;

const itemClasses =
  "inline-flex h-9 items-center justify-center rounded-[8px] px-3 text-[14px] font-medium leading-none text-nav-secondary no-underline transition-colors hover:bg-nav-fill hover:text-nav-heading focus:bg-nav-fill focus:text-nav-heading focus:outline-none data-[active]:bg-nav-fill data-[active]:font-semibold data-[active]:text-nav-heading data-[state=open]:bg-nav-fill data-[state=open]:text-nav-heading";

const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    className={cn(itemClasses, "gap-1", className)}
    {...props}
  >
    {children}{" "}
    <ChevronDown
      className="relative top-px h-3 w-3 transition-transform duration-200 group-data-[state=open]:rotate-180"
      aria-hidden="true"
    />
  </NavigationMenuPrimitive.Trigger>
));
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName;

const NavigationMenuLink = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Link>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Link>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Link
    ref={ref}
    className={cn(itemClasses, className)}
    {...props}
  />
));
NavigationMenuLink.displayName = NavigationMenuPrimitive.Link.displayName;

const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    data-nav-content=""
    className={cn("w-auto", className)}
    {...props}
  />
));
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName;

const NavigationMenuViewport = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <div className="absolute left-0 top-full flex justify-start">
    <NavigationMenuPrimitive.Viewport
      ref={ref}
      data-nav-viewport=""
      className={cn(
        "relative mt-2 h-[var(--radix-navigation-menu-viewport-height)] w-[var(--radix-navigation-menu-viewport-width)] origin-top-left overflow-hidden rounded-[10px] border border-nav-border bg-nav-bg p-1 shadow-[0_4px_16px_rgba(9,9,11,0.08)]",
        className,
      )}
      {...props}
    />
  </div>
));
NavigationMenuViewport.displayName =
  NavigationMenuPrimitive.Viewport.displayName;

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
};
