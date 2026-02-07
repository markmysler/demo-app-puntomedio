"use client"

import React from "react"

import type { Narrative } from "@/lib/types"
import Image from "next/image"

interface NarrativePillProps {
  narrative: Narrative
  isActive: boolean
  onClick: () => void
  onSourcesClick: (e: React.MouseEvent) => void
}

export function NarrativePill({
  narrative,
  isActive,
  onClick,
  onSourcesClick,
}: NarrativePillProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-full whitespace-nowrap transition-all duration-200 shrink-0 ${
        isActive
          ? "bg-[#D97757] text-[#FFFBEA] shadow-lg shadow-[#D97757]/20"
          : "bg-[#1E1E1E]/5 text-[#1E1E1E]/70 hover:bg-[#1E1E1E]/10"
      }`}
    >
      <span className="text-sm font-semibold">{narrative.narrative_title}</span>
      {/* Source count badge - clicking this opens the sources dialog */}
      <button
        type="button"
        onClick={onSourcesClick}
        className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium transition-colors ${
          isActive
            ? "bg-[#FFFBEA]/20 text-[#FFFBEA] hover:bg-[#FFFBEA]/30"
            : "bg-[#1E1E1E]/10 text-[#1E1E1E]/60 hover:bg-[#1E1E1E]/15"
        }`}
        aria-label={`Ver ${narrative.sources.length} fuentes de ${narrative.narrative_title}`}
      >
        <span className="flex -space-x-1.5">
          {narrative.sources.slice(0, 3).map((source) => (
            <Image
              key={source.news_outlet_name}
              src={source.news_outlet_icon || "/placeholder.svg"}
              alt={source.news_outlet_name}
              width={16}
              height={16}
              className="rounded-full border border-current/20"
            />
          ))}
        </span>
        <span>{narrative.sources.length}</span>
      </button>
    </button>
  )
}
