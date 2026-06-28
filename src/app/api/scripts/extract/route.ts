import { NextRequest, NextResponse } from "next/server";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function isYouTube(url: string) {
  return /youtube\.com|youtu\.be/.test(url);
}

function extractYouTubeId(url: string): string | null {
  const patterns = [
    /[?&]v=([a-zA-Z0-9_-]{11})/,
    /youtu\.be\/([a-zA-Z0-9_-]{11})/,
    /embed\/([a-zA-Z0-9_-]{11})/,
    /shorts\/([a-zA-Z0-9_-]{11})/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

function stripHtml(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<nav[\s\S]*?<\/nav>/gi, " ")
    .replace(/<footer[\s\S]*?<\/footer>/gi, " ")
    .replace(/<header[\s\S]*?<\/header>/gi, " ")
    .replace(/<aside[\s\S]*?<\/aside>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s{3,}/g, "\n\n")
    .trim();
}

function truncate(text: string, maxWords = 2500): string {
  const words = text.split(/\s+/);
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(" ") + "\n\n[Content truncated to fit analysis limit]";
}

// ─── YouTube extraction ───────────────────────────────────────────────────────

async function extractYouTube(url: string): Promise<{ title: string; author: string; description: string; transcript: string | null }> {
  const id = extractYouTubeId(url);
  if (!id) throw new Error("Could not extract YouTube video ID from URL.");

  // Get title and author via oEmbed (no API key needed)
  let title = "";
  let author = "";
  try {
    const oembed = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`);
    if (oembed.ok) {
      const data = await oembed.json();
      title = data.title ?? "";
      author = data.author_name ?? "";
    }
  } catch { /* ignore */ }

  // Try to get description and auto-captions from the YouTube page.
  // The CONSENT cookie + browser-like headers bypass YouTube's EU consent
  // interstitial, which otherwise returns a page with no player data.
  let description = "";
  let transcript: string | null = null;
  try {
    const pageRes = await fetch(`https://www.youtube.com/watch?v=${id}&hl=en`, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
        "Cookie": "CONSENT=YES+1",
      },
    });
    if (pageRes.ok) {
      const html = await pageRes.text();

      // Extract description from ytInitialData
      const descMatch = html.match(/"description":\{"simpleText":"([\s\S]*?)"\}/) ||
                        html.match(/"shortDescription":"([\s\S]*?)","[a-z]/);
      if (descMatch) {
        description = descMatch[1].replace(/\\n/g, "\n").replace(/\\"/g, '"').slice(0, 1500);
      }

      // Try to find caption track URLs (prefer an English track if present)
      const captionMatch = html.match(/"captionTracks":(\[.*?\])/);
      if (captionMatch) {
        const urls = [...captionMatch[1].matchAll(/"baseUrl":"(.*?)"/g)].map(m => m[1]);
        const langs = [...captionMatch[1].matchAll(/"languageCode":"(.*?)"/g)].map(m => m[1]);
        let idx = langs.findIndex(l => l.startsWith("en"));
        if (idx < 0) idx = 0;
        const raw = urls[idx];
        if (raw) {
          const captionUrl = raw.replace(/\\u0026/g, "&").replace(/\\\//g, "/");
          transcript = await fetchCaptionText(captionUrl);
        }
      }
    }
  } catch { /* ignore */ }

  // Fallback: YouTube's public timedtext endpoint (works for many videos
  // even when the watch page yields no caption tracks)
  if (!transcript) {
    for (const lang of ["en", "en-US", "en-GB"]) {
      transcript = await fetchCaptionText(`https://www.youtube.com/api/timedtext?lang=${lang}&v=${id}`);
      if (transcript) break;
    }
  }

  return { title, author, description, transcript };
}

async function fetchCaptionText(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" },
    });
    if (!res.ok) return null;
    const xml = await res.text();
    const text = xml
      .replace(/<[^>]+>/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&#39;/g, "'")
      .replace(/&quot;/g, '"')
      .replace(/\s+/g, " ")
      .trim();
    return text.length > 0 ? text : null;
  } catch {
    return null;
  }
}

// ─── General URL extraction ───────────────────────────────────────────────────

async function extractUrl(url: string): Promise<{ title: string; text: string }> {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; SpeakFlowBot/1.0)",
      "Accept": "text/html,application/xhtml+xml",
    },
    signal: AbortSignal.timeout(10000),
  });

  if (!res.ok) throw new Error(`Failed to fetch URL (${res.status})`);

  const contentType = res.headers.get("content-type") ?? "";
  if (contentType.includes("pdf")) {
    throw new Error("PDF files cannot be extracted automatically. Please paste the content manually.");
  }

  const html = await res.text();

  // Extract title
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1].replace(/\s+/g, " ").trim() : "";

  // Extract main content — prefer article/main tags
  let body = html;
  const articleMatch = html.match(/<article[^>]*>([\s\S]*?)<\/article>/i) ||
                       html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  if (articleMatch) body = articleMatch[1];

  const text = stripHtml(body);
  return { title, text: truncate(text) };
}

// ─── Route ────────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const { url, mode } = await req.json();

    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "URL is required." }, { status: 400 });
    }

    let parsedUrl: URL;
    try {
      parsedUrl = new URL(url.trim());
    } catch {
      return NextResponse.json({ error: "Invalid URL. Please check the link and try again." }, { status: 400 });
    }

    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
      return NextResponse.json({ error: "Only http and https URLs are supported." }, { status: 400 });
    }

    if (isYouTube(url)) {
      const data = await extractYouTube(url);
      const content = [
        data.title ? `Title: ${data.title}` : "",
        data.author ? `Channel: ${data.author}` : "",
        data.description ? `\nDescription:\n${data.description}` : "",
        data.transcript ? `\nTranscript:\n${truncate(data.transcript)}` : "",
      ].filter(Boolean).join("\n");

      return NextResponse.json({
        type: "youtube",
        title: data.title,
        author: data.author,
        hasTranscript: !!data.transcript,
        content,
        wordCount: content.split(/\s+/).length,
      });
    }

    const data = await extractUrl(url);
    return NextResponse.json({
      type: "webpage",
      title: data.title,
      content: data.text,
      wordCount: data.text.split(/\s+/).length,
    });

  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Extraction failed";
    console.error("Extract error:", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
