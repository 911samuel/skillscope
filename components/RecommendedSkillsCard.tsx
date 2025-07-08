"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Lightbulb } from "lucide-react"

interface RecommendedSkillsCardProps {
  recommendedLearningPaths: string[]
}

export function RecommendedSkillsCard({ recommendedLearningPaths }: RecommendedSkillsCardProps) {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Lightbulb className="h-5 w-5 mr-2 text-yellow-600" />
          Recommended Skill Areas
        </CardTitle>
        <CardDescription>New areas to explore based on your current expertise</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          {recommendedLearningPaths.map((suggestion, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-lg border border-green-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start">
                <div className="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-1 flex-shrink-0">
                  {index + 1}
                </div>
                <p className="text-gray-800 leading-relaxed">{suggestion}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
