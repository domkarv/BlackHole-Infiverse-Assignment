import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";

export async function generateChatResponce({
  prompt,
  history,
}: {
  prompt: string;
  history: {
    role: "user" | "model";
    parts: [
      {
        text: string;
      }
    ];
  }[];
}) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  const model = genAI.getGenerativeModel({
    model: "models/gemini-1.5-flash-latest",
  });

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 1000,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history,
  });

  const result = await chat.sendMessage(prompt);
  return result.response.text();
}
