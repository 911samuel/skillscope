import { type NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

// Use OpenRouter endpoint with your free API key
const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

interface SkillProfileRequest {
  name: string;
  email: string;
  primarySkill: string;
  experience: string;
}

export async function POST(request: NextRequest) {
  try {
    if (!process.env.OPENROUTER_API_KEY) {
      console.error("OpenRouter API key is not configured");
      return NextResponse.json(
        { error: "OpenRouter API key is not configured" },
        { status: 500 }
      );
    }

    const body: SkillProfileRequest = await request.json();

    if (!body.name || !body.email || !body.primarySkill || !body.experience) {
      return NextResponse.json(
        {
          error:
            "All fields (name, email, primarySkill, experience) are required",
        },
        { status: 400 }
      );
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
      model: "mistralai/mistral-7b-instruct:free",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
    });

    const text = response.choices[0].message?.content || "";

    let parsedResponse;
    try {
      const cleanText = text.replace(/```json\n?|```|\n/g, "").trim();
      parsedResponse = JSON.parse(cleanText);
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError);
      console.error("Raw AI response:", text);

      return NextResponse.json({
        analysis: {
          summary: "Unable to process the full analysis at this time.",
          strengths: ["Experience in " + body.primarySkill],
          areasForImprovement: ["Continuous learning and skill development"],
          recommendedLearningPaths: [
            "Advanced " + body.primarySkill + " techniques",
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
  } catch (error) {
    console.error("Error in skill profile API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
