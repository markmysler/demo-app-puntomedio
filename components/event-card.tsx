"use client"

import { Bookmark, Share2, ChevronRight } from "lucide-react"
import type { NewsEvent } from "@/lib/types"
import Image from "next/image"

interface EventCardProps {
  event: NewsEvent
  onOpenEvent: (event: NewsEvent) => void
}

export function EventCard({ event, onOpenEvent }: EventCardProps) {
  return (
    <div className="relative h-full w-full flex flex-col bg-[#FFFBEA]">
      {/* Hero image - capped at 40% height */}
      <div className="relative w-full h-[38%] shrink-0">
        <Image
          src={event.img_url || "/placeholder.svg"}
          alt={event.title}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </div>

      {/* Content area - scrollable, padded for bottom navbar */}
      <div className="relative flex-1 min-h-0 overflow-y-auto bg-[#FFFBEA] px-5 pt-1 pb-20 flex flex-col gap-3">
        {/* Source badges row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {event.sources.slice(0, 3).map((source, index) => (
                <Image
                  key={source.news_outlet_name}
                  src={source.news_outlet_icon || "/placeholder.svg"}
                  alt={source.news_outlet_name}
                  width={24}
                  height={24}
                  className="rounded-full border-2 border-[#FFFBEA]"
                  style={{ zIndex: 3 - index }}
                />
              ))}
            </div>
            <span className="text-xs text-[#1E1E1E]/60 font-medium">
              {event.sources.length} fuentes
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Guardar"
              className="p-1.5 rounded-full hover:bg-[#1E1E1E]/5 transition-colors"
            >
              <Bookmark className="h-5 w-5 text-[#1E1E1E]/70" />
            </button>
            <button
              type="button"
              aria-label="Compartir"
              className="p-1.5 rounded-full hover:bg-[#1E1E1E]/5 transition-colors"
            >
              <Share2 className="h-5 w-5 text-[#1E1E1E]/70" />
            </button>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold leading-tight text-[#1E1E1E] text-balance">
          {event.title}
        </h2>

        {/* Summary */}
        <p className="text-sm leading-relaxed text-[#1E1E1E]/75">
          {event.summary}
        </p>

        {/* CTA to open event detail */}
        <button
          type="button"
          onClick={() => onOpenEvent(event)}
          className="flex items-center gap-1.5 mt-1 group"
        >
          <span className="text-xs font-semibold text-[#D97757] group-hover:underline">
            Ver narrativas
          </span>
          <ChevronRight className="h-3.5 w-3.5 text-[#D97757] transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </div>
  )
}
