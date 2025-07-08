"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Brain,
  ArrowLeft,
  RotateCcw,
  Lightbulb,
  User,
  Share2,
} from "lucide-react";
import Link from "next/link";

interface SkillProfileResult {
  analysis: {
    summary: string;
    strengths: string[];
    areasForImprovement: string[];
    recommendedLearningPaths: string[];
    careerAdvice: string;
  };
  timestamp: string;
  user: {
    name: string;
    email: string;
    primarySkill: string;
  };
}

export default function ResultsPage() {
  const router = useRouter();
  const [result, setResult] = useState<SkillProfileResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedResult = sessionStorage.getItem("skillProfileResult");
    if (storedResult) {
      setResult(JSON.parse(storedResult));
    } else {
      router.push("/skill-check");
    }
    setIsLoading(false);
  }, [router]);

  const handleRestart = () => {
    sessionStorage.removeItem("skillProfileResult");
    router.push("/skill-check");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Brain className="h-12 w-12 text-blue-600 animate-pulse mx-auto mb-4" />
          <p className="text-lg text-gray-600">Loading your results...</p>
        </div>
      </div>
    );
  }

  if (!result) {
    return null;
  }

  // Short summary for social
  const shortSummary =
    result.analysis.summary.length > 120
      ? result.analysis.summary.slice(0, 120) + "..."
      : result.analysis.summary;

  const handleShare = `https://x.com/intent/tweet?text=${encodeURIComponent(
    `My SkillScope Summary: ${shortSummary}\nRecommended: ${result.analysis.recommendedLearningPaths.join(
      ", "
    )}`
  )}`;
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
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
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Your Skill Profile Results
          </h1>
          <p className="text-lg text-gray-600">
            Here&apos;s what our AI discovered about your skills and growth
            opportunities.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3">
          {/* User Info Card */}
          <div className="lg:col-span-1">
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
                  <p className="text-lg font-semibold text-gray-900">
                    {result.user.name}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Primary Skill
                  </p>
                  <p className="text-lg font-semibold text-blue-600">
                    {result.user.primarySkill}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Timestamp</p>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {new Date(result.timestamp).toLocaleString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Cards */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Summary */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="h-5 w-5 mr-2 text-purple-600" />
                  AI-Generated Profile Summary
                </CardTitle>
                <CardDescription>
                  Based on your skills and experience, here&apos;s your
                  professional profile
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg border-l-4 border-purple-500">
                  <p className="text-gray-800 leading-relaxed text-lg">
                    {result.analysis.summary}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Skill Suggestions */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lightbulb className="h-5 w-5 mr-2 text-yellow-600" />
                  Recommended Skill Areas
                </CardTitle>
                <CardDescription>
                  New areas to explore based on your current expertise
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {(result.analysis.recommendedLearningPaths || []).map(
                    (suggestion, index) => (
                      <div
                        key={index}
                        className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-lg border border-green-200 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start">
                          <div className="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-1 flex-shrink-0">
                            {index + 1}
                          </div>
                          <p className="text-gray-800 leading-relaxed">
                            {suggestion}
                          </p>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center mt-12 items-center">
          <Button
            onClick={handleRestart}
            variant="outline"
            size="lg"
            className="px-8 py-3 text-lg border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent"
          >
            <RotateCcw className="h-5 w-5 mr-2" />
            Analyze Another Skill
          </Button>
          <Button
            onClick={() => window.open(handleShare, "_blank")}
            size="lg"
            className="px-8 py-3 text-lg bg-green-600 hover:bg-green-700 text-white"
          >
            <Share2 className="h-5 w-5 mr-2" />
            Share Results
          </Button>
        </div>
        <div className="text-center mt-12 p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Ready to Level Up Your Skills?
          </h3>
          <p className="text-gray-600 mb-4">
            Use these insights to guide your professional development and unlock
            new opportunities.
          </p>
          <Link href="/skill-check">
            <Button variant="outline">Try Another Skill Assessment</Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
