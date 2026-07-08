import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { cn } from "@/lib/utils";

// shadcn/ui DropdownMenu, restyled with the site's monochrome tokens.
// NOTE: no <Portal> — content renders inside #nav-root so the island's scoped
// CSS (fonts, animations) and the strict CSP both apply cleanly. Click-based:
// opens on click, stays open, closes on click-away / Escape.

const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 8, ...props }, ref) => (
  <DropdownMenuPrimitive.Content
    ref={ref}
    data-nav-content=""
    sideOffset={sideOffset}
    align="start"
    className={cn(
      "z-20 flex min-w-[180px] flex-col gap-0.5 rounded-[10px] border border-nav-border bg-nav-bg p-1 shadow-[0_6px_20px_rgba(9,9,11,0.12)]",
      className,
    )}
    {...props}
  />
));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    href?: string;
    active?: boolean;
  }
>(({ className, href, active, children, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    asChild
    className={cn(
      "flex h-9 cursor-pointer select-none items-center rounded-[8px] px-3 text-[14px] font-medium leading-none text-nav-secondary no-underline outline-none transition-colors focus:bg-nav-fill focus:text-nav-heading data-[highlighted]:bg-nav-fill data-[highlighted]:text-nav-heading",
      active && "bg-nav-fill font-semibold text-nav-heading",
      className,
    )}
    {...props}
  >
    <a href={href}>{children}</a>
  </DropdownMenuPrimitive.Item>
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

export { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem };
