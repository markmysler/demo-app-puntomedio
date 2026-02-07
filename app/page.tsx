"use client"

import { useState, useCallback } from "react"
import type { NewsEvent } from "@/lib/types"
import eventsData from "@/data/events.json"
import { NewsFeed } from "@/components/news-feed"
import { EventPage } from "@/components/event-page"
import { BottomNavbar } from "@/components/bottom-navbar"
import { AppLogo } from "@/components/app-logo"
import { SearchView } from "@/components/search-view"
import { Globe, User } from "lucide-react"

const events: NewsEvent[] = eventsData

export default function Page() {
  const [activeTab, setActiveTab] = useState("inicio")
  const [selectedEvent, setSelectedEvent] = useState<NewsEvent | null>(null)
  const [showEventPage, setShowEventPage] = useState(false)

  const handleOpenEvent = useCallback((event: NewsEvent) => {
    setSelectedEvent(event)
    // Small delay to allow state to set before animating
    requestAnimationFrame(() => {
      setShowEventPage(true)
    })
  }, [])

  const handleCloseEvent = useCallback(() => {
    setShowEventPage(false)
    // Wait for animation to finish before clearing the event
    setTimeout(() => {
      setSelectedEvent(null)
    }, 350)
  }, [])

  return (
    <main className="fixed inset-0 flex flex-col bg-[#FFFBEA]">
      {/* Main content area */}
      <div className="flex-1 relative overflow-hidden">
        {activeTab === "inicio" && (
          <>
            {/* Top header bar */}
            <div className="absolute top-0 left-0 right-0 z-20 px-4 pt-[env(safe-area-inset-top)] bg-gradient-to-b from-[#1E1E1E]/50 to-transparent">
              <div className="flex items-center justify-between py-3">
                <AppLogo size="sm" className="[&_span]:text-[#FFFBEA] [&_div]:bg-[#D97757]" />
                <div className="flex items-center gap-1">
                  <span className="text-xs text-[#FFFBEA]/70 font-medium">
                    Deslizá para explorar
                  </span>
                </div>
              </div>
            </div>

            {/* News feed */}
            <NewsFeed events={events} onOpenEvent={handleOpenEvent} />
          </>
        )}

        {activeTab === "buscar" && (
          <SearchView events={events} onOpenEvent={handleOpenEvent} />
        )}

        {activeTab === "descubrir" && (
          <div className="flex flex-col items-center justify-center h-full gap-4 px-8">
            <div className="p-4 rounded-full bg-[#D97757]/10">
              <Globe className="h-8 w-8 text-[#D97757]" />
            </div>
            <h2 className="text-xl font-bold text-[#1E1E1E]">Descubrir</h2>
            <p className="text-sm text-[#1E1E1E]/50 text-center">
              Explorá categorías y temas de interés.
              Próximamente disponible.
            </p>
          </div>
        )}

        {activeTab === "cuenta" && (
          <div className="flex flex-col items-center justify-center h-full gap-4 px-8">
            <div className="p-4 rounded-full bg-[#D97757]/10">
              <User className="h-8 w-8 text-[#D97757]" />
            </div>
            <h2 className="text-xl font-bold text-[#1E1E1E]">Tu cuenta</h2>
            <p className="text-sm text-[#1E1E1E]/50 text-center">
              Iniciá sesión para guardar tus preferencias.
              Próximamente disponible.
            </p>
          </div>
        )}
      </div>

      {/* Bottom navbar */}
      <BottomNavbar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Event detail overlay */}
      {selectedEvent && (
        <EventPage
          event={selectedEvent}
          onBack={handleCloseEvent}
          isVisible={showEventPage}
        />
      )}
    </main>
  )
}
