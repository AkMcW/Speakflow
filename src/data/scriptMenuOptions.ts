export type SourceType = "youtube" | "url" | "paste" | "topic";
export type OutputType = "standard" | "rich";
export type DifficultyLevel = "beginner" | "intermediate" | "advanced";

export interface ScriptMenuOption {
  id: string;
  title: string;
  description: string;
  icon: string;
  sourceType: SourceType;
  outputType: OutputType;
  difficulty: DifficultyLevel;
  category: string;
  tags: string[];
  promptTemplate: string;
  exampleInput?: string;
  platformDefault?: string;
  structureDefault?: string[];
}

export const SCRIPT_MENU_OPTIONS: ScriptMenuOption[] = [
  {
    id: "yt-summary",
    title: "YouTube Video Summary Script",
    description: "Turn any YouTube video into a spoken summary script you can deliver confidently.",
    icon: "▶",
    sourceType: "youtube",
    outputType: "standard",
    difficulty: "beginner",
    category: "Content Repurposing",
    tags: ["youtube", "summary", "repurpose"],
    promptTemplate: `You are a script writer. Read the following YouTube video content and write a spoken summary script that captures the key ideas clearly and engagingly.

Content:
{content}

Write a {length} spoken script for {audience} in a {tone} tone. The script should:
- Open with a hook that references the original video's main idea
- Cover the 3-5 most important points from the video
- Use natural spoken language with transitions
- End with a clear takeaway

Include speaking notation markers throughout.`,
    exampleInput: "https://www.youtube.com/watch?v=...",
  },
  {
    id: "yt-reaction",
    title: "YouTube Reaction / Commentary Script",
    description: "Build a reaction or opinion script based on a YouTube video's content.",
    icon: "💬",
    sourceType: "youtube",
    outputType: "rich",
    difficulty: "intermediate",
    category: "Content Repurposing",
    tags: ["youtube", "reaction", "opinion", "commentary"],
    promptTemplate: `You are a confident content creator writing a reaction/commentary script based on a YouTube video.

Video Content:
{content}

Write a {length} spoken reaction script for {platform} that:
- Opens with a punchy hook expressing your reaction
- Reacts to 3-4 specific moments or claims from the video
- Shares your unique perspective or counterpoints
- Ends with a strong opinion statement and CTA

Tone: {tone}. Audience: {audience}.
Include speaking notation and natural reactions like "okay so", "here's the thing", "but wait".`,
    exampleInput: "https://www.youtube.com/watch?v=...",
    platformDefault: "YouTube",
  },
  {
    id: "yt-tutorial",
    title: "How-To Tutorial Script from YouTube",
    description: "Convert a YouTube tutorial into a step-by-step teaching script you can deliver.",
    icon: "📋",
    sourceType: "youtube",
    outputType: "standard",
    difficulty: "beginner",
    category: "Education",
    tags: ["tutorial", "how-to", "teaching", "youtube"],
    promptTemplate: `You are an expert instructor. Convert this YouTube tutorial content into a clear, step-by-step teaching script.

Tutorial Content:
{content}

Write a {length} spoken tutorial script for {audience} that:
- Starts with "By the end of this, you'll know exactly how to [X]"
- Presents each step clearly with transitions like "Step one", "Next", "Now here's the key part"
- Uses simple, direct language — no jargon without explanation
- Ends with a recap of what was learned

Tone: {tone}. Include notation markers.`,
    exampleInput: "https://www.youtube.com/watch?v=...",
    structureDefault: ["Hook", "Overview", "Step-by-Step", "Recap", "CTA"],
  },
  {
    id: "article-script",
    title: "Article → Spoken Script",
    description: "Convert any blog post or article into a script you can record or present.",
    icon: "📰",
    sourceType: "url",
    outputType: "standard",
    difficulty: "beginner",
    category: "Content Repurposing",
    tags: ["article", "blog", "repurpose", "spoken"],
    promptTemplate: `You are a speech writer. Convert this article into a natural spoken script.

Article Content:
{content}

Write a {length} spoken script for {audience} in a {tone} tone. Transform the written content into spoken language:
- Rewrite formal sentences as natural conversational speech
- Add verbal transitions instead of heading breaks
- Remove statistics that don't work spoken (simplify or paraphrase)
- Keep the article's core argument and evidence
- Open with a hook and close with the article's main conclusion

Include speaking notation markers.`,
    exampleInput: "https://example.com/article",
  },
  {
    id: "news-briefing",
    title: "News Article Briefing Script",
    description: "Turn a news article into a crisp, professional briefing you can deliver.",
    icon: "📡",
    sourceType: "url",
    outputType: "standard",
    difficulty: "beginner",
    category: "Professional",
    tags: ["news", "briefing", "professional", "update"],
    promptTemplate: `You are a professional news anchor or briefing host. Convert this news article into a professional spoken briefing.

Article:
{content}

Write a {length} news briefing script for {audience} in a {tone} tone. The briefing should:
- Open with the most important fact (inverted pyramid)
- Briefly cover Who, What, When, Where, Why
- Include 1 direct quote if present in the source
- Close with why this matters to the audience

Delivery tone: authoritative and clear. Include notation.`,
    exampleInput: "https://news-site.com/article",
  },
  {
    id: "linkedin-post",
    title: "LinkedIn Post → Video Script",
    description: "Turn a LinkedIn post or thought leadership piece into a personal video script.",
    icon: "💼",
    sourceType: "paste",
    outputType: "rich",
    difficulty: "beginner",
    category: "Social Media",
    tags: ["linkedin", "thought leadership", "personal brand", "professional"],
    promptTemplate: `You are a personal brand coach. Convert this LinkedIn content into a compelling video script.

LinkedIn Content:
{content}

Write a {length} video script for LinkedIn in a {tone} tone for {audience}. Make it feel personal and authentic:
- Open with a vulnerable or bold statement (not "In this video I will...")
- Share the insight or story from the post in spoken form
- Add a personal reflection or lesson learned
- Close with a thought-provoking question or CTA

Platform: LinkedIn. Keep it conversational but professional.`,
    platformDefault: "LinkedIn",
    structureDefault: ["Hook", "Story/Insight", "Lesson", "Question/CTA"],
  },
  {
    id: "twitter-thread",
    title: "Twitter/X Thread → Video Script",
    description: "Convert a Twitter/X thread into a punchy, fast-paced video script.",
    icon: "🐦",
    sourceType: "paste",
    outputType: "rich",
    difficulty: "beginner",
    category: "Social Media",
    tags: ["twitter", "thread", "viral", "social media"],
    promptTemplate: `You are a viral content creator. Convert this Twitter/X thread into a fast-paced video script.

Thread Content:
{content}

Write a {length} script for {platform} in a {tone} tone for {audience}. Make it punchy and high-energy:
- Open with the most provocative tweet from the thread as the hook
- Deliver each point as a fast beat (1-2 sentences max)
- Use "and here's the kicker", "but wait", "this is wild" for transitions
- End with a bang — the most surprising or actionable point

Platform: {platform}. Fast pace, high energy.`,
    platformDefault: "TikTok",
    structureDefault: ["Hook", "Point 1", "Point 2", "Point 3", "Kicker/Twist", "CTA"],
  },
  {
    id: "tiktok-script",
    title: "TikTok / Short-Form Video Script",
    description: "Write a high-energy TikTok or Reels script from any source material.",
    icon: "🎵",
    sourceType: "paste",
    outputType: "rich",
    difficulty: "beginner",
    category: "Social Media",
    tags: ["tiktok", "reels", "short-form", "viral"],
    promptTemplate: `You are a TikTok/Reels script expert. Turn this content into a viral short-form script.

Source Content:
{content}

Write a {length} script for TikTok/Reels for {audience} in a {tone} tone. Rules:
- First 3 seconds = hook (question, bold claim, or visual hook)
- Deliver value fast — no fluff
- Use "POV:", "Story time:", or "Did you know:" openings
- Speak directly to camera as "you"
- End with clear CTA (follow, comment, save)

Keep it punchy. Under 90 seconds preferred. Include pacing markers.`,
    platformDefault: "TikTok",
    structureDefault: ["Hook (3s)", "Value Delivery", "CTA"],
  },
  {
    id: "podcast-script",
    title: "Podcast Episode Script",
    description: "Write a solo podcast episode script from your notes or an article.",
    icon: "🎙",
    sourceType: "paste",
    outputType: "standard",
    difficulty: "intermediate",
    category: "Podcasting",
    tags: ["podcast", "solo episode", "audio", "long-form"],
    promptTemplate: `You are an experienced podcast writer. Write an engaging solo episode script from this content.

Source Material:
{content}

Write a {length} podcast episode script for {audience} in a {tone} tone. The episode should feel like a natural conversation:
- Open with a warm intro and episode promise ("Today I want to talk about...")
- Break into natural segments with verbal signposts
- Include personal anecdotes or hypotheticals to make points relatable
- Use "think about it this way", "here's an analogy", "let me give you an example"
- End with a recap, key takeaway, and listener challenge

Include notation for natural pauses and emphasis.`,
    structureDefault: ["Intro & Hook", "Segment 1", "Segment 2", "Segment 3", "Key Takeaway", "Outro"],
  },
  {
    id: "presentation-script",
    title: "Presentation / Keynote Script",
    description: "Convert your slide deck notes or topic into a full presentation script.",
    icon: "🖥",
    sourceType: "paste",
    outputType: "standard",
    difficulty: "intermediate",
    category: "Professional",
    tags: ["presentation", "keynote", "slides", "public speaking"],
    promptTemplate: `You are a world-class presentation coach and speechwriter. Write a polished keynote presentation script.

Content / Notes:
{content}

Write a {length} keynote script for {audience} in a {tone} tone. Structure it like a TED talk:
- Open with a story, question, or counterintuitive statement — never "Good morning, my name is..."
- Build to a clear central idea (the "throughline")
- Use the rule of three for main points
- Include 1-2 memorable moments (a stat, story, or demo cue)
- End with a call to action and inspiring close

Include physical cues and emphasis markers. Script should feel live, not read.`,
    structureDefault: ["Opening Hook", "Thesis", "Point 1", "Point 2", "Point 3", "Memorable Moment", "Close & CTA"],
  },
  {
    id: "sales-pitch",
    title: "Sales Pitch Script",
    description: "Write a persuasive sales or elevator pitch script for any product or service.",
    icon: "💰",
    sourceType: "paste",
    outputType: "rich",
    difficulty: "intermediate",
    category: "Sales",
    tags: ["sales", "pitch", "persuasion", "product"],
    promptTemplate: `You are a top-performing sales trainer and speechwriter. Write a compelling sales pitch script.

Product/Service Info:
{content}

Write a {length} sales pitch for {audience} in a {tone} tone. Use proven sales psychology:
- Open with the problem/pain point (not the product)
- Introduce the solution with emotional language
- Include 2-3 specific benefits (not features)
- Add a proof point (stat, testimonial, result)
- Create urgency and close with a clear ask

Platform: {platform}. Be confident and direct without being pushy.`,
    platformDefault: "In-person",
    structureDefault: ["Pain Point", "Solution Reveal", "Benefits", "Social Proof", "Close"],
  },
  {
    id: "interview-answer",
    title: "Job Interview Answer Script",
    description: "Craft a polished, structured answer to any interview question.",
    icon: "🎯",
    sourceType: "paste",
    outputType: "standard",
    difficulty: "beginner",
    category: "Career",
    tags: ["interview", "career", "STAR method", "job"],
    promptTemplate: `You are a career coach and interview expert. Write a compelling interview answer script.

Interview Question + Context (experience, role, company):
{content}

Write a {length} interview answer for {audience} in a {tone} tone using the STAR method:
- Situation: brief context (1-2 sentences)
- Task: what you were responsible for
- Action: specific steps YOU took (focus on "I", not "we")
- Result: quantifiable outcome if possible

Sound confident and rehearsed but not robotic. Include natural hesitation fillers only where they help ("What comes to mind is...", "One example that really sticks out..."). End with a forward-looking statement that ties back to the role.`,
    structureDefault: ["Situation", "Task", "Action", "Result", "Forward Statement"],
  },
  {
    id: "apology-recovery",
    title: "Public Apology / Crisis Response Script",
    description: "Write a sincere, professional apology or crisis communication script.",
    icon: "🤝",
    sourceType: "paste",
    outputType: "standard",
    difficulty: "advanced",
    category: "Professional",
    tags: ["apology", "crisis", "PR", "professional"],
    promptTemplate: `You are a crisis communications expert. Write a genuine, professional apology or crisis response script.

Situation / Context:
{content}

Write a {length} response script for {audience} in a {tone} tone. A good apology:
- Acknowledges what happened specifically (no vague language)
- Takes clear responsibility (no "if anyone was offended")
- Expresses genuine remorse
- States concrete actions being taken to fix it
- Ends with a commitment, not a plea

Do NOT minimize, deflect, or use passive voice. Be direct and human.`,
    structureDefault: ["Acknowledgment", "Responsibility", "Remorse", "Action Plan", "Commitment"],
  },
  {
    id: "product-explainer",
    title: "Product Explainer / Demo Script",
    description: "Write a clear product explanation or demo walkthrough script.",
    icon: "🚀",
    sourceType: "paste",
    outputType: "rich",
    difficulty: "intermediate",
    category: "Marketing",
    tags: ["product", "explainer", "demo", "marketing"],
    promptTemplate: `You are a product marketer and demo coach. Write a compelling product explainer script.

Product Information:
{content}

Write a {length} explainer script for {audience} on {platform} in a {tone} tone:
- Hook with the problem this solves (not "our product does X")
- Show the before/after transformation
- Walk through the key features as benefits ("You can now...", "This means...")
- Include a "wow moment" — the one thing that makes them say "I need this"
- Clear CTA: sign up, book demo, buy now

Make it feel like you're showing a friend something amazing.`,
    platformDefault: "YouTube",
    structureDefault: ["Problem Hook", "Solution Intro", "Feature Walk", "Wow Moment", "CTA"],
  },
  {
    id: "storytelling",
    title: "Personal Story / Narrative Script",
    description: "Turn your personal experience or story notes into a powerful narrative script.",
    icon: "📖",
    sourceType: "paste",
    outputType: "standard",
    difficulty: "intermediate",
    category: "Storytelling",
    tags: ["storytelling", "personal", "narrative", "emotional"],
    promptTemplate: `You are a master storyteller and speechwriter. Transform this raw story into a gripping narrative script.

Story Notes / Experience:
{content}

Write a {length} narrative script for {audience} in a {tone} tone using classic story structure:
- Open in the middle of the action (in medias res) — don't start at the beginning
- Build tension: something is at stake
- The turning point: a realization, mistake, or unexpected moment
- Resolution: what happened and what changed
- The lesson: what this means for the audience

Use vivid sensory language: what you saw, heard, felt. Make the listener feel they're there.`,
    structureDefault: ["Scene-Setting Hook", "Rising Tension", "Turning Point", "Resolution", "Universal Lesson"],
  },
  {
    id: "email-script",
    title: "Email / Message → Spoken Script",
    description: "Convert an email or written message into a spoken, natural-sounding delivery.",
    icon: "✉",
    sourceType: "paste",
    outputType: "standard",
    difficulty: "beginner",
    category: "Communication",
    tags: ["email", "spoken", "conversion", "communication"],
    promptTemplate: `You are a communication coach. Convert this written email or message into natural spoken language.

Email / Message:
{content}

Write a {length} spoken version for {audience} in a {tone} tone:
- Remove email conventions (no "Dear X", "I hope this finds you well", "Best regards")
- Rewrite formal sentences as natural speech
- Preserve all key information and requests
- Add warmth and human connection where appropriate
- End as a spoken close, not an email sign-off

The result should sound like a confident voicemail or video message.`,
  },
  {
    id: "ielts-template",
    title: "IELTS Speaking Response Script",
    description: "Build a structured, high-band IELTS speaking answer from a topic or cue card.",
    icon: "🎓",
    sourceType: "paste",
    outputType: "standard",
    difficulty: "intermediate",
    category: "IELTS",
    tags: ["IELTS", "band 7", "speaking", "academic"],
    promptTemplate: `You are an IELTS examiner and speaking coach. Write a high-band IELTS speaking response.

Topic / Cue Card:
{content}

Write a {length} IELTS Part 2 or Part 3 response for {audience} in a {tone} tone targeting Band 7-8:
- Use a range of complex sentence structures (relative clauses, conditionals, passive)
- Include idiomatic expressions (2-3 per response)
- Demonstrate lexical variety — avoid repeating the same words
- Use discourse markers: "In terms of...", "What's more...", "Having said that..."
- Sound fluent and spontaneous, not memorized

Include pausing naturally at clause boundaries, not mid-word.`,
    structureDefault: ["Introduction", "Main Point 1", "Example/Elaboration", "Main Point 2", "Concluding Thought"],
  },
  {
    id: "ted-talk",
    title: "TED Talk Style Speech",
    description: "Write a TED Talk-style inspirational speech from your idea or content.",
    icon: "🔴",
    sourceType: "paste",
    outputType: "rich",
    difficulty: "advanced",
    category: "Public Speaking",
    tags: ["TED", "inspirational", "keynote", "ideas"],
    promptTemplate: `You are a TED Talk speechwriter who has coached dozens of speakers. Write a TED-style talk from this idea.

Idea / Content:
{content}

Write a {length} TED-style speech for {audience} in a {tone} tone:
- Open with a story, NOT "Today I want to talk about..."
- State the "idea worth spreading" clearly within the first 2 minutes
- Use the "What? So what? Now what?" structure
- Include one counterintuitive insight that makes the audience rethink something
- Build to an emotional climax
- End with a memorable closing line (the "hammer")

Rhetorical devices: anaphora, rule of three, rhetorical questions. Include physical cues.`,
    structureDefault: ["Opening Story", "Idea Worth Spreading", "Evidence & Examples", "Counterintuitive Insight", "Emotional Climax", "The Hammer Close"],
  },
  {
    id: "educational-explainer",
    title: "Educational Explainer Script",
    description: "Turn complex topic notes into a clear, engaging educational explanation.",
    icon: "🔬",
    sourceType: "paste",
    outputType: "standard",
    difficulty: "intermediate",
    category: "Education",
    tags: ["education", "explainer", "teaching", "complex topics"],
    promptTemplate: `You are a brilliant educator who can explain anything simply. Write an educational explainer script.

Topic / Source Material:
{content}

Write a {length} explainer for {audience} in a {tone} tone:
- Start with "Here's something most people don't understand about [topic]..."
- Use the Feynman technique: explain as if to a curious 12-year-old, then build complexity
- Include 2-3 concrete analogies to make abstract concepts tangible
- Check comprehension with rhetorical questions ("Does that make sense? Let me show you why...")
- End with the "big picture" — why this matters

Make it genuinely fascinating, not dry.`,
    structureDefault: ["Hook + Why It Matters", "Core Concept (Simple)", "Analogy", "Deeper Layer", "Real-World Application", "Takeaway"],
  },
  {
    id: "motivational",
    title: "Motivational / Inspirational Speech",
    description: "Write a powerful motivational speech from your theme, story, or quote.",
    icon: "🔥",
    sourceType: "paste",
    outputType: "rich",
    difficulty: "intermediate",
    category: "Inspirational",
    tags: ["motivational", "inspirational", "energy", "leadership"],
    promptTemplate: `You are a world-class motivational speaker and speechwriter. Write an electrifying motivational speech.

Theme / Content / Story:
{content}

Write a {length} motivational speech for {audience} in a {tone} tone:
- Open with a moment of truth — a raw, honest statement that stops people cold
- Build urgency: what's at stake if they don't act
- Share a story of transformation (real or illustrative)
- Give them a specific, actionable belief shift
- Build to a crescendo — the most powerful moment
- Close with a rallying call that makes them want to stand up

Use repetition, rhythm, and rhetorical power. This speech should move people emotionally.`,
    structureDefault: ["Truth Bomb Open", "Stakes", "Transformation Story", "Belief Shift", "Crescendo", "Battle Cry Close"],
  },
];

export const SCRIPT_CATEGORIES = [
  "All",
  "Content Repurposing",
  "Social Media",
  "Professional",
  "Sales",
  "Career",
  "Marketing",
  "Education",
  "Podcasting",
  "Storytelling",
  "Communication",
  "IELTS",
  "Public Speaking",
  "Inspirational",
];

export const SOURCE_TYPE_LABELS: Record<SourceType, string> = {
  youtube: "YouTube URL",
  url: "Any URL",
  paste: "Paste Text",
  topic: "Topic / Idea",
};

export const SOURCE_TYPE_COLORS: Record<SourceType, string> = {
  youtube: "#ff0000",
  url: "#3b82f6",
  paste: "#8b5cf6",
  topic: "#10b981",
};
