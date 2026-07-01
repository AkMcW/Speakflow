import { NextResponse } from "next/server";

// Returns the account's ElevenLabs voice library (premade + cloned/custom)
// so the user can pick a Voice ID without leaving the app.
export async function GET() {
  if (!process.env.ELEVENLABS_API_KEY) {
    return NextResponse.json({ configured: false, voices: [] });
  }
  try {
    const res = await fetch("https://api.elevenlabs.io/v1/voices", {
      headers: { "xi-api-key": process.env.ELEVENLABS_API_KEY },
    });
    if (!res.ok) {
      return NextResponse.json({ configured: true, voices: [], error: "Could not load voices from ElevenLabs." }, { status: 200 });
    }
    const data = await res.json();
    const voices = (data.voices ?? []).map((v: {
      voice_id: string; name: string; category?: string; labels?: Record<string, string>; preview_url?: string;
    }) => ({
      id: v.voice_id,
      name: v.name,
      category: v.category ?? "",
      description: v.labels ? Object.values(v.labels).filter(Boolean).join(" · ") : "",
      previewUrl: v.preview_url ?? "",
    }));
    return NextResponse.json({ configured: true, voices });
  } catch (err) {
    console.error("Fetch ElevenLabs voices error:", err);
    return NextResponse.json({ configured: true, voices: [], error: "Failed to load voices." }, { status: 200 });
  }
}
