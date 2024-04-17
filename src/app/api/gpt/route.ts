import { NextResponse, NextRequest } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.API_KEY
});

export async function GET(request: NextRequest) {
  const userInput = request.nextUrl.searchParams.get("input");
  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: userInput }],
      model: "gpt-3.5-turbo"
    });

    return NextResponse.json({
      message: completion.choices[0].message.content,
      status: 200
    });
  } catch (error) {
    console.error("error", error);
    return NextResponse.json({ message: "Error " + error, status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const chatGPTResponse = await request.text();
  try {
    const embedding = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: chatGPTResponse
    });
    return NextResponse.json({
      message: "post response",
      embedding: embedding.data[0].embedding,
      status: 200
    });
  } catch (error) {
    console.error("error", error);
    return NextResponse.json({ message: "Error " + error, status: 500 });
  }
}
