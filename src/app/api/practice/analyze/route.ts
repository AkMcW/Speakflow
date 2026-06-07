import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: NextRequest) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ error: "OPENAI_API_KEY is not configured on the server." }, { status: 500 });
  }
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  try {
    const { transcript, script, scenario } = await req.json();

    if (!transcript || transcript.trim().length < 5) {
      return NextResponse.json({ error: "Transcript too short to analyze. Please record a longer response." }, { status: 400 });
    }

    const prompt = `You are an expert speech coach and communication trainer. Analyze this speech transcript and provide detailed feedback.

${script ? `Original script:\n${script}\n\n` : ""}Spoken transcript:\n${transcript}

Scenario: ${scenario || "General speech practice"}

Provide a JSON response with this exact structure:
{
  "scores": {
    "pronunciation": <number 0-100>,
    "fluency": <number 0-100>,
    "confidence": <number 0-100>,
    "structure": <number 0-100>,
    "vocabulary": <number 0-100>,
    "pace": <number 0-100>,
    "overall": <number 0-100>
  },
  "fillerWords": {
    "count": <number>,
    "words": [<list of detected filler words>]
  },
  "wpm": <estimated words per minute as number>,
  "strengths": [<3 specific strengths as strings>],
  "improvements": [<3 specific areas to improve as strings>],
  "aiFeedback": "<2-3 sentence coaching summary>",
  "bandScore": <IELTS estimated band 1-9, only if relevant, otherwise null>
}

Be specific, constructive, and encouraging. Base scores on the actual transcript quality.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.4,
      response_format: { type: "json_object" },
    });

    const analysis = JSON.parse(completion.choices[0]?.message?.content ?? "{}");
    return NextResponse.json(analysis);
  } catch (err) {
    console.error("Analysis error:", err);
    return NextResponse.json({ error: "Analysis failed" }, { status: 500 });
  }
}
