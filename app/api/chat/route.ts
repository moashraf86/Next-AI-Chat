import { groq } from "@ai-sdk/groq";
import { streamText } from "ai";

export const maxDuration = 30;

export async function POST(request: Request) {
  const { messages, input } = await request.json();

  const result = streamText({
    model: groq("deepseek-r1-distill-llama-70b"),
    messages,
    prompt: input,
    system: "You are a helpful assistant.",
  });

  return result.toDataStreamResponse();
}
