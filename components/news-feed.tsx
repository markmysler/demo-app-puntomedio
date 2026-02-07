"use client"

import React from "react"

import { useRef, useCallback, useEffect, useState } from "react"
import type { NewsEvent } from "@/lib/types"
import { EventCard } from "./event-card"

interface NewsFeedProps {
  events: NewsEvent[]
  onOpenEvent: (event: NewsEvent) => void
}

export function NewsFeed({ events, onOpenEvent }: NewsFeedProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const touchStartRef = useRef<{ x: number; y: number } | null>(null)
  const isSwipingHorizontalRef = useRef(false)

  // Track which card is in view
  const handleScroll = useCallback(() => {
    const container = containerRef.current
    if (!container) return
    const scrollTop = container.scrollTop
    const cardHeight = container.clientHeight
    const index = Math.round(scrollTop / cardHeight)
    setCurrentIndex(index)
  }, [])

  // Handle horizontal swipe to open event detail
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    }
    isSwipingHorizontalRef.current = false
  }, [])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!touchStartRef.current) return
    const deltaX = e.touches[0].clientX - touchStartRef.current.x
    const deltaY = e.touches[0].clientY - touchStartRef.current.y

    // If horizontal movement is dominant, mark as horizontal swipe
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
      isSwipingHorizontalRef.current = true
    }
  }, [])

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (!touchStartRef.current) return
      const deltaX =
        e.changedTouches[0].clientX - touchStartRef.current.x

      // Swipe left to open event (right-to-left)
      if (isSwipingHorizontalRef.current && deltaX < -60) {
        const event = events[currentIndex]
        if (event) {
          onOpenEvent(event)
        }
      }
      touchStartRef.current = null
      isSwipingHorizontalRef.current = false
    },
    [currentIndex, events, onOpenEvent]
  )

  // Scroll indicator dots
  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    container.addEventListener("scroll", handleScroll, { passive: true })
    return () => container.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  return (
    <div className="relative h-full w-full">
      <div
        ref={containerRef}
        className="h-full w-full overflow-y-scroll snap-y snap-mandatory hide-scrollbar"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {events.map((event) => (
          <div
            key={event.id}
            className="h-full w-full snap-start snap-always"
          >
            <EventCard event={event} onOpenEvent={onOpenEvent} />
          </div>
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-1.5 z-10">
        {events.map((event, index) => (
          <div
            key={event.id}
            className={`w-1.5 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "h-6 bg-[#D97757]"
                : "h-1.5 bg-[#FFFBEA]/50"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
