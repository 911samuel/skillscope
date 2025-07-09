"use client"

import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CallToActionSection() {
  return (
    <div className="text-center mt-12 p-6 bg-card rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-foreground mb-2">Ready to Level Up Your Skills?</h3>
      <p className="text-muted-foreground mb-4">
        Use these insights to guide your professional development and unlock new opportunities.
      </p>
      <Link href="/skill-check">
        <Button variant="outline" className="btn btn-outline">Try Another Skill Assessment</Button>
      </Link>
    </div>
  )
}
