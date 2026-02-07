"use client"

import React from "react"

import { useState, useRef, useCallback } from "react"
import { ArrowLeft } from "lucide-react"
import type { NewsEvent } from "@/lib/types"
import { NarrativePill } from "./narrative-pill"
import { SourcesDialog } from "./sources-dialog"
import Image from "next/image"

interface EventPageProps {
  event: NewsEvent
  onBack: () => void
  isVisible: boolean
}

export function EventPage({ event, onBack, isVisible }: EventPageProps) {
  const [activeNarrativeIndex, setActiveNarrativeIndex] = useState(0)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogNarrativeIndex, setDialogNarrativeIndex] = useState(0)
  const touchStartRef = useRef<{ x: number; y: number } | null>(null)

  const activeNarrative = event.narratives[activeNarrativeIndex]

  const handleSourcesClick = useCallback(
    (index: number) => (e: React.MouseEvent) => {
      e.stopPropagation()
      setDialogNarrativeIndex(index)
      setDialogOpen(true)
    },
    []
  )

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    }
  }, [])

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (!touchStartRef.current) return
      const deltaX = e.changedTouches[0].clientX - touchStartRef.current.x
      // Swipe right to go back
      if (deltaX > 80) {
        onBack()
      }
      touchStartRef.current = null
    },
    [onBack]
  )

  return (
    <div
      className={`fixed inset-0 z-40 bg-[#FFFBEA] flex flex-col transition-transform duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isVisible ? "translate-x-0" : "translate-x-full"
      }`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Header with image */}
      <div className="relative h-[35vh] min-h-[220px] shrink-0">
        <Image
          src={event.img_url || "/placeholder.svg"}
          alt={event.title}
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1E1E1E]/60 via-transparent to-[#FFFBEA]" />

        {/* Back button */}
        <button
          type="button"
          onClick={onBack}
          className="absolute top-12 left-4 z-10 p-2 rounded-full bg-[#1E1E1E]/30 backdrop-blur-sm hover:bg-[#1E1E1E]/50 transition-colors"
          aria-label="Volver"
        >
          <ArrowLeft className="h-5 w-5 text-[#FFFBEA]" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col -mt-8 relative z-10 overflow-hidden">
        {/* Event title */}
        <div className="px-5 pb-4">
          <h1 className="text-xl font-bold text-[#1E1E1E] leading-tight text-balance">
            {event.title}
          </h1>
          <p className="text-xs text-[#1E1E1E]/50 mt-2 font-medium">
            {event.sources.length} fuentes &middot; {event.narratives.length} narrativas
          </p>
        </div>

        {/* Narrative pills - horizontally scrollable */}
        <div className="px-5 pb-4 shrink-0">
          <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
            {event.narratives.map((narrative, index) => (
              <NarrativePill
                key={narrative.narrative_title}
                narrative={narrative}
                isActive={index === activeNarrativeIndex}
                onClick={() => setActiveNarrativeIndex(index)}
                onSourcesClick={handleSourcesClick(index)}
              />
            ))}
          </div>
        </div>

        {/* Active narrative content */}
        <div className="flex-1 overflow-y-auto px-5 pb-24">
          {activeNarrative && (
            <div className="animate-fade-in">
              {/* Narrative card */}
              <div className="bg-[#1E1E1E]/[0.03] rounded-2xl p-5">
                <h3 className="text-lg font-bold text-[#1E1E1E] mb-3">
                  {activeNarrative.narrative_title}
                </h3>
                <p className="text-sm leading-relaxed text-[#1E1E1E]/75">
                  {activeNarrative.narrative_summary}
                </p>

                {/* Sources for this narrative */}
                <div className="mt-5 pt-4 border-t border-[#1E1E1E]/10">
                  <p className="text-xs font-semibold text-[#1E1E1E]/50 uppercase tracking-wider mb-3">
                    Fuentes de esta narrativa
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {activeNarrative.sources.map((source) => (
                      <div
                        key={source.news_outlet_name}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FFFBEA] border border-[#1E1E1E]/10"
                      >
                        <Image
                          src={source.news_outlet_icon || "/placeholder.svg"}
                          alt={source.news_outlet_name}
                          width={20}
                          height={20}
                          className="rounded-full"
                        />
                        <span className="text-xs font-medium text-[#1E1E1E]/70">
                          {source.news_outlet_name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Summary context */}
              <div className="mt-4 p-4 rounded-2xl border border-[#D97757]/20 bg-[#D97757]/5">
                <p className="text-xs font-semibold text-[#D97757] mb-2 uppercase tracking-wider">
                  Contexto del evento
                </p>
                <p className="text-sm leading-relaxed text-[#1E1E1E]/70">
                  {event.summary}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sources dialog */}
      {event.narratives[dialogNarrativeIndex] && (
        <SourcesDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          narrativeTitle={event.narratives[dialogNarrativeIndex].narrative_title}
          sources={event.narratives[dialogNarrativeIndex].sources}
        />
      )}
    </div>
  )
}
