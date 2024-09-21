import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";

const model = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function generateChatResponce({ prompt }: { prompt: string }) {
  const { text } = await generateText({
    model: model("models/gemini-1.5-flash-latest", {
      safetySettings: [
        {
          category: "HARM_CATEGORY_HATE_SPEECH",
          threshold: "BLOCK_LOW_AND_ABOVE",
        },
      ],
    }),
    prompt,
  });

  return text;
}
