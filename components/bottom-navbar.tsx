"use client"

import { Home, Search, Globe, User } from "lucide-react"

interface BottomNavbarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const NAV_ITEMS = [
  { id: "inicio", label: "Inicio", icon: Home },
  { id: "buscar", label: "Buscar", icon: Search },
  { id: "descubrir", label: "Descubrir", icon: Globe },
  { id: "cuenta", label: "Cuenta", icon: User },
]

export function BottomNavbar({ activeTab, onTabChange }: BottomNavbarProps) {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-[#FFFBEA]/95 backdrop-blur-md border-t border-[#1E1E1E]/10"
      role="navigation"
      aria-label="Navegación principal"
    >
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2">
        {NAV_ITEMS.map((item) => {
          const isActive = activeTab === item.id
          const Icon = item.icon
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-200 ${
                isActive
                  ? "text-[#D97757]"
                  : "text-[#1E1E1E]/40 hover:text-[#1E1E1E]/60"
              }`}
              aria-label={item.label}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon
                className={`h-5 w-5 transition-all duration-200 ${
                  isActive ? "scale-110" : ""
                }`}
                strokeWidth={isActive ? 2.5 : 1.5}
              />
              <span
                className={`text-[10px] font-medium transition-all duration-200 ${
                  isActive ? "font-semibold" : ""
                }`}
              >
                {item.label}
              </span>
            </button>
          )
        })}
      </div>
      {/* Safe area spacer for devices with home indicator */}
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  )
}
