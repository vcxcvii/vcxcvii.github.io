import { createRoot } from "react-dom/client"
import "./index.css"
import { NavMain } from "./nav"

const mount = document.getElementById("nav-root")
const dataEl = document.getElementById("nav-data")
const fallback = document.querySelector<HTMLElement>("[data-nav-fallback]")

if (mount && dataEl) {
  const items = JSON.parse(dataEl.textContent || "[]")
  createRoot(mount).render(<NavMain items={items} />)
  mount.hidden = false
  if (fallback) fallback.hidden = true
}
