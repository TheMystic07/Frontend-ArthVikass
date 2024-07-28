// import { openai } from '@ai-sdk/openai';
// @ts-nocheck
import { google } from "@ai-sdk/google"
import { convertToCoreMessages, streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req) {
  const { messages } = await req.json();

  const result = await streamText({
    // model: openai('gpt-4-turbo'),
    model: google("models/gemini-1.5-pro-latest"),
    system: 'You are a helpful assistant.',
    messages: convertToCoreMessages(messages),
  });

  return result.toAIStreamResponse();
}
