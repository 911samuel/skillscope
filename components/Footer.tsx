"use client"

import React from "react"
import { Brain } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-card text-card-foreground py-8 mt-20">
      <div className="container mx-auto px-4 text-center">
        <div className="flex items-center justify-center space-x-2 mb-4 text-primary">
          <Brain className="h-6 w-6" />
          <span className="text-xl font-bold">SkillScope</span>
        </div>
        <p className="text-muted-foreground mb-2">
          Built as part of the technical evaluation for Muula Technologies Group, Inc.
        </p>
        <p className="text-sm text-muted-foreground">Powered by AI • Made with Next.js & Tailwind CSS</p>
      </div>
    </footer>
  )
}
