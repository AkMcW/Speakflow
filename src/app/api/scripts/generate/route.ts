import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: NextRequest) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ error: "OPENAI_API_KEY is not configured on the server." }, { status: 500 });
  }
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  try {
    const { scenario, goal, audience, tone, duration, style, language } = await req.json();

    const durationMap: Record<string, string> = {
      "30s": "30 seconds (about 75 words)",
      "1min": "1 minute (about 150 words)",
      "2min": "2 minutes (about 300 words)",
      "3min": "3 minutes (about 450 words)",
      "5min": "5 minutes (about 750 words)",
      "10min": "10 minutes (about 1500 words)",
    };

    const styleInstruction = style
      ? `\n\nIMPORTANT: Write this script in the speaking style of ${style}. Capture their signature communication patterns, sentence structure, rhetorical devices, and tone.`
      : "";

    const systemPrompt = `You are an expert speech writer and communication coach. You write polished, natural-sounding speaking scripts that people can actually deliver confidently. Scripts should sound spoken, not written — use contractions, short punchy sentences, and natural transitions.${styleInstruction}

IMPORTANT: Embed speaking notation markers throughout the script to guide delivery. Use these markers naturally and sparingly — only where they genuinely help the speaker:

PAUSES (use at natural breath points, after key statements, before transitions):
  /   = short pause (brief beat)
  //  = medium pause (half second)
  /// = long pause (full second — use before big reveals or after powerful statements)

EMPHASIS (wrap 1–3 key words per paragraph that must be stressed):
  **word** = stress this word with weight and clarity

PACE & VOICE (use at the start of a sentence or section):
  [SLOW]   = slow down here for impact
  [FAST]   = pick up energy here
  [QUIET]  = drop to a softer, more intimate tone
  [STRONG] = project with authority and confidence

PHYSICAL CUES (use 2–4 times per script at natural moments):
  [SMILE]        = smile — warmth and connection
  [STEP FORWARD] = step forward for emphasis or intimacy
  [LOOK LEFT]    = make eye contact left side of audience
  [LOOK RIGHT]   = make eye contact right side of audience

Rules:
- Place pause markers ( / // /// ) inline within sentences, not at line breaks
- Wrap only the most important 1–3 words per section in **emphasis**
- Space out [DIRECTIVES] — don't cluster more than 2 in a row
- The script must still read naturally when all markers are ignored`;

    const userPrompt = `Write a ${durationMap[duration] || "2 minute"} speaking script for the following:

Scenario: ${scenario}
Speaking Goal: ${goal || "Communicate clearly and professionally"}
Audience: ${audience}
Tone: ${tone}
Duration: ${durationMap[duration] || "2 minutes"}

Requirements:
- Write in first person, ready to speak aloud
- Include a strong opening hook
- Clear structure with smooth transitions
- Powerful closing statement
- Natural, conversational language appropriate for the tone
- Embed speaking notation markers throughout (pauses, emphasis, pace, physical cues)
- Just the script text itself — no titles, headers, or explanations

Write the script now:`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 1500,
    });

    const script = completion.choices[0]?.message?.content ?? "";

    return NextResponse.json({ script });
  } catch (err) {
    console.error("Script generation error:", err);
    return NextResponse.json({ error: "Failed to generate script" }, { status: 500 });
  }
}
