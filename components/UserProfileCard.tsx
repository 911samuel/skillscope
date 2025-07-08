"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User } from "lucide-react"

interface UserProfileCardProps {
  name: string
  primarySkill: string
  timestamp: string
}

export function UserProfileCard({ name, primarySkill, timestamp }: UserProfileCardProps) {
  return (
    <Card className="shadow-lg h-fit">
      <CardHeader>
        <CardTitle className="flex items-center">
          <User className="h-5 w-5 mr-2 text-blue-600" />
          Profile Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm font-medium text-gray-500">Name</p>
          <p className="text-lg font-semibold text-gray-900">{name}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Primary Skill</p>
          <p className="text-lg font-semibold text-blue-600">{primarySkill}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Timestamp</p>
          <p className="text-sm text-gray-700 leading-relaxed">{new Date(timestamp).toLocaleString()}</p>
        </div>
      </CardContent>
    </Card>
  )
}
