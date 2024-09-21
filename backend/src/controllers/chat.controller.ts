import type { Request, Response } from "express";

export const chatController = async (req: Request, res: Response) => {
  return res.json({ msg: "backend routes ready" });
};
