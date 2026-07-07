import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"

type NavItem = {
  label: string
  url: string
}

const linkClass = (active: boolean) =>
  cn(
    navigationMenuTriggerStyle(),
    "h-auto rounded-md px-3 py-1.5 font-mono text-[13px] font-normal text-link no-underline bg-transparent hover:bg-accent hover:text-link hover:no-underline focus:bg-accent focus:text-link focus:no-underline",
    active && "font-semibold text-foreground bg-accent"
  )

export function NavMain({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false)
  const path =
    typeof window !== "undefined" ? window.location.pathname : ""

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [])

  return (
    <div className="relative">
      {/* Desktop: single-row nav, horizontal scroll as a fallback if it ever overflows */}
      <div className="hidden sm:block">
        <NavigationMenu viewport={false} className="max-w-none justify-start">
          <NavigationMenuList className="flex-nowrap justify-start gap-1">
            {items.map((item) => (
              <NavigationMenuItem key={item.url}>
                <NavigationMenuLink asChild active={path === item.url}>
                  <a href={item.url} className={linkClass(path === item.url)}>
                    {item.label}
                  </a>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Mobile: collapses to a trigger + stacked dropdown panel */}
      <div className="sm:hidden">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-1.5 font-mono text-[13px] text-foreground"
        >
          {open ? <X size={14} /> : <Menu size={14} />}
          menu
        </button>
        {open && (
          <div className="absolute left-0 top-full z-50 mt-2 flex w-max min-w-[160px] flex-col gap-0.5 rounded-md border border-border bg-background p-1.5 shadow-sm">
            {items.map((item) => (
              <a
                key={item.url}
                href={item.url}
                onClick={() => setOpen(false)}
                className={linkClass(path === item.url)}
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
