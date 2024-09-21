export interface Message {
  id: number;
  role: "user" | "model";
  parts: [
    {
      text: string;
    }
  ];
}
