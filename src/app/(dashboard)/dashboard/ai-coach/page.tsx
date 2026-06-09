"use client";
import { useState, useRef, useEffect } from "react";
import { Mic, Square, Volume2, VolumeX, Bot, User, Loader2 } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const TOPICS = [
  "Free conversation practice",
  "Job interview coaching",
  "Public speaking tips",
  "IELTS speaking prep",
  "Pronunciation & clarity",
  "Business presentation skills",
  "Confidence building",
  "Storytelling technique",
];

export default function AICoachPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [recording, setRecording] = useState(false);
  const [thinking, setThinking] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [muted, setMuted] = useState(false);
  const [error, setError] = useState("");
  const [topic, setTopic] = useState(TOPICS[0]);
  const [started, setStarted] = useState(false);
  const [seconds, setSeconds] = useState(0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, thinking]);

  useEffect(() => () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (audioRef.current) audioRef.current.pause();
  }, []);

  async function startSession() {
    setStarted(true);
    setMessages([]);
    setThinking(true);
    setError("");

    // Kick off with an opening message
    const opening: Message[] = [{ role: "user", content: `I'd like to practice: ${topic}` }];
    await sendToCoach(opening);
  }

  async function sendToCoach(msgs: Message[]) {
    setThinking(true);
    try {
      const res = await fetch("/api/ai-coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: msgs }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      const assistantMsg: Message = { role: "assistant", content: data.text };
      setMessages((prev) => [...prev.filter((m) => !(m.role === "user" && m.content.startsWith("I'd like to practice:"))), ...msgs.slice(-1), assistantMsg]);

      if (data.audio && !muted) {
        await playAudio(data.audio);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to get response");
    } finally {
      setThinking(false);
    }
  }

  async function playAudio(base64: string) {
    if (audioRef.current) { audioRef.current.pause(); }
    const audio = new Audio(`data:audio/mpeg;base64,${base64}`);
    audioRef.current = audio;
    setSpeaking(true);
    audio.onended = () => setSpeaking(false);
    audio.onerror = () => setSpeaking(false);
    await audio.play().catch(() => setSpeaking(false));
  }

  async function startRecording() {
    setError("");
    if (audioRef.current) { audioRef.current.pause(); setSpeaking(false); }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mimeType = ["audio/webm", "audio/mp4", "audio/ogg"].find((m) => MediaRecorder.isTypeSupported(m)) ?? "";
      const recorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      chunksRef.current = [];
      recorder.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data); };
      recorder.start(100);
      setRecording(true);
      setSeconds(0);
      intervalRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    } catch {
      setError("Microphone access denied.");
    }
  }

  async function stopRecording() {
    if (intervalRef.current) clearInterval(intervalRef.current);
    const recorder = mediaRecorderRef.current;
    if (!recorder) return;
    recorder.stop();
    recorder.stream.getTracks().forEach((t) => t.stop());
    setRecording(false);

    recorder.onstop = async () => {
      const mimeType = recorder.mimeType || "audio/webm";
      const blob = new Blob(chunksRef.current, { type: mimeType });

      // Transcribe
      setThinking(true);
      try {
        const form = new FormData();
        form.append("audio", blob, "recording.webm");
        const res = await fetch("/api/practice/transcribe", { method: "POST", body: form });
        const data = await res.json();
        if (!res.ok || data.error) throw new Error(data.error);
        const userText = data.transcript?.trim();
        if (!userText) throw new Error("No speech detected — please try again");

        const userMsg: Message = { role: "user", content: userText };
        const updatedMessages = [...messages, userMsg];
        setMessages(updatedMessages);
        await sendToCoach(updatedMessages);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Transcription failed");
        setThinking(false);
      }
    };
  }

  const fmtTime = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  if (!started) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1F1F1F]">AI Speaking Coach</h1>
          <p className="text-sm text-[#636363] mt-1">Have a real spoken conversation with your AI coach. Speak, listen, and get instant feedback.</p>
        </div>

        <div className="bg-white border border-[#E0E0E0] rounded-xl p-8 text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-[#E8F1FF] flex items-center justify-center mx-auto">
            <Bot size={40} className="text-[#0056D2]" />
          </div>
          <div>
            <h2 className="font-bold text-[#1F1F1F] text-lg mb-1">Meet Coach Alex</h2>
            <p className="text-sm text-[#636363]">Your AI speech coach powered by GPT-4o + ElevenLabs voice. Choose a topic and start speaking.</p>
          </div>

          <div>
            <p className="text-sm font-semibold text-[#1F1F1F] mb-3">What would you like to practice?</p>
            <div className="grid grid-cols-2 gap-2">
              {TOPICS.map((t) => (
                <button
                  key={t}
                  onClick={() => setTopic(t)}
                  className={`text-sm px-3 py-2 rounded border text-left transition-colors ${
                    topic === t
                      ? "border-[#0056D2] bg-[#E8F1FF] text-[#0056D2] font-semibold"
                      : "border-[#E0E0E0] text-[#636363] hover:border-[#0056D2] hover:text-[#0056D2]"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={startSession}
            className="w-full bg-[#0056D2] hover:bg-[#003B8E] text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Mic size={18} />
            Start Conversation
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center text-xs text-[#636363]">
          {[
            { icon: "🎙️", label: "Speak naturally", desc: "Hold the mic button and talk" },
            { icon: "🤖", label: "AI responds", desc: "GPT-4o generates coaching" },
            { icon: "🔊", label: "Hear feedback", desc: "ElevenLabs voices the reply" },
          ].map(({ icon, label, desc }) => (
            <div key={label} className="bg-white border border-[#E0E0E0] rounded-lg p-4">
              <div className="text-2xl mb-2">{icon}</div>
              <p className="font-semibold text-[#1F1F1F] mb-1">{label}</p>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto flex flex-col h-[calc(100vh-8rem)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${speaking ? "bg-[#0056D2]" : "bg-[#E8F1FF]"}`}>
            <Bot size={20} className={speaking ? "text-white" : "text-[#0056D2]"} />
          </div>
          <div>
            <p className="font-bold text-[#1F1F1F] text-sm">Coach Alex</p>
            <p className="text-xs text-[#636363]">
              {speaking ? "Speaking…" : thinking ? "Thinking…" : recording ? "Listening…" : "Ready"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => { setMuted((m) => !m); if (audioRef.current) { audioRef.current.pause(); setSpeaking(false); } }}
            className="p-2 rounded border border-[#E0E0E0] text-[#636363] hover:bg-[#F5F5F5] transition-colors"
            title={muted ? "Unmute" : "Mute"}
          >
            {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
          </button>
          <button
            onClick={() => { setStarted(false); setMessages([]); setError(""); }}
            className="text-xs border border-[#E0E0E0] text-[#636363] hover:bg-[#F5F5F5] px-3 py-1.5 rounded transition-colors font-medium"
          >
            End session
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-1">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === "assistant" ? "bg-[#E8F1FF]" : "bg-[#F5F5F5]"}`}>
              {msg.role === "assistant" ? <Bot size={15} className="text-[#0056D2]" /> : <User size={15} className="text-[#636363]" />}
            </div>
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
              msg.role === "assistant"
                ? "bg-white border border-[#E0E0E0] text-[#1F1F1F] rounded-tl-sm"
                : "bg-[#0056D2] text-white rounded-tr-sm"
            }`}>
              {msg.content}
            </div>
          </div>
        ))}

        {thinking && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-[#E8F1FF] flex items-center justify-center shrink-0">
              <Bot size={15} className="text-[#0056D2]" />
            </div>
            <div className="bg-white border border-[#E0E0E0] rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1">
              <Loader2 size={14} className="text-[#0056D2] animate-spin" />
              <span className="text-xs text-[#636363] ml-1">Coach Alex is responding…</span>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-[#FFEBEE] border border-[#FFCDD2] rounded-lg p-3 text-xs text-[#E53935]">{error}</div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Recording control */}
      <div className="bg-white border border-[#E0E0E0] rounded-xl p-4 flex flex-col items-center gap-3">
        {recording ? (
          <>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              <span className="text-xs font-bold text-red-500 uppercase tracking-wider">Recording — {fmtTime(seconds)}</span>
            </div>
            <div className="flex items-end gap-0.5 h-8">
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className="wave-bar w-1 bg-[#0056D2] rounded-full" style={{ height: "20px" }} />
              ))}
            </div>
            <button
              onClick={stopRecording}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2.5 rounded-full transition-colors text-sm"
            >
              <Square size={14} /> Stop & Send
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <button
              disabled={thinking || speaking}
              onClick={startRecording}
              className="w-16 h-16 rounded-full bg-[#0056D2] hover:bg-[#003B8E] disabled:bg-[#E0E0E0] disabled:cursor-not-allowed text-white flex items-center justify-center transition-colors pulse-ring"
            >
              <Mic size={26} />
            </button>
            <p className="text-xs text-[#9E9E9E]">
              {thinking ? "Wait for Coach Alex to finish…" : speaking ? "Coach Alex is speaking…" : "Press to speak"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
