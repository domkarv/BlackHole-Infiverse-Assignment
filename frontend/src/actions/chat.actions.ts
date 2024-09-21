import { Message } from "../types/message";

export const getChatResponce = async ({
  prompt,
  history,
}: {
  prompt: string;
  history: Omit<Message, "id">[];
}) => {
  const response = await fetch("http://localhost:3000/chat", {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({ prompt, history }),
  });

  const data = await response.json();

  return data.text;
};
