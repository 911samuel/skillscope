"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Brain, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SkillProfileResult } from "../../types/formTypes"
import { UserProfileCard } from "../../components/UserProfileCard"
import { ProfileSummaryCard } from "../../components/ProfileSummaryCard"
import { RecommendedSkillsCard } from "../../components/RecommendedSkillsCard"
import { ActionButtons } from "../../components/ActionButtons"
import { CallToActionSection } from "../../components/CallToActionSection"

export default function ResultsPage() {
  const router = useRouter()
  const [result, setResult] = useState<SkillProfileResult | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedResult = sessionStorage.getItem("skillProfileResult")
    if (storedResult) {
      setResult(JSON.parse(storedResult))
    } else {
      router.push("/skill-check")
    }
    setIsLoading(false)
  }, [router])

  const handleRestart = () => {
    sessionStorage.removeItem("skillProfileResult")
    router.push("/skill-check")
  }

  const shortSummary =
    result?.analysis.summary && result.analysis.summary.length > 120
      ? result.analysis.summary.slice(0, 120) + "..."
      : result?.analysis.summary || ""

  const handleShare = `https://x.com/intent/tweet?text=${encodeURIComponent(
    `My SkillScope Summary: ${shortSummary}\nRecommended: ${result?.analysis.recommendedLearningPaths.join(
      ", "
    )}`
  )}`

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Brain className="h-12 w-12 text-blue-600 animate-pulse mx-auto mb-4" />
          <p className="text-lg text-gray-600">Loading your results...</p>
        </div>
      </div>
    )
  }

  if (!result) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <Brain className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">SkillScope</span>
          </Link>
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Your Skill Profile Results</h1>
          <p className="text-lg text-gray-600">Here&apos;s what our AI discovered about your skills and growth opportunities.</p>
        </div>

        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <UserProfileCard name={result.user.name} primarySkill={result.user.primarySkill} timestamp={result.timestamp} />
          </div>

          <div className="lg:col-span-2 space-y-6">
            <ProfileSummaryCard summary={result.analysis.summary} />
            <RecommendedSkillsCard recommendedLearningPaths={result.analysis.recommendedLearningPaths} />
          </div>
        </div>

        <ActionButtons onRestart={handleRestart} onShare={() => window.open(handleShare, "_blank")} />

        <CallToActionSection />
      </main>
    </div>
  )
}
