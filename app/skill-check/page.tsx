"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"

interface FormData {
  name: string
  email: string
  primarySkill: string
  experience: string
}

interface FormErrors {
  name?: string
  email?: string
  primarySkill?: string
  experience?: string
}

export default function SkillCheckPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    primarySkill: "",
    experience: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isLoading, setIsLoading] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.primarySkill.trim()) {
      newErrors.primarySkill = "Primary skill is required"
    }

    if (!formData.experience.trim()) {
      newErrors.experience = "Experience description is required"
    } else if (formData.experience.length > 300) {
      newErrors.experience = "Experience description must be 300 characters or less"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/skill-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to analyze skill profile")
      }

      const result = await response.json()

      // Store results in sessionStorage for the results page
      sessionStorage.setItem(
        "skillProfileResult",
        JSON.stringify({
          ...result,
          userData: formData,
        }),
      )

      router.push("/results")
    } catch (error) {
      console.error("Error:", error)
      alert("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
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

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Tell Us About Your Skills</h1>
          <p className="text-lg text-gray-600">
            Share your expertise and let our AI analyze your profile to suggest new growth opportunities.
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Skill Profile Form</CardTitle>
            <CardDescription>
              Fill out the form below to get your personalized skill analysis and recommendations.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="primarySkill">Primary Skill *</Label>
                <Input
                  id="primarySkill"
                  type="text"
                  placeholder="e.g., JavaScript, Data Analysis, Project Management"
                  value={formData.primarySkill}
                  onChange={(e) => handleInputChange("primarySkill", e.target.value)}
                  className={errors.primarySkill ? "border-red-500" : ""}
                />
                {errors.primarySkill && <p className="text-sm text-red-600">{errors.primarySkill}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Experience Description *</Label>
                <Textarea
                  id="experience"
                  placeholder="Briefly describe your experience with this skill (max 300 characters)"
                  value={formData.experience}
                  onChange={(e) => handleInputChange("experience", e.target.value)}
                  className={`min-h-[100px] ${errors.experience ? "border-red-500" : ""}`}
                  maxLength={300}
                />
                <div className="flex justify-between items-center">
                  <div>{errors.experience && <p className="text-sm text-red-600">{errors.experience}</p>}</div>
                  <p className="text-sm text-gray-500">{formData.experience.length}/300 characters</p>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing Your Skills...
                  </>
                ) : (
                  "Analyze My Skills"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
