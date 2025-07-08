// Create a file called check-models.js in your project root
// Run with: node check-models.js

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function checkModels() {
  try {
    const models = await openai.models.list();
    console.log("Available models:");
    models.data.forEach((model) => {
      if (model.id.includes("gpt")) {
        console.log(`- ${model.id}`);
      }
    });
  } catch (error) {
    console.error("Error fetching models:", error);
  }
}

checkModels();
