import React from "react";
import { createRoot } from "react-dom/client";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/dropdown-menu";
import { cn } from "@/lib/utils";
import "./index.css";

type NavItem = { label: string; url: string };

const PRIMARY_COUNT = 5;

const itemClasses =
  "inline-flex h-9 items-center justify-center rounded-[8px] px-3 text-[14px] font-medium leading-none no-underline transition-colors";

function useIsMobile() {
  const [mobile, setMobile] = React.useState(
    typeof window !== "undefined" ? window.matchMedia("(max-width: 639px)").matches : false,
  );
  React.useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const on = () => setMobile(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return mobile;
}

function normalize(u: string) {
  return u.replace(/index\.html$/, "");
}

function Nav({ items, current }: { items: NavItem[]; current: string }) {
  const mobile = useIsMobile();
  const [open, setOpen] = React.useState(false);
  const cur = normalize(current);
  const primary = items.slice(0, PRIMARY_COUNT);
  const secondary = items.slice(PRIMARY_COUNT);
  const isActive = (url: string) => normalize(url) === cur;

  const avatar = (
    <a href="/" aria-label="Home" className="mr-1 flex h-9 w-9 shrink-0 items-center overflow-hidden rounded-full border border-nav-border no-underline">
      <img
        src="/assets/images/favicon.png"
        alt=""
        className="h-full w-full rounded-full object-cover"
        width={36}
        height={36}
      />
    </a>
  );

  const inlineLink = (it: NavItem) => (
    <a
      key={it.url}
      href={it.url}
      aria-current={isActive(it.url) ? "page" : undefined}
      className={cn(
        itemClasses,
        isActive(it.url)
          ? "bg-nav-fill font-semibold text-nav-heading"
          : "text-nav-secondary hover:bg-nav-fill hover:text-nav-heading",
      )}
    >
      {it.label}
    </a>
  );

  const menu = (triggerLabel: string, list: NavItem[]) => (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        className={cn(
          itemClasses,
          "gap-1 outline-none",
          open ? "bg-nav-fill text-nav-heading" : "text-nav-secondary hover:bg-nav-fill hover:text-nav-heading",
        )}
      >
        {triggerLabel}
        <ChevronDown
          className={cn("h-3 w-3 transition-transform duration-200", open && "rotate-180")}
          aria-hidden="true"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {list.map((it) => (
          <DropdownMenuItem key={it.url} href={it.url} active={isActive(it.url)}>
            {it.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <nav data-nav-menu="" aria-label="Primary" className="flex items-center gap-1">
      {avatar}
      {mobile ? (
        menu("menu", items)
      ) : (
        <>
          {primary.map(inlineLink)}
          {secondary.length > 0 && menu("more", secondary)}
        </>
      )}
    </nav>
  );
}

const root = document.getElementById("nav-root");
if (root) {
  let items: NavItem[] = [];
  try {
    items = JSON.parse(root.dataset.nav || "[]");
  } catch {
    items = [];
  }
  const current = root.dataset.current || "/";
  if (items.length) {
    createRoot(root).render(<Nav items={items} current={current} />);
  }
}
