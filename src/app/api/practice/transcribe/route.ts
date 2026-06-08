import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: NextRequest) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ error: "OPENAI_API_KEY is not configured on the server." }, { status: 500 });
  }
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  try {
    const formData = await req.formData();
    const audio = formData.get("audio") as File;

    if (!audio || audio.size === 0) {
      return NextResponse.json({ error: "No audio recorded. Please try again." }, { status: 400 });
    }

    // Whisper requires a filename with a supported extension.
    // Re-wrap as a File with explicit name to ensure correct MIME handling.
    const ext = audio.type.includes("mp4") || audio.type.includes("m4a") ? "m4a"
      : audio.type.includes("ogg") ? "ogg"
      : audio.type.includes("wav") ? "wav"
      : "webm";
    const file = new File([audio], `recording.${ext}`, { type: audio.type || "audio/webm" });

    const transcription = await openai.audio.transcriptions.create({
      file,
      model: "gpt-4o-transcribe",
      response_format: "json",
    });

    const transcript = (transcription.text ?? "").trim();
    return NextResponse.json({ transcript });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Transcription failed";
    console.error("Transcription error:", message);
    return NextResponse.json({ error: `Transcription failed: ${message}` }, { status: 500 });
  }
}
