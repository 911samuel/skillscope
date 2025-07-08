"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  primarySkill: string;
  experience: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  primarySkill?: string;
  experience?: string;
}

export function SkillForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    primarySkill: "",
    experience: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.primarySkill.trim())
      newErrors.primarySkill = "Primary skill is required";
    if (!formData.experience.trim()) {
      newErrors.experience = "Experience description is required";
    } else if (formData.experience.length > 300) {
      newErrors.experience =
        "Experience description must be 300 characters or less";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/skill-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to analyze skill profile");

      const result = await response.json();
      sessionStorage.setItem(
        "skillProfileResult",
        JSON.stringify({ ...result, userData: formData })
      );
      router.push("/results");
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Skill Profile Form</CardTitle>
        <CardDescription>
          Fill out the form below to get your personalized skill analysis and
          recommendations.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div>
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className={errors.name ? "border-red-500 focus:ring-red-500" : ""}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
              required
            />
            {errors.name && (
              <p id="name-error" className="text-sm text-red-600 mt-1">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className={
                errors.email ? "border-red-500 focus:ring-red-500" : ""
              }
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              required
            />
            {errors.email && (
              <p id="email-error" className="text-sm text-red-600 mt-1">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="primarySkill">Primary Skill *</Label>
            <Input
              id="primarySkill"
              type="text"
              placeholder="e.g., JavaScript, Data Analysis, Project Management"
              value={formData.primarySkill}
              onChange={(e) =>
                handleInputChange("primarySkill", e.target.value)
              }
              className={
                errors.primarySkill ? "border-red-500 focus:ring-red-500" : ""
              }
              aria-invalid={!!errors.primarySkill}
              aria-describedby={errors.primarySkill ? "skill-error" : undefined}
              required
            />
            {errors.primarySkill && (
              <p id="skill-error" className="text-sm text-red-600 mt-1">
                {errors.primarySkill}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="experience">Experience Description *</Label>
            <Textarea
              id="experience"
              placeholder="Briefly describe your experience (max 300 characters)"
              value={formData.experience}
              onChange={(e) => handleInputChange("experience", e.target.value)}
              className={`min-h-[100px] ${
                errors.experience ? "border-red-500 focus:ring-red-500" : ""
              }`}
              maxLength={300}
              aria-invalid={!!errors.experience}
              aria-describedby={errors.experience ? "exp-error" : undefined}
              required
            />
            <div className="flex justify-between items-center mt-1">
              {errors.experience && (
                <p id="exp-error" className="text-sm text-red-600">
                  {errors.experience}
                </p>
              )}
              <p className="text-sm text-gray-500">
                {formData.experience.length}/300
              </p>
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
  );
}
