"use client";
import { useState, useRef, useMemo } from "react";
import {
  Volume2, Play, Pause, Download, Copy, CheckCircle, Loader2,
  Repeat, ArrowRight, ArrowLeft, RotateCcw, Info,
} from "lucide-react";

function splitSentences(t: string): string[] {
  return t
    .replace(/\s+/g, " ")
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

export default function PracticeListenShadow({ text }: { text: string }) {
  const [voiceId, setVoiceId] = useState("");
  const [mode, setMode] = useState<"listen" | "shadow">("listen");
  const [err, setErr] = useState("");

  // ── Listen ──
  const [audioB64, setAudioB64] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [copied, setCopied] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // ── Shadow ──
  const sentences = useMemo(() => splitSentences(text), [text]);
  const [idx, setIdx] = useState(0);
  const [shadowLoading, setShadowLoading] = useState(false);
  const [shadowPlaying, setShadowPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const shadowCache = useRef<Record<number, string>>({});
  const shadowAudioRef = useRef<HTMLAudioElement | null>(null);

  async function tts(t: string): Promise<string> {
    const res = await fetch("/api/tts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: t, voiceId: voiceId.trim() || undefined }),
    });
    const data = await res.json();
    if (!res.ok || !data.audio) throw new Error(data.error || "Text-to-speech failed");
    return data.audio as string;
  }

  function stopAll() {
    if (audioRef.current) audioRef.current.pause();
    if (shadowAudioRef.current) shadowAudioRef.current.pause();
    setPlaying(false);
    setShadowPlaying(false);
  }

  // ── Listen actions ──
  async function generateListen() {
    setErr("");
    setLoading(true);
    try {
      const b = await tts(text);
      setAudioB64(b);
      playListen(b);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Text-to-speech failed");
    } finally {
      setLoading(false);
    }
  }

  function playListen(b64?: string) {
    const src = b64 ?? audioB64;
    if (!src) return;
    if (playing) { audioRef.current?.pause(); setPlaying(false); return; }
    const audio = new Audio(`data:audio/mpeg;base64,${src}`);
    audioRef.current = audio;
    audio.onended = () => setPlaying(false);
    audio.onerror = () => setPlaying(false);
    setPlaying(true);
    audio.play().catch(() => setPlaying(false));
  }

  function download() {
    if (!audioB64) return;
    const a = document.createElement("a");
    a.href = `data:audio/mpeg;base64,${audioB64}`;
    a.download = "speakflow-tts.mp3";
    a.click();
  }

  function copyText() {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  // ── Shadow actions ──
  async function playSentence(i: number) {
    const s = sentences[i];
    if (!s) return;
    setErr("");
    if (shadowAudioRef.current) shadowAudioRef.current.pause();
    setShadowLoading(true);
    try {
      let b = shadowCache.current[i];
      if (!b) { b = await tts(s); shadowCache.current[i] = b; }
      const audio = new Audio(`data:audio/mpeg;base64,${b}`);
      shadowAudioRef.current = audio;
      audio.onended = () => setShadowPlaying(false); // auto-pause → user repeats
      audio.onerror = () => setShadowPlaying(false);
      setShadowPlaying(true);
      await audio.play().catch(() => setShadowPlaying(false));
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Text-to-speech failed");
    } finally {
      setShadowLoading(false);
    }
  }

  function startShadow() {
    setStarted(true);
    setIdx(0);
    playSentence(0);
  }

  function goNext() {
    if (idx >= sentences.length - 1) return;
    const n = idx + 1;
    setIdx(n);
    playSentence(n);
  }

  function goPrev() {
    if (idx <= 0) return;
    const p = idx - 1;
    setIdx(p);
    playSentence(p);
  }

  const isLast = idx >= sentences.length - 1;

  return (
    <div className="bg-white border border-[#E0E0E0] rounded-lg p-6">
      <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
        <h2 className="font-bold text-[#1F1F1F] flex items-center gap-2">
          <Volume2 size={17} className="text-[#0056D2]" /> Listen &amp; Shadow
        </h2>
        <div className="flex items-center gap-1 border border-[#E0E0E0] rounded overflow-hidden text-xs font-semibold">
          <button onClick={() => { stopAll(); setMode("listen"); }}
            className={`px-3 py-1.5 transition-colors ${mode === "listen" ? "bg-[#0056D2] text-white" : "text-[#636363] hover:bg-[#F5F5F5]"}`}>
            AI Speak
          </button>
          <button onClick={() => { stopAll(); setMode("shadow"); }}
            className={`px-3 py-1.5 transition-colors ${mode === "shadow" ? "bg-[#0056D2] text-white" : "text-[#636363] hover:bg-[#F5F5F5]"}`}>
            Shadowing
          </button>
        </div>
      </div>

      {/* Voice ID */}
      <div className="mb-4">
        <label className="block text-xs font-semibold text-[#636363] mb-1">
          ElevenLabs Voice ID <span className="font-normal">(optional — leave blank for the default voice)</span>
        </label>
        <input
          value={voiceId}
          onChange={(e) => setVoiceId(e.target.value)}
          placeholder="e.g. 21m00Tcm4TlvDq8ikWAM"
          className="w-full px-3 py-2 border border-[#E0E0E0] rounded text-sm text-[#1F1F1F] placeholder-[#9E9E9E] focus:outline-none focus:border-[#0056D2] focus:ring-1 focus:ring-[#0056D2]"
        />
      </div>

      {err && (
        <div className="bg-[#FFEBEE] border border-[#FFCDD2] rounded-lg p-3 mb-4 text-xs text-[#E53935]">{err}</div>
      )}

      {/* ── AI Speak (listen) ── */}
      {mode === "listen" && (
        <div>
          <p className="text-xs text-[#636363] mb-3">Generate a spoken version of your whole script — listen back, download it, or copy the text.</p>
          <div className="flex flex-wrap gap-2">
            {!audioB64 ? (
              <button onClick={generateListen} disabled={loading}
                className="flex items-center gap-2 bg-[#0056D2] hover:bg-[#003B8E] text-white font-semibold px-4 py-2 rounded text-sm transition-colors disabled:opacity-70">
                {loading ? <><Loader2 size={15} className="animate-spin" /> Generating…</> : <><Volume2 size={15} /> Let AI speak</>}
              </button>
            ) : (
              <>
                <button onClick={() => playListen()}
                  className="flex items-center gap-2 bg-[#0056D2] hover:bg-[#003B8E] text-white font-semibold px-4 py-2 rounded text-sm transition-colors">
                  {playing ? <><Pause size={15} /> Pause</> : <><Play size={15} /> Play</>}
                </button>
                <button onClick={generateListen} disabled={loading}
                  className="flex items-center gap-2 border border-[#E0E0E0] text-[#636363] hover:bg-[#F5F5F5] font-semibold px-4 py-2 rounded text-sm transition-colors disabled:opacity-70">
                  {loading ? <Loader2 size={15} className="animate-spin" /> : <RotateCcw size={15} />} Regenerate
                </button>
                <button onClick={download}
                  className="flex items-center gap-2 border border-[#E0E0E0] text-[#636363] hover:bg-[#F5F5F5] font-semibold px-4 py-2 rounded text-sm transition-colors">
                  <Download size={15} /> Save audio
                </button>
              </>
            )}
            <button onClick={copyText}
              className="flex items-center gap-2 border border-[#E0E0E0] text-[#636363] hover:bg-[#F5F5F5] font-semibold px-4 py-2 rounded text-sm transition-colors">
              {copied ? <><CheckCircle size={15} className="text-[#00B37D]" /> Copied</> : <><Copy size={15} /> Copy text</>}
            </button>
          </div>
        </div>
      )}

      {/* ── Shadowing ── */}
      {mode === "shadow" && (
        <div>
          <p className="text-xs text-[#636363] mb-3 flex items-start gap-1.5">
            <Info size={13} className="mt-0.5 shrink-0 text-[#0056D2]" />
            Listen to one sentence, it auto-pauses, you repeat it aloud, then hit Continue for the next.
          </p>

          {sentences.length === 0 ? (
            <p className="text-sm text-[#9E9E9E]">No script text to shadow.</p>
          ) : !started ? (
            <button onClick={startShadow}
              className="flex items-center gap-2 bg-[#0056D2] hover:bg-[#003B8E] text-white font-semibold px-4 py-2 rounded text-sm transition-colors">
              <Repeat size={15} /> Start shadowing ({sentences.length} sentences)
            </button>
          ) : (
            <div>
              {/* Progress */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-[#636363]">Sentence {idx + 1} of {sentences.length}</span>
                <div className="flex items-center gap-1">
                  {shadowLoading && <Loader2 size={13} className="animate-spin text-[#0056D2]" />}
                  {shadowPlaying && <span className="text-[10px] font-bold text-[#0056D2] uppercase tracking-wider">Playing…</span>}
                  {!shadowPlaying && !shadowLoading && <span className="text-[10px] font-bold text-[#00B37D] uppercase tracking-wider">Your turn — repeat it</span>}
                </div>
              </div>
              <div className="h-1.5 rounded-full bg-[#F0F0F0] mb-4">
                <div className="h-1.5 rounded-full bg-[#0056D2] transition-all duration-300" style={{ width: `${((idx + 1) / sentences.length) * 100}%` }} />
              </div>

              {/* Current sentence */}
              <div className="bg-[#F0F7FF] border border-[#CFE3FF] rounded-lg p-4 mb-4">
                <p className="text-base text-[#1F1F1F] leading-relaxed">{sentences[idx]}</p>
              </div>

              {/* Controls */}
              <div className="flex flex-wrap items-center gap-2">
                <button onClick={() => playSentence(idx)} disabled={shadowLoading}
                  className="flex items-center gap-2 border border-[#0056D2] text-[#0056D2] hover:bg-[#E8F1FF] font-semibold px-4 py-2 rounded text-sm transition-colors disabled:opacity-70">
                  {shadowPlaying ? <Pause size={15} /> : <Play size={15} />} Replay
                </button>
                <button onClick={goPrev} disabled={idx <= 0}
                  className="flex items-center gap-1.5 border border-[#E0E0E0] text-[#636363] hover:bg-[#F5F5F5] font-semibold px-3 py-2 rounded text-sm transition-colors disabled:opacity-40">
                  <ArrowLeft size={15} /> Prev
                </button>
                {!isLast ? (
                  <button onClick={goNext}
                    className="flex items-center gap-2 bg-[#0056D2] hover:bg-[#003B8E] text-white font-semibold px-4 py-2 rounded text-sm transition-colors">
                    Continue <ArrowRight size={15} />
                  </button>
                ) : (
                  <button onClick={() => { setStarted(false); setIdx(0); }}
                    className="flex items-center gap-2 bg-[#00B37D] hover:bg-[#009467] text-white font-semibold px-4 py-2 rounded text-sm transition-colors">
                    <CheckCircle size={15} /> Finish
                  </button>
                )}
                <button onClick={() => { stopAll(); setStarted(false); setIdx(0); }}
                  className="text-xs text-[#636363] hover:text-[#E53935] transition-colors ml-1">
                  Reset
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
