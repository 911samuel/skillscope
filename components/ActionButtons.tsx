"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { RotateCcw, Share2 } from "lucide-react"

interface ActionButtonsProps {
  onRestart: () => void
  onShare: () => void
}

export function ActionButtons({ onRestart, onShare }: ActionButtonsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-6 justify-center mt-12 items-center">
      <Button
        onClick={onRestart}
        variant="outline"
        size="lg"
        className="px-8 py-3 text-lg border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent"
      >
        <RotateCcw className="h-5 w-5 mr-2" />
        Analyze Another Skill
      </Button>
      <Button
        onClick={onShare}
        size="lg"
        className="px-8 py-3 text-lg bg-green-600 hover:bg-green-700 text-white"
      >
        <Share2 className="h-5 w-5 mr-2" />
        Share Results
      </Button>
    </div>
  )
}
