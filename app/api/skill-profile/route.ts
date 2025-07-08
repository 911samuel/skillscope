import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

interface SkillProfileRequest {
  name: string
  email: string
  primarySkill: string
  experience: string
}

export async function POST(request: NextRequest) {
  try {
    const body: SkillProfileRequest = await request.json()

    // Validate required fields
    if (!body.name || !body.email || !body.primarySkill || !body.experience) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Validate experience length
    if (body.experience.length > 300) {
      return NextResponse.json({ error: "Experience description must be 300 characters or less" }, { status: 400 })
    }

    // Create the prompt for OpenAI
    const prompt = `
    Analyze the following user's skill profile and provide:
    1. A brief 2-3 sentence professional summary of their expertise
    2. Two specific, relevant skill areas they should consider exploring next

    User Profile:
    - Name: ${body.name}
    - Primary Skill: ${body.primarySkill}
    - Experience: ${body.experience}

    Please format your response as JSON with the following structure:
    {
      "summary": "Professional summary here",
      "suggestions": ["First skill suggestion", "Second skill suggestion"]
    }

    Make the suggestions specific, actionable, and complementary to their existing skill. Focus on skills that would enhance their career prospects and build upon their current expertise.
    `

    // Generate response using OpenAI
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: prompt,
      temperature: 0.7,
    })

    // Parse the JSON response
    let parsedResponse
    try {
      parsedResponse = JSON.parse(text)
    } catch (parseError) {
      console.error("Failed to parse OpenAI response:", parseError)
      return NextResponse.json({ error: "Failed to process AI response" }, { status: 500 })
    }

    // Validate the response structure
    if (
      !parsedResponse.summary ||
      !Array.isArray(parsedResponse.suggestions) ||
      parsedResponse.suggestions.length !== 2
    ) {
      console.error("Invalid response structure from OpenAI")
      return NextResponse.json({ error: "Invalid AI response format" }, { status: 500 })
    }

    return NextResponse.json({
      summary: parsedResponse.summary,
      suggestions: parsedResponse.suggestions,
    })
  } catch (error) {
    console.error("Error in skill-profile API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
