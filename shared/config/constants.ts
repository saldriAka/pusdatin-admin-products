import { LayoutDashboard, Package } from "lucide-react"

export const API_CONFIG = {
  FAKE_STORE_BASE_URL: "https://fakestoreapi.com",
  DEFAULT_PAGE_SIZE: 12,
  MAX_PAGE_SIZE: 50,
} as const

export const AUTH_CONFIG = {
  TOKEN_KEY: "auth_token",
  COOKIE_NAME: "sidebar:state",
} as const

export const UI_CONFIG = {
  SIDEBAR_WIDTH: "16rem",
  SIDEBAR_WIDTH_MOBILE: "18rem",
  SIDEBAR_WIDTH_ICON: "3rem",
} as const

export const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Products", href: "/dashboard/products", icon: Package },
]