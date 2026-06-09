import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: NextRequest) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ error: "OPENAI_API_KEY is not configured." }, { status: 500 });
  }
  if (!process.env.ELEVENLABS_API_KEY) {
    return NextResponse.json({ error: "ELEVENLABS_API_KEY is not configured." }, { status: 500 });
  }

  try {
    const { messages, voiceId } = await req.json();

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    // Get AI text response
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are an expert speech coach and communication trainer named "Coach Alex".
You help users improve their speaking skills through conversation practice.
Keep responses concise (2-4 sentences max) and conversational — you are speaking, not writing.
Ask follow-up questions to keep the conversation flowing.
Give specific, actionable feedback when the user shares a speech or asks for help.
Be encouraging, warm, and professional.`,
        },
        ...messages,
      ],
      temperature: 0.7,
      max_tokens: 200,
    });

    const replyText = completion.choices[0]?.message?.content ?? "I didn't catch that. Could you try again?";

    // Convert to speech with ElevenLabs
    const voice = voiceId || "21m00Tcm4TlvDq8ikWAM"; // Rachel — warm, professional
    const ttsRes = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voice}`, {
      method: "POST",
      headers: {
        "xi-api-key": process.env.ELEVENLABS_API_KEY!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: replyText,
        model_id: "eleven_turbo_v2_5",
        voice_settings: { stability: 0.5, similarity_boost: 0.75 },
      }),
    });

    if (!ttsRes.ok) {
      const errText = await ttsRes.text();
      console.error("ElevenLabs error:", errText);
      // Return text only if TTS fails
      return NextResponse.json({ text: replyText, audio: null });
    }

    const audioBuffer = await ttsRes.arrayBuffer();
    const base64 = Buffer.from(audioBuffer).toString("base64");

    return NextResponse.json({ text: replyText, audio: base64 });
  } catch (err) {
    console.error("AI Coach error:", err);
    return NextResponse.json({ error: "Failed to get response" }, { status: 500 });
  }
}
