import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: NextRequest) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ error: "OPENAI_API_KEY is not configured on the server." }, { status: 500 });
  }
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  try {
    const { script, instruction } = await req.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "You are an expert speech writer. Rewrite or improve the provided speaking script based on the instruction. Keep it natural and speakable. Return only the improved script — no commentary.",
        },
        {
          role: "user",
          content: `Instruction: ${instruction}\n\nOriginal script:\n${script}\n\nRewritten script:`,
        },
      ],
      temperature: 0.7,
      max_tokens: 1500,
    });

    const optimized = completion.choices[0]?.message?.content ?? script;
    return NextResponse.json({ script: optimized });
  } catch (err) {
    console.error("Optimize error:", err);
    return NextResponse.json({ error: "Failed to optimize" }, { status: 500 });
  }
}
