import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

// Reusable text-to-speech endpoint. Prefers ElevenLabs when configured,
// otherwise falls back to OpenAI TTS (always available since OPENAI_API_KEY
// is required). Returns base64-encoded MP3 audio.
export async function POST(req: NextRequest) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ error: "OPENAI_API_KEY is not configured on the server." }, { status: 500 });
  }

  try {
    const { text, voiceId } = await req.json();
    if (!text || typeof text !== "string" || !text.trim()) {
      return NextResponse.json({ error: "Text is required." }, { status: 400 });
    }
    const clean = text.slice(0, 4000); // guard against very long inputs (OpenAI TTS max ~4096)

    let base64: string | null = null;

    if (process.env.ELEVENLABS_API_KEY) {
      try {
        const voice = voiceId || "21m00Tcm4TlvDq8ikWAM"; // Rachel — warm, clear
        const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voice}`, {
          method: "POST",
          headers: { "xi-api-key": process.env.ELEVENLABS_API_KEY, "Content-Type": "application/json" },
          body: JSON.stringify({
            text: clean,
            model_id: "eleven_turbo_v2_5",
            voice_settings: { stability: 0.5, similarity_boost: 0.75 },
          }),
        });
        if (res.ok) base64 = Buffer.from(await res.arrayBuffer()).toString("base64");
        else console.error("ElevenLabs TTS error:", await res.text());
      } catch (e) {
        console.error("ElevenLabs request failed:", e);
      }
    }

    if (!base64) {
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
      const speech = await openai.audio.speech.create({
        model: "tts-1",
        voice: "nova",
        input: clean,
      });
      base64 = Buffer.from(await speech.arrayBuffer()).toString("base64");
    }

    return NextResponse.json({ audio: base64 });
  } catch (err) {
    console.error("TTS error:", err);
    return NextResponse.json({ error: "Text-to-speech failed." }, { status: 500 });
  }
}
