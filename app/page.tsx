import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Brain, Target, Zap } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">SkillScope</span>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">
              How it Works
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-12 md:py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">Smart Skill Profiler</h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-4">Know Your Strengths, Unlock New Opportunities</p>
          <p className="text-lg text-gray-500 mb-8 max-w-2xl mx-auto">
            A modern AI-powered web application that analyzes your skill profile and suggests new areas to explore.
            Discover your potential and chart your professional growth path.
          </p>

          <Link href="/skill-check">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Start Your Skill Check
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>

        {/* Features Preview */}
        <div id="features" className="mt-20 grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">AI-Powered Analysis</h3>
            <p className="text-gray-600">
              Advanced AI analyzes your skills and experience to provide personalized insights
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Smart Suggestions</h3>
            <p className="text-gray-600">Get tailored recommendations for new skill areas to expand your expertise</p>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Instant Results</h3>
            <p className="text-gray-600">
              Receive your professional profile summary and growth opportunities in seconds
            </p>
          </div>
        </div>

        {/* How it Works */}
        <div id="how-it-works" className="mt-20 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4">
                1
              </div>
              <h3 className="text-lg font-semibold mb-2">Share Your Skills</h3>
              <p className="text-gray-600">Tell us about your primary skill and experience</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4">
                2
              </div>
              <h3 className="text-lg font-semibold mb-2">AI Analysis</h3>
              <p className="text-gray-600">Our AI analyzes your profile and identifies opportunities</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4">
                3
              </div>
              <h3 className="text-lg font-semibold mb-2">Get Insights</h3>
              <p className="text-gray-600">Receive personalized recommendations and growth paths</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Brain className="h-6 w-6" />
            <span className="text-xl font-bold">SkillScope</span>
          </div>
          <p className="text-gray-400 mb-2">
            Built as part of the technical evaluation for Muula Technologies Group, Inc.
          </p>
          <p className="text-sm text-gray-500">Powered by AI • Made with Next.js & Tailwind CSS</p>
        </div>
      </footer>
    </div>
  )
}
