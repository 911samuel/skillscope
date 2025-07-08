import { type NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface SkillProfileRequest {
  name: string;
  email: string;
  primarySkill: string;
  experience: string;
}

export async function POST(request: NextRequest) {
  try {
    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      console.error("OpenAI API key is not configured");
      return NextResponse.json(
        { error: "OpenAI API key is not configured" },
        { status: 500 }
      );
    }

    const body: SkillProfileRequest = await request.json();

    // Validate required fields
    if (!body.name || !body.email || !body.primarySkill || !body.experience) {
      return NextResponse.json(
        {
          error:
            "All fields (name, email, primarySkill, experience) are required",
        },
        { status: 400 }
      );
    }

    // In local development, provide mock response to avoid quota consumption
    if (process.env.NODE_ENV === "development") {
      return NextResponse.json({
        analysis: {
          summary: "Mock analysis summary for local testing.",
          strengths: [`Good foundation in ${body.primarySkill}`],
          areasForImprovement: ["Time management", "Team collaboration"],
          recommendedLearningPaths: [
            `Deep dive into advanced ${body.primarySkill}`,
            "Explore system design concepts",
          ],
          careerAdvice:
            "Focus on building a portfolio of projects that demonstrate practical use of your primary skill.",
        },
        timestamp: new Date().toISOString(),
        user: {
          name: body.name,
          email: body.email,
          primarySkill: body.primarySkill,
        },
      });
    }

    const prompt = `
    Analyze the following skill profile and provide personalized growth opportunities and recommendations:

    Name: ${body.name}
    Email: ${body.email}
    Primary Skill: ${body.primarySkill}
    Experience Description: ${body.experience}

    Provide your analysis in JSON format:
    {
      "summary": "Brief summary of the skill profile",
      "strengths": ["list of strengths"],
      "areasForImprovement": ["list of areas for improvement"],
      "recommendedLearningPaths": ["list of recommended learning paths or skills to develop"],
      "careerAdvice": "General career advice based on the profile"
    }
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-2024-08-06",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
    });

    const text = response.choices[0].message?.content || "";

    let parsedResponse;
    try {
      // Clean up markdown artifacts
      const cleanText = text.replace(/```json\n?|```\n?/g, "").trim();
      parsedResponse = JSON.parse(cleanText);
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError);
      console.error("Raw AI response:", text);

      // Fallback if AI output is malformed
      return NextResponse.json({
        analysis: {
          summary: "Unable to process the full analysis at this time.",
          strengths: [`Experience in ${body.primarySkill}`],
          areasForImprovement: ["Continuous learning and skill development"],
          recommendedLearningPaths: [
            `Advanced ${body.primarySkill} techniques`,
          ],
          careerAdvice:
            "Focus on building expertise in your primary skill while exploring related technologies.",
        },
        timestamp: new Date().toISOString(),
        user: {
          name: body.name,
          email: body.email,
          primarySkill: body.primarySkill,
        },
      });
    }

    return NextResponse.json({
      analysis: parsedResponse,
      timestamp: new Date().toISOString(),
      user: {
        name: body.name,
        email: body.email,
        primarySkill: body.primarySkill,
      },
    });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error in skill profile API:", error);

    // Handle OpenAI quota / rate limit explicitly
    if (
      error.statusCode === 429 ||
      (error.response && error.response.status === 429)
    ) {
      return NextResponse.json(
        {
          error:
            "OpenAI quota exceeded or rate limited. Please try again later.",
        },
        { status: 429 }
      );
    }

    if (error instanceof Error) {
      return NextResponse.json(
        { error: `Server error: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
