import type { Request, Response } from "express";
import { generateChatResponce } from "../lib/chat";

export const chatController = async (req: Request, res: Response) => {
  const { prompt } = await req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const response = await generateChatResponce({ prompt });
    return res.status(200).json({ success: true, text: response });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "An error occurred while generating the response" });
  }
};
