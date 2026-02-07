"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import type { NewsEvent } from "@/lib/types"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import Image from "next/image"

interface SearchViewProps {
  events: NewsEvent[]
  onOpenEvent: (event: NewsEvent) => void
}

export function SearchView({ events, onOpenEvent }: SearchViewProps) {
  const [query, setQuery] = useState("")
  const [debouncedQuery, setDebouncedQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-focus the search input on mount
  useEffect(() => {
    // Small delay to let the tab transition settle
    const timer = setTimeout(() => inputRef.current?.focus(), 100)
    return () => clearTimeout(timer)
  }, [])

  // Debounce the search query
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 300)
    return () => clearTimeout(timer)
  }, [query])

  // Filter events by title and summary
  const results = useMemo(() => {
    if (!debouncedQuery.trim()) return events
    const q = debouncedQuery.toLowerCase().trim()
    return events.filter(
      (event) =>
        event.title.toLowerCase().includes(q) ||
        event.summary.toLowerCase().includes(q)
    )
  }, [debouncedQuery, events])

  const hasQuery = debouncedQuery.trim().length > 0
  const noResults = hasQuery && results.length === 0

  return (
    <div className="flex flex-col h-full bg-[#FFFBEA]">
      {/* Search input bar */}
      <div className="shrink-0 px-5 pt-[calc(env(safe-area-inset-top)+12px)] pb-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1E1E1E]/40" />
          <Input
            ref={inputRef}
            type="text"
            placeholder="Buscar noticias, eventos..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9 pr-9 h-11 rounded-full border-none bg-[#1E1E1E]/5 text-sm text-[#1E1E1E] placeholder:text-[#1E1E1E]/35 focus-visible:ring-2 focus-visible:ring-[#D97757]/40 focus-visible:ring-offset-0 transition-all duration-200"
            aria-label="Buscar noticias"
          />
          {query.length > 0 && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-[#1E1E1E]/10 transition-colors"
              aria-label="Limpiar búsqueda"
            >
              <X className="h-4 w-4 text-[#1E1E1E]/40" />
            </button>
          )}
        </div>
      </div>

      {/* Results area */}
      <div className="flex-1 min-h-0 overflow-y-auto px-5 pb-24">
        {noResults ? (
          /* No results state */
          <div className="flex flex-col items-center justify-center h-full gap-3 animate-fade-in">
            <div className="p-3 rounded-full bg-[#1E1E1E]/5">
              <Search className="h-6 w-6 text-[#1E1E1E]/30" />
            </div>
            <p className="text-sm text-[#1E1E1E]/50 text-center">
              No se encontraron resultados para
              <br />
              <span className="font-medium text-[#1E1E1E]/70">
                &ldquo;{debouncedQuery}&rdquo;
              </span>
            </p>
          </div>
        ) : (
          <>
            {/* Section heading */}
            <p className="text-xs font-medium text-[#1E1E1E]/40 uppercase tracking-wide mb-3">
              {hasQuery
                ? `${results.length} resultado${results.length !== 1 ? "s" : ""}`
                : "Todas las noticias"}
            </p>

            {/* Results grid */}
            <div className="grid grid-cols-2 gap-3">
              {results.map((event, index) => (
                <button
                  key={event.id}
                  type="button"
                  onClick={() => onOpenEvent(event)}
                  className="flex flex-col text-left rounded-xl overflow-hidden bg-white/60 shadow-sm hover:shadow-md transition-shadow duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D97757]/40"
                  style={{
                    animation: "search-card-in 0.3s ease-out both",
                    animationDelay: `${index * 50}ms`,
                  }}
                  aria-label={`Ver evento: ${event.title}`}
                >
                  {/* Card image */}
                  <div className="relative w-full aspect-[4/3]">
                    <Image
                      src={event.img_url || "/placeholder.svg"}
                      alt={event.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                  </div>

                  {/* Card content */}
                  <div className="p-3 flex flex-col gap-1">
                    <h3 className="text-sm font-semibold leading-tight text-[#1E1E1E] line-clamp-2">
                      {event.title}
                    </h3>
                    <span className="text-[10px] text-[#1E1E1E]/45 font-medium">
                      {event.sources.length} fuentes
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
