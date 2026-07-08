import React from "react";
import { createRoot } from "react-dom/client";
import { ChevronDown, Moon, Sun } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "@/components/tabs";
import {
  Pagination,
  PaginationButton,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/pagination";
import { cn } from "@/lib/utils";
import "./index.css";

type NavItem = { label: string; url: string };
type ThemeApi = {
  get: () => "light" | "dark";
  explicit: () => "light" | "dark" | null;
  set: (theme: "light" | "dark" | null) => void;
};

declare global {
  interface Window {
    __vcTheme?: ThemeApi;
  }
}

const PRIMARY_COUNT = 5;

const itemClasses =
  "inline-flex h-9 items-center justify-center rounded-[8px] border border-transparent bg-transparent px-3 text-[14px] font-medium leading-none no-underline transition-colors";

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
  const [theme, setTheme] = React.useState<"light" | "dark">(() => window.__vcTheme?.get() || "light");
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

  React.useEffect(() => {
    const onTheme = (event: Event) => {
      const next = (event as CustomEvent<{ theme: "light" | "dark" }>).detail?.theme;
      if (next) setTheme(next);
    };
    window.addEventListener("themechange", onTheme);
    return () => window.removeEventListener("themechange", onTheme);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    window.__vcTheme?.set(next);
    setTheme(next);
  };

  return (
    <nav data-nav-menu="" aria-label="Primary" className="flex items-center gap-1">
      <div className="flex min-w-0 flex-1 items-center gap-1">
        {avatar}
        {mobile ? (
          menu("menu", items)
        ) : (
          <>
            {primary.map(inlineLink)}
            {secondary.length > 0 && menu("more", secondary)}
          </>
        )}
      </div>
      <button
        type="button"
        aria-label="Toggle dark mode"
        aria-pressed={theme === "dark"}
        onClick={toggleTheme}
        className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] border border-nav-border bg-transparent text-nav-secondary transition-colors hover:border-nav-heading hover:bg-nav-fill hover:text-nav-heading"
      >
        {theme === "dark" ? <Sun className="h-4 w-4" aria-hidden="true" /> : <Moon className="h-4 w-4" aria-hidden="true" />}
      </button>
    </nav>
  );
}

function displayTag(tag: string) {
  return tag.toLowerCase() === "ai" ? "AI" : tag.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function readPageParam() {
  const n = Number(new URLSearchParams(window.location.search).get("page") || "1");
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : 1;
}

function pageRange(current: number, total: number) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: Array<number | "..."> = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  if (start > 2) pages.push("...");
  for (let i = start; i <= end; i++) pages.push(i);
  if (end < total - 1) pages.push("...");
  pages.push(total);
  return pages;
}

function FilterPaginationIsland({ root }: { root: HTMLElement }) {
  const tags = React.useMemo<string[]>(() => {
    try {
      return JSON.parse(root.dataset.tags || "[]");
    } catch {
      return [];
    }
  }, [root]);
  const targetSelector = root.dataset.target || "[data-filter-list]";
  const list = React.useMemo(() => document.querySelector<HTMLElement>(targetSelector), [targetSelector]);
  const rows = React.useMemo(() => Array.from(list?.querySelectorAll<HTMLElement>("[data-tags]") || []), [list]);
  const [active, setActive] = React.useState(() => (window.location.hash || "#all").slice(1) || "all");
  const [page, setPage] = React.useState(readPageParam);
  const [overflow, setOverflow] = React.useState({ left: false, right: false });
  const listRef = React.useRef<HTMLDivElement | null>(null);
  const triggerRefs = React.useRef<Record<string, HTMLButtonElement | null>>({});
  const perPage = Number(root.dataset.perPage || "20");
  const allTags = ["all", ...tags];

  const matching = React.useMemo(() => rows.filter((row) => {
    const rowTags = row.dataset.tags ? row.dataset.tags.split(",") : [];
    return active === "all" || rowTags.includes(active);
  }), [active, rows]);
  const totalPages = Math.max(1, Math.ceil(matching.length / perPage));
  const showPagination = matching.length > perPage;
  const safePage = Math.min(page, totalPages);

  const updateOverflow = React.useCallback(() => {
    const el = listRef.current;
    if (!el) return;
    setOverflow({
      left: el.scrollLeft > 0,
      right: el.scrollLeft + el.clientWidth < el.scrollWidth - 1,
    });
  }, []);

  React.useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    updateOverflow();
    el.addEventListener("scroll", updateOverflow, { passive: true });
    window.addEventListener("resize", updateOverflow);
    return () => {
      el.removeEventListener("scroll", updateOverflow);
      window.removeEventListener("resize", updateOverflow);
    };
  }, [updateOverflow]);

  React.useEffect(() => {
    const el = listRef.current;
    const tab = triggerRefs.current[active];
    if (!el || !tab) return;
    const left = tab.offsetLeft - el.offsetLeft;
    const right = left + tab.offsetWidth;
    if (left < el.scrollLeft) el.scrollLeft = Math.max(0, left - 16);
    else if (right > el.scrollLeft + el.clientWidth) el.scrollLeft = right - el.clientWidth + 16;
    updateOverflow();
  }, [active, updateOverflow]);

  React.useEffect(() => {
    rows.forEach((row) => {
      const visibleByTag = matching.includes(row);
      const index = matching.indexOf(row);
      const visibleByPage = !showPagination || (index >= (safePage - 1) * perPage && index < safePage * perPage);
      row.hidden = !visibleByTag || !visibleByPage;
    });
    list?.querySelectorAll<HTMLElement>("[data-year-marker]").forEach((marker) => {
      let next = marker.nextElementSibling as HTMLElement | null;
      let visible = false;
      while (next && !next.hasAttribute("data-year-marker")) {
        if (!next.hidden) {
          visible = true;
          break;
        }
        next = next.nextElementSibling as HTMLElement | null;
      }
      marker.hidden = !visible;
    });
  }, [list, matching, perPage, rows, safePage, showPagination]);

  React.useEffect(() => {
    const onPop = () => {
      setActive((window.location.hash || "#all").slice(1) || "all");
      setPage(readPageParam());
    };
    window.addEventListener("popstate", onPop);
    window.addEventListener("hashchange", onPop);
    return () => {
      window.removeEventListener("popstate", onPop);
      window.removeEventListener("hashchange", onPop);
    };
  }, []);

  function commit(nextTag: string, nextPage: number, replace = false) {
    const url = new URL(window.location.href);
    if (nextPage > 1) url.searchParams.set("page", String(nextPage));
    else url.searchParams.delete("page");
    url.hash = nextTag === "all" ? "" : nextTag;
    (replace ? window.history.replaceState : window.history.pushState).call(window.history, null, "", url);
    setActive(nextTag);
    setPage(nextPage);
  }

  React.useEffect(() => {
    if (safePage !== page) commit(active, safePage, true);
  }, [active, page, safePage]);

  return (
    <>
      <div className={cn("tabs-scroll", overflow.left && "has-left", overflow.right && "has-right")}>
        <Tabs value={active} onValueChange={(value) => commit(value, 1)}>
          <TabsList ref={listRef} aria-label="Filter posts" className="tabs-list-scroll">
            {allTags.map((tag) => (
              <TabsTrigger
                key={tag}
                value={tag}
                ref={(node) => { triggerRefs.current[tag] = node; }}
              >
                {tag === "all" ? "All" : displayTag(tag)}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
      {showPagination && (
        <Pagination className="island-pagination">
          <PaginationContent className="pagination-desktop">
            <PaginationItem><PaginationButton disabled={safePage === 1} onClick={() => commit(active, safePage - 1)}>Previous</PaginationButton></PaginationItem>
            {pageRange(safePage, totalPages).map((item, index) => (
              <PaginationItem key={`${item}-${index}`}>
                {item === "..." ? <PaginationEllipsis /> : <PaginationButton active={item === safePage} onClick={() => commit(active, item)}>{item}</PaginationButton>}
              </PaginationItem>
            ))}
            <PaginationItem><PaginationButton disabled={safePage === totalPages} onClick={() => commit(active, safePage + 1)}>Next</PaginationButton></PaginationItem>
          </PaginationContent>
          <PaginationContent className="pagination-mobile">
            <PaginationItem><PaginationButton disabled={safePage === 1} onClick={() => commit(active, safePage - 1)}>Previous</PaginationButton></PaginationItem>
            <PaginationItem><span className="pagination-count">{safePage} / {totalPages}</span></PaginationItem>
            <PaginationItem><PaginationButton disabled={safePage === totalPages} onClick={() => commit(active, safePage + 1)}>Next</PaginationButton></PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </>
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

document.querySelectorAll<HTMLElement>("[data-filters-root]").forEach((el) => {
  createRoot(el).render(<FilterPaginationIsland root={el} />);
});
