"use client"

import { Bookmark, Share2, ChevronLeft } from "lucide-react"
import type { NewsEvent } from "@/lib/types"
import Image from "next/image"

interface EventCardProps {
  event: NewsEvent
  onOpenEvent: (event: NewsEvent) => void
}

export function EventCard({ event, onOpenEvent }: EventCardProps) {
  return (
    <div className="relative h-full w-full flex flex-col bg-[#1E1E1E]">
      {/* Hero image - top portion */}
      <div className="relative flex-1 min-h-0">
        <Image
          src={event.img_url || "/placeholder.svg"}
          alt={event.title}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#1E1E1E]/80" />
      </div>

      {/* Content area - bottom portion */}
      <div className="relative bg-[#FFFBEA] px-5 pb-6 pt-4 flex flex-col gap-3">
        {/* Source badges row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Source outlet icons stacked */}
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
        <p className="text-sm leading-relaxed text-[#1E1E1E]/75 line-clamp-4">
          {event.summary}
        </p>

        {/* Swipe hint */}
        <button
          type="button"
          onClick={() => onOpenEvent(event)}
          className="flex items-center gap-1.5 mt-1 group"
        >
          <span className="text-xs font-semibold text-[#D97757] group-hover:underline">
            Ver narrativas
          </span>
          <ChevronLeft className="h-3.5 w-3.5 text-[#D97757] rotate-180 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </div>
  )
}
