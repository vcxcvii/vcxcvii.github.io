import React from "react";
import { createRoot } from "react-dom/client";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/navigation-menu";
import "./index.css";

type NavItem = { label: string; url: string };

const PRIMARY_COUNT = 5;

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

  const linkList = (list: NavItem[]) =>
    list.map((it) => (
      <NavigationMenuItem key={it.url}>
        <NavigationMenuLink href={it.url} active={isActive(it.url)}>
          {it.label}
        </NavigationMenuLink>
      </NavigationMenuItem>
    ));

  const dropdown = (triggerLabel: string, list: NavItem[]) => (
    <NavigationMenuItem className="group">
      <NavigationMenuTrigger>{triggerLabel}</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="flex min-w-[180px] flex-col gap-0.5">
          {list.map((it) => (
            <li key={it.url}>
              <NavigationMenuLink
                href={it.url}
                active={isActive(it.url)}
                className="h-9 w-full justify-start whitespace-nowrap"
              >
                {it.label}
              </NavigationMenuLink>
            </li>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );

  return (
    // items-start: the link row sits at the top of the NavigationMenu (whose
    // flow height includes the dropdown area below), so aligning tops makes
    // the 36px avatar and 36px links share a centerline.
    <div className="flex items-start">
      {avatar}
      <NavigationMenu>
        <NavigationMenuList>
          {mobile
            ? dropdown("menu", items)
            : (
              <>
                {linkList(primary)}
                {secondary.length > 0 && dropdown("more", secondary)}
              </>
            )}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
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
    createRoot(root).render(
      <React.StrictMode>
        <Nav items={items} current={current} />
      </React.StrictMode>,
    );
  }
}
