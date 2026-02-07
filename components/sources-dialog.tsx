"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import type { Source } from "@/lib/types"
import Image from "next/image"

interface SourcesDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  narrativeTitle: string
  sources: Source[]
}

export function SourcesDialog({
  open,
  onOpenChange,
  narrativeTitle,
  sources,
}: SourcesDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm mx-auto rounded-2xl bg-[#FFFBEA] border-[#1E1E1E]/10">
        <DialogHeader>
          <DialogTitle className="text-[#1E1E1E] text-lg">
            Fuentes - {narrativeTitle}
          </DialogTitle>
          <DialogDescription className="text-[#1E1E1E]/60 text-sm">
            {sources.length} medio{sources.length !== 1 ? "s" : ""} cubriendo esta narrativa
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 mt-2">
          {sources.map((source) => (
            <div
              key={source.news_outlet_name}
              className="flex items-center gap-3 p-3 rounded-xl bg-[#1E1E1E]/5 hover:bg-[#1E1E1E]/8 transition-colors"
            >
              <Image
                src={source.news_outlet_icon || "/placeholder.svg"}
                alt={source.news_outlet_name}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-[#1E1E1E]">
                  {source.news_outlet_name}
                </span>
                <span className="text-xs text-[#1E1E1E]/50">
                  Medio de comunicación
                </span>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
