"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Brain, ArrowLeft, Loader2 } from "lucide-react";
import { TextInput } from "@/components/TextInput";
import { TextAreaInput } from "@/components/TextAreaInput";
import { FormData, FormErrors } from "../../types/types";
import { validateForm } from "@/hooks/useSkillCheckValidation";

export default function SkillCheckPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    primarySkill: "",
    experience: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = validateForm(formData);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/skill-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze skill profile");
      }

      const result = await response.json();

      // Store results in sessionStorage for the results page
      sessionStorage.setItem(
        "skillProfileResult",
        JSON.stringify({
          ...result,
          userData: formData,
        })
      );

      router.push("/results");
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--gradient-background)" }}
    >
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <Brain className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">SkillScope</span>
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
      <main className="mx-auto px-4 py-8 max-w-3xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Tell Us About Your Skills
          </h1>
          <p className="text-lg">
            Share your expertise and let our AI analyze your profile to suggest
            new growth opportunities.
          </p>
        </div>

        <Card className="card shadow-lg">
          <CardHeader className="p-4">
            <CardTitle className="text-xl">Skill Profile Form</CardTitle>
            <CardDescription>
              Fill out the form below to get your personalized skill analysis
              and recommendations.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <form onSubmit={handleSubmit} className="space-y-4">
              <TextInput
                id="name"
                label="Full Name *"
                placeholder="Enter your full name"
                value={formData.name}
                error={errors.name}
                onChange={(value) => handleInputChange("name", value)}
              />
              <TextInput
                id="email"
                label="Email Address *"
                type="email"
                placeholder="Enter your email address"
                value={formData.email}
                error={errors.email}
                onChange={(value) => handleInputChange("email", value)}
              />
              <TextInput
                id="primarySkill"
                label="Primary Skill *"
                placeholder="e.g., JavaScript, Data Analysis, Project Management"
                value={formData.primarySkill}
                error={errors.primarySkill}
                onChange={(value) => handleInputChange("primarySkill", value)}
              />
              <TextAreaInput
                id="experience"
                label="Experience Description *"
                placeholder="Briefly describe your experience with this skill (max 300 characters)"
                value={formData.experience}
                error={errors.experience}
                maxLength={300}
                onChange={(value) => handleInputChange("experience", value)}
              />
              <Button
                type="submit"
                className="btn btn-primary w-full py-3 text-lg"
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
  );
}
