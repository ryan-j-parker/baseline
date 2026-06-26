import Anthropic from "@anthropic-ai/sdk";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { messages, systemPrompt } = req.body as {
      messages: { role: "user" | "assistant"; content: string }[];
      systemPrompt: string;
    };

    const response = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1000,
      system: systemPrompt,
      messages,
    });

    const text = response.content[0].type === "text"
      ? response.content[0].text
      : "Sorry, I couldn't get an answer.";

    return res.status(200).json({ text });
  } catch (error) {
    console.error("API error:", error);
    return res.status(500).json({ error: "Failed to get answer" });
  }
}