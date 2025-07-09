"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Brain } from "lucide-react"

interface ProfileSummaryCardProps {
  summary: string
}

export function ProfileSummaryCard({ summary }: ProfileSummaryCardProps) {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Brain className="h-5 w-5 mr-2 text-primary" />
          AI-Generated Profile Summary
        </CardTitle>
        <CardDescription>
          Based on your skills and experience, here&apos;s your professional profile
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="bg-gradient-background-card p-6 rounded-lg border-l-4 border-primary">
          <p className="text-foreground leading-relaxed text-lg">{summary}</p>
        </div>
      </CardContent>
    </Card>
  )
}
