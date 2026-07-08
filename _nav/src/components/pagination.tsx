import * as React from "react";
import { cn } from "@/lib/utils";

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return <nav aria-label="Pagination" className={cn("flex justify-center", className)} {...props} />;
}

function PaginationContent({ className, ...props }: React.ComponentProps<"ul">) {
  return <ul className={cn("flex items-center gap-1", className)} {...props} />;
}

function PaginationItem({ className, ...props }: React.ComponentProps<"li">) {
  return <li className={cn("list-none", className)} {...props} />;
}

type PaginationButtonProps = React.ComponentProps<"button"> & { active?: boolean };

function PaginationButton({ className, active, ...props }: PaginationButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex h-9 min-w-9 items-center justify-center rounded-[8px] border border-transparent bg-transparent px-3 text-[14px] font-medium text-nav-secondary transition-colors hover:border-nav-border hover:bg-nav-fill hover:text-nav-heading disabled:pointer-events-none disabled:opacity-40",
        active && "border-nav-border bg-nav-fill text-nav-heading",
        className,
      )}
      aria-current={active ? "page" : undefined}
      {...props}
    />
  );
}

function PaginationEllipsis() {
  return <span className="flex h-9 min-w-9 items-center justify-center text-nav-faint">...</span>;
}

export { Pagination, PaginationContent, PaginationItem, PaginationButton, PaginationEllipsis };
