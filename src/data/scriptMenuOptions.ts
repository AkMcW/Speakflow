export interface ScriptMenuOption {
  id: string;
  title: string;
  description: string;
  inputSource: string;
  inputType: "url" | "youtube" | "text" | "multi-url";
  outputType: string;
  bestFor: string[];
  defaultPlatform: string;
  defaultTone: string;
  defaultLength: string;
  scriptStructure: string[];
  placeholderInput: string;
  promptTemplate: string;
  sourceFilter: "youtube" | "website" | "article" | "pdf" | "podcast" | "product" | "transcript" | "notes" | "multi";
  outputFilter: "short-video" | "long-video" | "sales" | "education" | "linkedin" | "webinar" | "internal" | "review";
  difficulty: "beginner" | "intermediate" | "advanced";
  emoji: string;
}

export const SCRIPT_MENU_OPTIONS: ScriptMenuOption[] = [
  {
    id: "opt-01",
    title: "YouTube Video to Talking Script",
    description: "Turn any YouTube video into a polished, spoken-word script you can record or present.",
    inputSource: "YouTube video URL",
    inputType: "youtube",
    outputType: "Narrated talking-head or voiceover script",
    bestFor: ["Content repurposing", "Educational creators", "Commentary channels", "Faceless YouTube channels"],
    defaultPlatform: "YouTube",
    defaultTone: "conversational",
    defaultLength: "medium (3-5 min)",
    scriptStructure: [
      "Hook (0-15 sec): arresting question or bold statement",
      "Context (15-45 sec): why this topic matters right now",
      "Main content (2-3 min): 3 key points from the source video",
      "Insight/spin (30 sec): your unique angle or commentary",
      "CTA (15 sec): subscribe, comment, or follow prompt",
    ],
    placeholderInput: "https://www.youtube.com/watch?v=...",
    promptTemplate: `You are an expert video scriptwriter specialising in YouTube content. Your task is to transform the following video transcript or summary into a high-quality, engaging spoken-word script.

SOURCE CONTENT:
{content}

SCRIPT PARAMETERS:
- Platform: {platform}
- Tone: {tone}
- Target length: {length}
- Audience: {audience}

INSTRUCTIONS:

1. HOOK (first 15 seconds): Open with a provocative question, surprising statistic, or bold statement that immediately creates curiosity. Never start with "In this video" or "Today we're going to." The hook must compel the viewer to keep watching.

2. CONTEXT BRIDGE (15-45 seconds): Briefly explain why this topic matters RIGHT NOW. Connect to a current trend, pain point, or widespread curiosity. Make the audience feel that watching this is urgent and relevant.

3. MAIN BODY (2-4 minutes depending on {length}): Extract and restructure the 3-5 most valuable ideas from the source content. Each point should: start with a clear, punchy topic sentence; include a specific example, data point, or anecdote; end with a one-sentence insight that advances the narrative.

4. UNIQUE ANGLE (30 seconds): Add a layer of commentary, opinion, or synthesis that goes beyond the source material. This is your chance to give the audience something they could not get from the original video alone.

5. CALL TO ACTION (15 seconds): End with a specific, low-friction CTA. Be direct. Tell viewers exactly what to do next and why.

FORMAT REQUIREMENTS:
- Write for the ear, not the eye. Use short sentences. Fragment sentences where natural. Avoid jargon unless the audience is technical.
- Include delivery cues in brackets where helpful: [pause], [slow down], [emphasise], [smile].
- Mark natural breath points with " / " and longer pauses with " // ".
- Output the script as plain spoken text - no bullet points in the final script body.
- Target word count: 400-600 words for a 3-5 minute video.

Do not summarise - transform. The script should feel like an original piece, not a transcription.`,
    sourceFilter: "youtube",
    outputFilter: "long-video",
    difficulty: "beginner",
    emoji: "▶️",
  },

  {
    id: "opt-02",
    title: "Website to Explainer Video Script",
    description: "Convert any company or product website into a clear, compelling explainer video script.",
    inputSource: "Website URL",
    inputType: "url",
    outputType: "Explainer video script with voiceover cues",
    bestFor: ["Startups", "SaaS companies", "Agency pitch videos", "Product marketing teams"],
    defaultPlatform: "Website / Wistia",
    defaultTone: "professional and clear",
    defaultLength: "short (60-90 sec)",
    scriptStructure: [
      "Problem statement (0-15 sec): the pain the audience feels",
      "Solution reveal (15-30 sec): product introduced as the answer",
      "How it works (30-60 sec): 3 core features or steps",
      "Social proof (60-75 sec): customer outcome or stat",
      "CTA (75-90 sec): start free trial / book a demo",
    ],
    placeholderInput: "https://www.yourproduct.com",
    promptTemplate: `You are a professional explainer video scriptwriter with expertise in B2B and SaaS marketing. Your task is to read the following website content and produce a concise, persuasive explainer video script.

SOURCE CONTENT:
{content}

SCRIPT PARAMETERS:
- Platform: {platform}
- Tone: {tone}
- Target length: {length}
- Audience: {audience}

INSTRUCTIONS:

1. PROBLEM STATEMENT (first 15 seconds): Open by naming the specific pain your target audience experiences. Be precise - avoid generic complaints. Use the language your customer would use to describe the problem themselves.

2. SOLUTION REVEAL (15-30 seconds): Introduce the product as the natural answer to the problem. Do not list features yet. Focus on the transformation: "What if you could [outcome] without [pain]?"

3. HOW IT WORKS (30-60 seconds): Distill the product into 2-3 simple steps or core capabilities. Use active, concrete language. Avoid technical jargon unless the audience is technical ({audience}). Each step should connect clearly to a benefit, not just a function.

4. SOCIAL PROOF OR OUTCOME STAT (60-75 seconds): Insert one compelling customer outcome, testimonial phrase, or statistic. If the website provides specific numbers (e.g., "saves 5 hours per week"), use them. If not, frame the outcome in general but credible terms.

5. CALL TO ACTION (75-90 seconds): Close with a single, clear next step. Match the CTA to the audience's buying stage. If early-stage: "Start for free." If decision-stage: "Book a 15-minute demo."

FORMAT REQUIREMENTS:
- Write for voiceover delivery. Short, punchy sentences. Conversational contractions.
- Tone must match: {tone}.
- Target word count: 150-225 words (60-90 seconds at natural speaking pace).
- Include [VISUAL CUE] notes in brackets where animation or on-screen text would reinforce the script.
- Do not include B-roll descriptions. Focus entirely on the spoken script.`,
    sourceFilter: "website",
    outputFilter: "short-video",
    difficulty: "beginner",
    emoji: "🌐",
  },

  {
    id: "opt-03",
    title: "Article to TikTok Script",
    description: "Transform a blog post or news article into a punchy, scroll-stopping TikTok or Reels script.",
    inputSource: "Article or blog post URL",
    inputType: "url",
    outputType: "Short-form vertical video script",
    bestFor: ["Creator economy", "News commentary", "Educational content", "Trending topics"],
    defaultPlatform: "TikTok / Instagram Reels",
    defaultTone: "energetic and direct",
    defaultLength: "very short (30-60 sec)",
    scriptStructure: [
      "Pattern interrupt (0-3 sec): bold visual hook line",
      "Setup (3-10 sec): what the article is about in one sentence",
      "3 punchy takeaways (10-45 sec): one idea per 10-12 seconds",
      "Opinion/reaction (45-55 sec): your hot take",
      "Engagement hook (55-60 sec): question or comment prompt",
    ],
    placeholderInput: "https://www.nytimes.com/article...",
    promptTemplate: `You are a viral short-form content creator who writes scripts for TikTok and Instagram Reels. Your scripts are fast-paced, direct, and engineered for maximum retention. Transform the following article into a TikTok-style script.

SOURCE CONTENT:
{content}

SCRIPT PARAMETERS:
- Platform: {platform}
- Tone: {tone}
- Target length: {length}
- Audience: {audience}

INSTRUCTIONS:

1. PATTERN INTERRUPT (first 3 seconds - this is everything): Write a single opening line that stops the scroll. Options: a counterintuitive statement, a number that shocks, a question that creates instant FOMO, or a bold claim that needs justification. The viewer decides to stay or scroll in the first 2 seconds. Make it impossible to scroll past.

2. SETUP (3-10 seconds): In one sentence, tell the viewer what they are going to learn or see. Be specific. "I read this article so you don't have to" is a valid framing if it fits the tone.

3. THREE PUNCHY TAKEAWAYS (10-45 seconds): Extract the 3 most surprising, useful, or controversial ideas from the source article. Present each one as a bold topic sentence then one supporting detail or example. Keep each takeaway under 12 seconds of speaking time.

4. OPINION / HOT TAKE (45-55 seconds): Add your reaction or editorial opinion. This is what makes the content feel like a person, not a summary bot. Be willing to take a stance.

5. ENGAGEMENT HOOK (final 5 seconds): End with a direct question to the viewer or a provocative statement that invites them to comment. "Tell me I'm wrong" or "Which of these surprised you most?" work well.

FORMAT REQUIREMENTS:
- Tone: {tone}. TikTok tone is conversational, energetic, and fast.
- Sentences must be short. Maximum 10 words per sentence. Use fragments.
- Write as if speaking aloud to a friend - not presenting to a boardroom.
- Target word count: 80-150 words (30-60 seconds at rapid speaking pace).
- Do not use formal transitions. Use: "Here's the thing-", "But wait-", "And honestly-", "The crazy part is-".`,
    sourceFilter: "article",
    outputFilter: "short-video",
    difficulty: "beginner",
    emoji: "🎵",
  },

  {
    id: "opt-04",
    title: "YouTube Summary to LinkedIn Post Script",
    description: "Extract the key insight from a YouTube video and turn it into a LinkedIn thought-leadership script.",
    inputSource: "YouTube video URL",
    inputType: "youtube",
    outputType: "LinkedIn video script / written post script",
    bestFor: ["Executives", "Consultants", "Founders", "Thought leaders", "B2B content creators"],
    defaultPlatform: "LinkedIn",
    defaultTone: "professional and insightful",
    defaultLength: "short (60-90 sec)",
    scriptStructure: [
      "Opening hook: a personal observation or provocative insight",
      "Source reference: 'I was watching X and it made me think...'",
      "Core insight: the one idea worth sharing",
      "Personal connection: how it relates to your experience or industry",
      "Call to engage: a question to spark comments",
    ],
    placeholderInput: "https://www.youtube.com/watch?v=...",
    promptTemplate: `You are a LinkedIn content strategist who helps executives and founders build thought leadership. Your task is to transform the following YouTube video content into a LinkedIn post or short video script that positions the author as an insightful, trusted voice in their field.

SOURCE CONTENT:
{content}

SCRIPT PARAMETERS:
- Platform: {platform}
- Tone: {tone}
- Target length: {length}
- Audience: {audience}

INSTRUCTIONS:

1. OPENING LINE (critical - this determines whether the post is read): Do not start with "I" as the first word. Instead, open with a provocative observation, a surprising stat, or a question. Example: "Most [industry] leaders are getting [topic] backwards."

2. BRIDGE TO SOURCE: Reference the YouTube video naturally. Example: "I was watching [creator/channel name] talk about [topic] and one idea stopped me cold." This establishes credibility and gives credit while positioning you as a curator of valuable content.

3. CORE INSIGHT (the heart of the post): Identify the single most valuable idea from the video. Explain it in your own words. Add context that makes it relevant to your specific audience ({audience}). This section should feel like a genuine "aha" moment - not a summary.

4. PERSONAL CONNECTION: Briefly connect the insight to your own experience, company, or professional perspective. Keep this to 2-3 sentences. This is what makes the post feel original rather than derivative.

5. ENGAGEMENT QUESTION: End with an open question that invites your network to respond. Specific questions outperform generic ones: "How is your team approaching [specific challenge]?" beats "What do you think?"

FORMAT REQUIREMENTS:
- Tone: {tone}. LinkedIn tone should be professional but human - never corporate-stiff.
- Use short paragraphs. One to two sentences per paragraph maximum.
- If writing for a video script, include natural pauses and speaking cues.
- Target word count: 150-250 words (60-90 seconds for video; 150-200 words for written post).
- No hashtag stuffing. Maximum 3 relevant hashtags at the end if desired.`,
    sourceFilter: "youtube",
    outputFilter: "linkedin",
    difficulty: "intermediate",
    emoji: "💼",
  },

  {
    id: "opt-05",
    title: "Product Page to Sales Script",
    description: "Turn a product or e-commerce page into a persuasive sales call or video sales letter script.",
    inputSource: "Product page URL",
    inputType: "url",
    outputType: "Sales call script or VSL (video sales letter)",
    bestFor: ["Sales reps", "E-commerce brands", "Product marketers", "SaaS demos"],
    defaultPlatform: "Sales call / Loom video",
    defaultTone: "persuasive and benefit-driven",
    defaultLength: "medium (2-4 min)",
    scriptStructure: [
      "Pain-first opening: the problem the prospect is living with",
      "Empathy bridge: 'You're not alone - here's why this is hard'",
      "Solution reveal: product introduced as the answer",
      "Feature to benefit translation: 3 features reframed as outcomes",
      "Objection pre-empt: address the top 1-2 hesitations",
      "Close: specific next step with urgency or scarcity",
    ],
    placeholderInput: "https://www.yourproduct.com/product-name",
    promptTemplate: `You are a world-class sales copywriter and script coach. Your task is to transform the following product page content into a high-converting sales script suitable for a video sales letter (VSL), sales call, or recorded demo.

SOURCE CONTENT:
{content}

SCRIPT PARAMETERS:
- Platform: {platform}
- Tone: {tone}
- Target length: {length}
- Audience: {audience}

INSTRUCTIONS:

1. PAIN-FIRST OPENING (first 20 seconds): Do NOT open with the product name or a feature. Open by describing the specific, felt pain that your audience experiences. Be granular. "You're spending 3 hours every Monday morning pulling reports from four different tools" is more powerful than "You waste time on manual work." The prospect should feel seen before the product is mentioned.

2. EMPATHY BRIDGE (20-40 seconds): Acknowledge that the problem is not the prospect's fault. It's a systemic or industry issue. This lowers defensiveness and builds trust before you move into solution mode.

3. SOLUTION REVEAL (40-60 seconds): Introduce the product as the natural, inevitable answer to the pain you just described. Lead with the transformation: "What if [outcome] was possible without [pain]?" Then name the product.

4. FEATURE TO BENEFIT TRANSLATION (60-150 seconds): Take the 3 most important product features and translate each from a feature statement into a benefit outcome. Format: "[Feature] means you can [specific outcome], which means [emotional or business result]." Repeat three times.

5. OBJECTION PRE-EMPTION (150-180 seconds): Identify the 1-2 most common hesitations your audience has (price, complexity, time to value). Address each briefly and directly. Do not dismiss them - validate and reframe.

6. CLOSE (final 20-30 seconds): Give a specific, low-friction next step. Match the CTA to the buying stage. Include a reason to act now. End with confidence - not desperation.

FORMAT REQUIREMENTS:
- Tone: {tone}. Persuasive does not mean pushy. Authority and empathy create more conversions than urgency alone.
- Write every sentence for spoken delivery. No passive voice. No corporate language.
- Target word count: 350-600 words (2-4 minutes).
- Include [PAUSE] and [SLOW DOWN] delivery cues at key moments.`,
    sourceFilter: "product",
    outputFilter: "sales",
    difficulty: "intermediate",
    emoji: "🛍️",
  },

  {
    id: "opt-06",
    title: "PDF Report to Executive Briefing Script",
    description: "Condense a PDF report or whitepaper into a crisp, executive-ready internal briefing script.",
    inputSource: "PDF report or whitepaper (paste text or upload)",
    inputType: "text",
    outputType: "Internal executive briefing or all-hands presentation script",
    bestFor: ["Executives", "Chiefs of Staff", "Strategy teams", "Internal communications"],
    defaultPlatform: "All-hands / board meeting",
    defaultTone: "authoritative and concise",
    defaultLength: "short (2-3 min)",
    scriptStructure: [
      "One-line framing: what this report is and why it matters now",
      "Three key findings: numbered, crisp, data-backed",
      "Implication for our business: so-what for this specific audience",
      "Recommended action or decision: what leadership needs to decide",
      "Next steps: owner, timeline, follow-up",
    ],
    placeholderInput: "Paste the executive summary or key sections of your PDF here...",
    promptTemplate: `You are an expert executive communications advisor. Your task is to transform the following PDF report or research document into a crisp, executive-ready spoken briefing script for a senior leadership audience.

SOURCE CONTENT:
{content}

SCRIPT PARAMETERS:
- Platform: {platform}
- Tone: {tone}
- Target length: {length}
- Audience: {audience}

INSTRUCTIONS:

1. FRAMING STATEMENT (10 seconds): Open with a single sentence that tells the audience exactly what this report is and why it matters to them specifically. Example: "This is the Q3 market sizing report from Gartner, and it has a direct implication for our 2025 investment decisions."

2. THREE KEY FINDINGS (90 seconds): Extract the 3 most important data points, conclusions, or insights from the report. Present each as a bold declarative statement (the finding), one sentence of supporting context or evidence, and one sentence linking it to your organisation's situation. Number them clearly. This structure helps executives absorb and remember.

3. BUSINESS IMPLICATION (20-30 seconds): Synthesise the so-what. What does this report mean for THIS company, THIS team, THIS decision? Do not let the audience draw their own conclusion - lead them to yours.

4. RECOMMENDED DECISION OR ACTION (15 seconds): Propose a specific next step or frame the decision that needs to be made. Executives want to know: what do you need from them? Be explicit.

5. NEXT STEPS (15 seconds): Who is doing what, by when? Provide a clean handoff so the meeting ends with clarity, not ambiguity.

FORMAT REQUIREMENTS:
- Tone: {tone}. Executive briefings must be tight. Every sentence earns its place or gets cut.
- No background sections. No methodology. No caveats unless they materially change the conclusion.
- Write for a room of senior leaders who have 90 other things competing for their attention.
- Target word count: 300-450 words (2-3 minutes).
- Use data precisely. Round numbers where exact figures are not critical. Never say "a lot" or "significant" - quantify.`,
    sourceFilter: "pdf",
    outputFilter: "internal",
    difficulty: "advanced",
    emoji: "📄",
  },

  {
    id: "opt-07",
    title: "Podcast Episode to Short Video Script",
    description: "Extract the most shareable moment from a podcast episode and script it for a short-form video clip.",
    inputSource: "Podcast episode URL or transcript",
    inputType: "url",
    outputType: "Short-form audiogram or talking-head video script",
    bestFor: ["Podcasters", "Content repurposers", "Interview show hosts", "Thought leaders"],
    defaultPlatform: "Instagram Reels / YouTube Shorts",
    defaultTone: "conversational and authentic",
    defaultLength: "very short (45-60 sec)",
    scriptStructure: [
      "Clip hook: the most quotable line or insight",
      "Context setup: 'In a recent episode of [show]...'",
      "Expanded explanation: 20-30 seconds of the core idea",
      "Practical takeaway: what the viewer can do with this",
      "Follow CTA: 'Full episode linked in bio'",
    ],
    placeholderInput: "https://podcasts.apple.com/episode/... or paste transcript",
    promptTemplate: `You are a podcast content strategist who specialises in repurposing long-form audio into viral short-form video clips. Your task is to find the most shareable moment from the following podcast content and write a polished short video script.

SOURCE CONTENT:
{content}

SCRIPT PARAMETERS:
- Platform: {platform}
- Tone: {tone}
- Target length: {length}
- Audience: {audience}

INSTRUCTIONS:

1. IDENTIFY THE SHAREABLE MOMENT: First, scan the source content and identify the single most quotable, surprising, or emotionally resonant idea. This is your anchor. Everything else supports it.

2. CLIP HOOK (first 5 seconds): Open with the core insight stated boldly - either as a direct quote, a paraphrase, or a setup question. The viewer should immediately feel that what they are about to hear is worth 45 seconds of their time.

3. CONTEXT SETUP (5-15 seconds): Briefly introduce the source. "I was talking to [Guest Name] on [Podcast Name] and they said something that completely shifted my thinking on [topic]." Keep this tight.

4. EXPANDED EXPLANATION (15-45 seconds): Unpack the insight in your own words or by paraphrasing the guest's key reasoning. Add one concrete example or analogy that makes the abstract idea tangible. This is where you create genuine value - not by transcribing, but by translating the idea for a short-form audience.

5. PRACTICAL TAKEAWAY (45-55 seconds): Give the viewer one specific thing they can do, think about, or question as a result of this insight. "The next time you [situation], try [action]."

6. FOLLOW CTA (55-60 seconds): Direct viewers to the full episode. Keep it natural: "Full conversation is linked in bio - it's worth the listen."

FORMAT REQUIREMENTS:
- Tone: {tone}. Podcast clips perform best when they feel authentic and slightly unpolished.
- Write as if you are speaking directly to one person who is scrolling past.
- Target word count: 100-160 words (45-60 seconds).
- Include [PAUSE] cues after the hook and before the CTA.`,
    sourceFilter: "podcast",
    outputFilter: "short-video",
    difficulty: "beginner",
    emoji: "🎙️",
  },

  {
    id: "opt-08",
    title: "Competitor Website to Pitch Script",
    description: "Analyse a competitor's website and generate a competitive positioning pitch script.",
    inputSource: "Competitor website URL",
    inputType: "url",
    outputType: "Competitive battle card pitch script",
    bestFor: ["Sales teams", "Founders", "Competitive intelligence", "Sales enablement"],
    defaultPlatform: "Sales call / pitch deck narration",
    defaultTone: "confident and differentiated",
    defaultLength: "medium (2-3 min)",
    scriptStructure: [
      "Acknowledge the competitor: 'You may have heard of [Competitor]...'",
      "Identify their core claim",
      "Name the gap: what they don't do or don't do well",
      "Your differentiation: what you do instead and why it matters",
      "Proof point: customer story or stat that validates the difference",
      "Positioning summary: one-sentence why-us statement",
    ],
    placeholderInput: "https://www.competitor.com",
    promptTemplate: `You are a B2B sales strategist and competitive intelligence expert. Your task is to analyse the following competitor website content and write a confident, professional competitive positioning pitch script for a sales team to use in conversations with prospects.

SOURCE CONTENT:
{content}

SCRIPT PARAMETERS:
- Platform: {platform}
- Tone: {tone}
- Target length: {length}
- Audience: {audience}

INSTRUCTIONS:

1. ACKNOWLEDGE WITHOUT DIMINISHING (first 20 seconds): Open by acknowledging the competitor respectfully. Never disparage. "You may have come across [Competitor] - they are a solid option for [specific use case]. Here's how we're different, and why that matters for your situation."

2. IDENTIFY THEIR CORE CLAIM (20-40 seconds): Articulate what the competitor says they do best, based on their website. This demonstrates that you have done your homework and understand the landscape - which builds your credibility.

3. NAME THE GAP (40-75 seconds): Identify 1-2 specific limitations, trade-offs, or underserved needs that their positioning reveals. Frame this as an unmet need, not an attack. "Where [Competitor] excels at [X], many teams in your position find they need [Y] - which is where the difference becomes meaningful."

4. YOUR DIFFERENTIATION (75-120 seconds): Present your 2-3 key differentiators explicitly tied to the gaps you just named. Each differentiator should follow this structure: "[We do X], which means [prospect outcome], unlike [what competitor requires]."

5. PROOF POINT (120-155 seconds): Insert a customer example, case study stat, or review quote that validates your differentiation. Specificity matters: "A team just like yours at [Company Type] reduced [metric] by [amount] after switching."

6. POSITIONING CLOSE (final 15 seconds): Deliver a clean, memorable one-sentence summary of why prospects choose you over the competition. Then ask a qualifying question to move the conversation forward.

FORMAT REQUIREMENTS:
- Tone: {tone}. Confidence without arrogance. You are not attacking - you are clarifying.
- Never say the competitor is bad. Say you are different. Let the prospect draw their own conclusion.
- Target word count: 350-500 words (2-3 minutes).
- Include natural transition phrases between sections.`,
    sourceFilter: "website",
    outputFilter: "sales",
    difficulty: "advanced",
    emoji: "⚔️",
  },

  {
    id: "opt-09",
    title: "Research Paper to Simple Explainer Script",
    description: "Translate a complex academic paper into an accessible, jargon-free educational video script.",
    inputSource: "Research paper PDF or abstract URL",
    inputType: "text",
    outputType: "Educational explainer video script",
    bestFor: ["Science communicators", "EdTech creators", "Professors", "Academic outreach teams"],
    defaultPlatform: "YouTube / educational platform",
    defaultTone: "clear and curious",
    defaultLength: "medium (3-5 min)",
    scriptStructure: [
      "Why does this research matter? (relatable stakes)",
      "What question were the researchers trying to answer?",
      "How did they approach it? (method in simple terms)",
      "What did they find? (key result, plain language)",
      "What does it change or mean for everyday life?",
      "What's still unknown? (intellectual humility close)",
    ],
    placeholderInput: "Paste the abstract, introduction, and key findings of the research paper here...",
    promptTemplate: `You are a science communicator and educational video scriptwriter. Your task is to take the following academic research paper or abstract and transform it into a clear, engaging educational video script that a general audience can understand and appreciate.

SOURCE CONTENT:
{content}

SCRIPT PARAMETERS:
- Platform: {platform}
- Tone: {tone}
- Target length: {length}
- Audience: {audience}

INSTRUCTIONS:

1. RELATABLE STAKES OPENING (first 30 seconds): Do not open with "Researchers at [University] have discovered..." Instead, open with why this research matters to ordinary people. Connect the research topic to a question, fear, or curiosity that your audience has in their daily life. Make them care before you tell them what was studied.

2. THE RESEARCH QUESTION (30-60 seconds): In plain language, explain what the scientists were trying to figure out. Frame it as a genuine mystery or puzzle - because it was. Use accessible analogies where possible.

3. THE METHOD - SIMPLY (60-120 seconds): Explain how they studied it without jargon. Focus on the logic: "To test this, they [simplified description of approach]." If the method is genuinely complex, pick the one detail that best illustrates the ingenuity or rigour of the study.

4. THE KEY FINDINGS (120-210 seconds): Present the 2-3 most important results. For each: state the finding in one sentence, explain what it means in plain language, and give one concrete implication or example. Avoid hedging language that drains impact.

5. REAL-WORLD MEANING (210-270 seconds): So what? What changes - or could change - as a result of this finding? Be specific about who benefits and how.

6. INTELLECTUAL HUMILITY CLOSE (final 30 seconds): Acknowledge what the research did not answer or what the next questions are. This models good scientific thinking and invites curiosity rather than false certainty.

FORMAT REQUIREMENTS:
- Use zero jargon unless you immediately define it in plain language.
- Replace every technical term with an analogy or plain-language equivalent.
- Tone: {tone}. Curious and enthusiastic, not dry or academic.
- Target word count: 450-700 words (3-5 minutes).`,
    sourceFilter: "pdf",
    outputFilter: "education",
    difficulty: "advanced",
    emoji: "🔬",
  },

  {
    id: "opt-10",
    title: "Blog Post to Webinar Script",
    description: "Expand a blog post into a structured, engaging 20-30 minute webinar presentation script.",
    inputSource: "Blog post URL",
    inputType: "url",
    outputType: "Full webinar script with Q&A prompts",
    bestFor: ["B2B marketers", "Educators", "Thought leaders", "SaaS companies", "Consultants"],
    defaultPlatform: "Zoom / Webinar",
    defaultTone: "authoritative and engaging",
    defaultLength: "long (20-30 min)",
    scriptStructure: [
      "Welcome and housekeeping (2 min)",
      "Speaker credibility intro (2 min)",
      "Agenda and promise (1 min)",
      "Section 1: Problem / Context (5 min)",
      "Section 2: Framework / Approach (8 min)",
      "Section 3: Case study or example (5 min)",
      "Takeaways and action steps (3 min)",
      "Q&A transition and CTA (4 min)",
    ],
    placeholderInput: "https://www.yourblog.com/post-title",
    promptTemplate: `You are a webinar script specialist who helps B2B companies and educators turn written content into engaging live presentations. Transform the following blog post into a complete webinar script with speaker notes.

SOURCE CONTENT:
{content}

SCRIPT PARAMETERS:
- Platform: {platform}
- Tone: {tone}
- Target length: {length}
- Audience: {audience}

INSTRUCTIONS:

1. WELCOME AND HOUSEKEEPING (2 minutes): Write a warm, professional opening that welcomes attendees, acknowledges that people may be joining late, and covers any logistics (recording notice, chat, Q&A format). Set a collaborative tone.

2. SPEAKER CREDIBILITY INTRO (2 minutes): Establish why the presenter is qualified to speak on this topic. Include 2-3 specific credentials, projects, or results. Keep it confident - not boastful.

3. AGENDA AND PROMISE (1 minute): Lay out exactly what the audience will learn. Frame it as a promise: "By the end of today, you'll have [specific takeaway]." This is a commitment device that keeps attendees engaged.

4. SECTION 1 - PROBLEM/CONTEXT (5 minutes): Expand the blog's opening premise into a richer context section. Add data, industry trends, or audience experience acknowledgment. Include 2-3 poll or rhetorical questions to keep engagement high: "How many of you have experienced [situation]? Drop a yes in the chat."

5. SECTION 2 - FRAMEWORK/APPROACH (8 minutes): This is the teaching section. Break the blog's core content into a clear, numbered or named framework. Each element needs: a label, a one-sentence explanation, and a practical example. Include transition phrases between elements.

6. SECTION 3 - CASE STUDY (5 minutes): Construct or reference a specific example that shows the framework in action. Tell it as a story: situation, challenge, approach, result. Make it concrete and relevant to the audience ({audience}).

7. TAKEAWAYS AND ACTION STEPS (3 minutes): Summarise the 3 things attendees should remember and the 1 specific thing they should do within 48 hours of the webinar.

8. Q&A TRANSITION AND CTA (4 minutes): Bridge to Q&A with a clear invitation. End with a specific CTA tied to the business goal.

FORMAT REQUIREMENTS:
- Tone: {tone}. Webinar tone should be warm, authoritative, and paced for engagement.
- Include [SLIDE TRANSITION] markers and [POLL] prompts where relevant.
- Write full sentences as if the presenter is speaking them aloud.
- Target word count: 2,800-4,200 words (20-30 minutes at natural presentation pace).`,
    sourceFilter: "article",
    outputFilter: "webinar",
    difficulty: "advanced",
    emoji: "📡",
  },

  {
    id: "opt-11",
    title: "News Link to Commentary Script",
    description: "Turn a breaking news article into an opinionated, creator-style commentary video script.",
    inputSource: "News article URL",
    inputType: "url",
    outputType: "Creator commentary video script",
    bestFor: ["News commentary creators", "Opinion channels", "Political educators", "Business news channels"],
    defaultPlatform: "YouTube / TikTok",
    defaultTone: "opinionated and direct",
    defaultLength: "short (60-90 sec)",
    scriptStructure: [
      "Breaking hook: what just happened (5 sec)",
      "Why it matters: stakes for the viewer (15 sec)",
      "The narrative mainstream media is using (15 sec)",
      "Your take: the angle they're missing (30 sec)",
      "What to watch for next: forward-looking close (15 sec)",
    ],
    placeholderInput: "https://www.bbc.com/news/article...",
    promptTemplate: `You are a news commentary video creator with a distinct editorial voice. Your task is to transform the following news article into a punchy, opinionated short-form commentary script that gives viewers a perspective they won't get from the headline alone.

SOURCE CONTENT:
{content}

SCRIPT PARAMETERS:
- Platform: {platform}
- Tone: {tone}
- Target length: {length}
- Audience: {audience}

INSTRUCTIONS:

1. BREAKING HOOK (first 5 seconds): Open with the news in one sharp sentence. Not a question - a statement. Make it feel immediate: "Something just happened that almost nobody is talking about correctly."

2. WHY IT MATTERS (5-20 seconds): Explain the stakes for your specific audience ({audience}). What does this news mean for their lives, industry, or worldview? Be explicit: "Here's why this affects you, not just the people in the headline."

3. THE MAINSTREAM NARRATIVE (20-35 seconds): Steel-man the conventional take. What is the dominant framing of this story in the news cycle? Represent it fairly before you challenge it. This builds credibility.

4. YOUR TAKE - THE ANGLE THEY'RE MISSING (35-75 seconds): This is the value you add. Present an alternative reading, a context the news coverage ignored, a historical parallel, or a structural insight that changes how the viewer interprets the event.

5. WHAT TO WATCH NEXT (75-90 seconds): Close with a forward-looking prediction or watch point. "In the next 30 days, look for..." or "The real question this raises is..." This makes your content sticky.

FORMAT REQUIREMENTS:
- Tone: {tone}. Opinionated does not mean reckless. Be willing to take a clear stance, but ground it in facts.
- Write fast. Short sentences. Minimal hedging. This is commentary, not analysis.
- Target word count: 150-225 words (60-90 seconds).
- No "both sides" false balance. Have a perspective. Your audience came for yours.`,
    sourceFilter: "article",
    outputFilter: "short-video",
    difficulty: "intermediate",
    emoji: "📰",
  },

  {
    id: "opt-12",
    title: "Course Lesson to Teaching Script",
    description: "Convert course notes or lesson outlines into a polished, student-engaging teaching script.",
    inputSource: "Course notes or lesson outline (paste text)",
    inputType: "text",
    outputType: "Teaching video script with student engagement prompts",
    bestFor: ["Online course creators", "Educators", "Corporate trainers", "EdTech platforms"],
    defaultPlatform: "Teachable / Thinkific / LMS",
    defaultTone: "clear and encouraging",
    defaultLength: "medium (8-12 min)",
    scriptStructure: [
      "Lesson intro: what we'll cover and the learning outcome",
      "Concept 1: explain + example + check-in question",
      "Concept 2: explain + example + check-in question",
      "Concept 3: explain + example + check-in question",
      "Summary: recap the three concepts in one sentence each",
      "Assignment or reflection prompt",
    ],
    placeholderInput: "Paste your lesson outline, bullet points, or draft notes here...",
    promptTemplate: `You are an instructional design expert and online course scriptwriter. Your task is to transform the following lesson notes or outline into a complete, engaging teaching script for an online course video.

SOURCE CONTENT:
{content}

SCRIPT PARAMETERS:
- Platform: {platform}
- Tone: {tone}
- Target length: {length}
- Audience: {audience}

INSTRUCTIONS:

1. LESSON INTRODUCTION (60-90 seconds): Open by clearly stating what the student will be able to do by the end of this lesson - frame it as a capability, not a topic. "By the end of this lesson, you'll be able to [specific skill or action]." Then briefly explain why this lesson matters in the context of the broader course.

2. CONCEPT DELIVERY (3 repetitions): For each key concept in the lesson notes, write three components. First, EXPLANATION: introduce the concept in plain language using the "tell them once simply, then tell them again with depth" approach. Second, EXAMPLE: ground the concept with a specific, relatable example that matches the student's experience level ({audience}). Third, CHECK-IN QUESTION: include a rhetorical question or pause that encourages students to actively think: "Pause here and ask yourself: [application question]."

3. TRANSITIONS: Write natural, spoken transitions between concepts that remind students where they are in the lesson.

4. SUMMARY (90 seconds): Recap all three concepts in one sentence each. Use a slightly different framing than the original explanation to reinforce memory through varied encoding.

5. ASSIGNMENT OR REFLECTION PROMPT (30 seconds): Give students one specific action to take before the next lesson. Frame it as an experiment or reflection, not a homework task.

FORMAT REQUIREMENTS:
- Tone: {tone}. Teaching tone should be warm, clear, and encouraging - never condescending.
- Speak directly to the student using "you." Create a one-on-one learning atmosphere.
- Include [PAUSE FOR THOUGHT] and [SHOW EXAMPLE GRAPHIC] cues where appropriate.
- Target word count: 1,200-1,800 words (8-12 minutes at teaching pace).`,
    sourceFilter: "notes",
    outputFilter: "education",
    difficulty: "intermediate",
    emoji: "🎓",
  },

  {
    id: "opt-13",
    title: "Reddit Thread to Creator Script",
    description: "Transform a viral Reddit discussion into an entertaining, insight-packed creator video script.",
    inputSource: "Reddit thread URL",
    inputType: "url",
    outputType: "Creator-style commentary or reaction video script",
    bestFor: ["YouTube creators", "Podcast hosts", "TikTok personalities", "Reaction content channels"],
    defaultPlatform: "YouTube / TikTok",
    defaultTone: "entertaining and relatable",
    defaultLength: "short (60-90 sec)",
    scriptStructure: [
      "Setup: what's the thread about and why it's interesting",
      "Top comment 1: read + your reaction",
      "Top comment 2: read + your reaction",
      "Surprising twist or most controversial take",
      "Your overall verdict or takeaway",
    ],
    placeholderInput: "https://www.reddit.com/r/subreddit/comments/...",
    promptTemplate: `You are a creator who excels at turning Reddit threads into entertaining, engaging video scripts. Your goal is to take the following Reddit thread content and transform it into a script that feels genuine, fun, and insightful - like a smart friend sharing the best parts of a thread they found.

SOURCE CONTENT:
{content}

SCRIPT PARAMETERS:
- Platform: {platform}
- Tone: {tone}
- Target length: {length}
- Audience: {audience}

INSTRUCTIONS:

1. THREAD SETUP (first 15 seconds): Introduce the Reddit thread in a way that makes it sound irresistible. Don't just say the title - sell why this thread is worth 60 seconds. "I fell down a Reddit rabbit hole last night and found a thread that completely changed how I think about [topic]." Or: "Someone asked Reddit [question] and the answers are wild."

2. TOP COMMENTS WITH REACTION (15-60 seconds): Select the 2-3 most interesting, surprising, or controversial comments from the thread. For each: read or paraphrase the comment naturally, then give your authentic, conversational reaction, then add context, a personal connection, or a counterpoint that adds value beyond the comment itself. Your reactions are the content. The Reddit comments are the prompt.

3. THE WILDCARD (60-75 seconds): Find the most surprising, controversial, or funny moment in the thread - the comment that nobody saw coming. Build to it: "But then there's this one comment that I had to re-read three times."

4. YOUR VERDICT (75-90 seconds): Sum up what you actually think about the topic the thread was discussing. Agree, disagree, or add a dimension the thread missed. End with a question that invites your audience to share their take.

FORMAT REQUIREMENTS:
- Tone: {tone}. Entertaining and authentic - not trying too hard.
- Write in first person as the creator. The audience should feel like they are hanging out with someone smart and funny.
- Target word count: 150-225 words (60-90 seconds).
- No formal transitions. Use: "Okay but-", "And then-", "Wait, though-", "Here's the part that got me-".`,
    sourceFilter: "website",
    outputFilter: "short-video",
    difficulty: "beginner",
    emoji: "💬",
  },

  {
    id: "opt-14",
    title: "Product Review Page to Review Script",
    description: "Synthesise multiple product reviews into an honest, structured video review script.",
    inputSource: "Product review page URL (Amazon, G2, Trustpilot, etc.)",
    inputType: "url",
    outputType: "Video product review script",
    bestFor: ["Review YouTubers", "Affiliate creators", "Tech reviewers", "Consumer product channels"],
    defaultPlatform: "YouTube",
    defaultTone: "honest and balanced",
    defaultLength: "medium (4-6 min)",
    scriptStructure: [
      "Product intro: what it is and who it's for (30 sec)",
      "First impressions: unboxing or initial experience (60 sec)",
      "What reviewers love: top 3 praised features (90 sec)",
      "What reviewers dislike: top 2-3 criticisms (90 sec)",
      "Who it's best for vs. who should skip it (45 sec)",
      "Verdict and score (30 sec)",
    ],
    placeholderInput: "https://www.amazon.com/product/reviews/... or https://www.g2.com/products/...",
    promptTemplate: `You are a professional product reviewer who synthesises user feedback into honest, balanced, and engaging video review scripts. Transform the following product review page content into a complete review script.

SOURCE CONTENT:
{content}

SCRIPT PARAMETERS:
- Platform: {platform}
- Tone: {tone}
- Target length: {length}
- Audience: {audience}

INSTRUCTIONS:

1. PRODUCT INTRODUCTION (30 seconds): Introduce the product clearly: what it is, who makes it, the price point, and who it's designed for. Establish immediately whether this is a premium, mid-range, or budget product - this sets audience expectations.

2. FIRST IMPRESSIONS (60 seconds): Describe the initial experience as if you are the reviewer opening or using it for the first time. Draw from reviewer language in the source content. Cover packaging, build quality, and the out-of-the-box feeling. Be specific and sensory.

3. WHAT REVIEWERS LOVE - TOP STRENGTHS (90 seconds): Identify the 3 most consistently praised features or qualities across the reviews. For each: name the feature, quote or paraphrase a representative reviewer (anonymised), and explain why this matters to the target buyer. Don't just list features - explain their real-world impact.

4. WHAT REVIEWERS DISLIKE - KEY CRITICISMS (90 seconds): Identify the 2-3 most common complaints. Handle each the same way: name it, give evidence from reviews, and assess whether it's a dealbreaker or a minor annoyance. Being fair about negatives is what makes your reviews trustworthy.

5. WHO SHOULD BUY IT / WHO SHOULD SKIP IT (45 seconds): Give two clear personas: the ideal buyer for this product, and the buyer who would be better served by an alternative. This decision-framework section is the most useful thing you can give your audience.

6. VERDICT AND SCORE (30 seconds): Give a clear recommendation and, if appropriate, a score out of 10. Be direct. "If I had to buy this with my own money, I would / would not."

FORMAT REQUIREMENTS:
- Tone: {tone}. Honest and balanced - your audience trusts you because you don't shill.
- Write as a presenter who has done the research. First-person, direct, no hedging.
- Target word count: 600-900 words (4-6 minutes).
- Include [B-ROLL SUGGESTION] notes for visual content at key moments.`,
    sourceFilter: "product",
    outputFilter: "review",
    difficulty: "intermediate",
    emoji: "⭐",
  },

  {
    id: "opt-15",
    title: "Transcript to Better Spoken Script",
    description: "Polish a rough transcript or recording into a clean, natural, well-structured spoken script.",
    inputSource: "Raw transcript or meeting recording transcript (paste text)",
    inputType: "text",
    outputType: "Polished, speaker-ready spoken script",
    bestFor: ["Podcasters", "Video editors", "Presenters", "Course creators", "Keynote speakers"],
    defaultPlatform: "Podcast / YouTube / Speaker reel",
    defaultTone: "natural and polished",
    defaultLength: "medium (match source)",
    scriptStructure: [
      "Clean opening: remove false starts and replace with a strong hook",
      "Core content: restructured for logical flow",
      "Transitions: added between major topic shifts",
      "Filler removal: ums, uhs, and repeated phrases cleaned",
      "Strong close: add a clear landing if the original trails off",
    ],
    placeholderInput: "Paste your raw transcript here - including filler words, false starts, and repetitions...",
    promptTemplate: `You are a professional script editor and speech writer who specialises in turning rough, improvised transcripts into polished, natural-sounding spoken scripts. Your task is to take the following raw transcript and rewrite it as a clean, engaging, speaker-ready script - without losing the speaker's authentic voice.

SOURCE CONTENT:
{content}

SCRIPT PARAMETERS:
- Platform: {platform}
- Tone: {tone}
- Target length: {length}
- Audience: {audience}

INSTRUCTIONS:

1. PRESERVE THE VOICE: Before editing, identify the speaker's natural tone, vocabulary level, and personality. The polished script must sound like an improved version of the same person - not a different person. Note distinctive phrases, rhythms, or idioms that are part of their style and retain them.

2. OPEN WITH STRENGTH: The original transcript likely has a weak or rambling opening. Rewrite the first 30 seconds as a strong hook. Find the most interesting or important idea in the entire transcript and move it to the top. Cut everything that was said before the speaker "found their groove."

3. RESTRUCTURE FOR FLOW: Identify the 3-5 main ideas in the transcript. Reorder them if necessary for logical progression: context before content, problem before solution, general before specific. Add clear verbal transitions between sections.

4. REMOVE FRICTION: Cut all filler words (um, uh, like, you know, sort of), false starts, excessive repetition, and tangents that do not serve the main point. The goal is a clean script that sounds effortless.

5. POLISH THE CLOSE: Many improvised talks trail off. Rewrite the final 30 seconds to include a clear, memorable landing: a call to action, a key insight restated, or a resonant final image.

FORMAT REQUIREMENTS:
- Tone: {tone}. Natural and conversational - this should sound spoken, not written.
- Mark suggested emphasis with bold text. Mark pauses with " / " (short) and " // " (medium).
- Target length: match or slightly reduce from source (remove inefficiency, not substance).
- Preserve all factual content, specific examples, and personal anecdotes from the original.
- Do not invent new content - only restructure, trim, and polish what is already there.`,
    sourceFilter: "transcript",
    outputFilter: "long-video",
    difficulty: "intermediate",
    emoji: "✍️",
  },

  {
    id: "opt-16",
    title: "Meeting Notes to Update Script",
    description: "Turn raw meeting notes into a crisp, professional internal update script for Slack, Loom, or email.",
    inputSource: "Meeting notes or action item list (paste text)",
    inputType: "text",
    outputType: "Internal team update script (video or written)",
    bestFor: ["Project managers", "Team leads", "Chiefs of Staff", "Remote teams", "Agile teams"],
    defaultPlatform: "Loom / Slack / internal email",
    defaultTone: "clear and professional",
    defaultLength: "very short (90 sec - 2 min)",
    scriptStructure: [
      "Status in one sentence: where things stand",
      "What was decided: 2-3 key decisions from the meeting",
      "What's next: action items with owners and dates",
      "Blockers or flags: anything that needs input or escalation",
      "Closing: next touchpoint or deadline",
    ],
    placeholderInput: "Paste your meeting notes, action items, or decision log here...",
    promptTemplate: `You are an expert in internal communications and team operations. Your task is to transform the following meeting notes into a concise, professional team update script suitable for a Loom video, Slack message, or internal email.

SOURCE CONTENT:
{content}

SCRIPT PARAMETERS:
- Platform: {platform}
- Tone: {tone}
- Target length: {length}
- Audience: {audience}

INSTRUCTIONS:

1. STATUS HEADLINE (10 seconds): Open with a single sentence that captures the current state of the project or topic. Think of it as a newspaper headline for the meeting: "The Q4 launch plan is confirmed and execution begins Monday." Avoid vague summaries like "we had a productive meeting."

2. KEY DECISIONS (20-30 seconds): List the 2-3 most important decisions made in the meeting. Format each as: "[Decision]: We've decided to [X] because [brief rationale]." Only include decisions - not discussions, debates, or considerations that were tabled.

3. ACTION ITEMS (30-40 seconds): List the specific next steps with owners and deadlines. Format: "[Owner] will [action] by [date]." Be precise. Ambiguous ownership is the leading cause of follow-through failure.

4. BLOCKERS OR ESCALATIONS (15 seconds): Flag anything that requires input from someone not in the meeting, a decision that's pending external information, or a risk that leadership should be aware of. If there are none, skip this section and say so briefly.

5. NEXT TOUCHPOINT (10 seconds): Close by stating the next meeting, deadline, or check-in point. This gives the audience a clear timeline and reduces follow-up messages.

FORMAT REQUIREMENTS:
- Tone: {tone}. Direct and professional. No filler phrases like "circling back" or "touching base." Say what happened and what's next.
- Write for the ear if this is a Loom/video script. Write for the eye (slightly tighter) if for Slack/email.
- Target word count: 200-350 words (90 seconds to 2 minutes).
- Use names for action item owners - not "the team" or "someone."
- No meeting context that is not actionable.`,
    sourceFilter: "notes",
    outputFilter: "internal",
    difficulty: "beginner",
    emoji: "📋",
  },

  {
    id: "opt-17",
    title: "Company Website to Founder Pitch",
    description: "Analyse a company website and generate a compelling founder-style investor or partnership pitch.",
    inputSource: "Company website URL",
    inputType: "url",
    outputType: "Founder pitch script (2-3 min elevator pitch)",
    bestFor: ["Founders", "Startup CEOs", "Pitch competitions", "Investor meetings", "Partnership conversations"],
    defaultPlatform: "Investor meeting / pitch competition",
    defaultTone: "visionary and confident",
    defaultLength: "short (2-3 min)",
    scriptStructure: [
      "The problem: vivid, felt description of the market gap",
      "Our solution: what we built and how it works (simply)",
      "Why now: market timing or tailwind",
      "Traction: the most compelling proof point",
      "The team: why we're the ones to build this",
      "The ask: specific, clear, and confident",
    ],
    placeholderInput: "https://www.yourcompany.com",
    promptTemplate: `You are a pitch coach and startup advisor who helps founders distill their story into a compelling, memorable 2-3 minute elevator pitch. Analyse the following company website and write a founder pitch script that is bold, clear, and investor-ready.

SOURCE CONTENT:
{content}

SCRIPT PARAMETERS:
- Platform: {platform}
- Tone: {tone}
- Target length: {length}
- Audience: {audience}

INSTRUCTIONS:

1. THE PROBLEM - MAKE THEM FEEL IT (20-30 seconds): Do not start with "We are [Company]." Start with the problem. Make it vivid and specific. The best pitches make the audience feel the pain before they hear the solution. Use a concrete scenario, a surprising stat, or a personal story format: "Every day, [specific group] faces [specific problem] that costs [specific consequence]."

2. THE SOLUTION - SIMPLY (20-30 seconds): Now introduce the company and product. In two sentences: what it is and what it does. Avoid jargon and feature lists. Focus on the transformation: "We built [X], which allows [customer] to [outcome] without [pain]."

3. WHY NOW - THE TIMING ARGUMENT (15-20 seconds): What has changed in the market, technology, or behaviour that makes this the right moment? The best pitches include a "why now" that makes the opportunity feel urgent and time-sensitive.

4. TRACTION - THE PROOF (20-30 seconds): Lead with your strongest proof point. Revenue, customer count, growth rate, enterprise customer names, waitlist size - whatever is most impressive. If you are pre-revenue, use user engagement metrics or a notable pilot. Make it specific and quantified.

5. THE TEAM - WHY YOU (15-20 seconds): Two to three sentences on why your team is uniquely positioned to win this market. Focus on relevant experience, domain expertise, and team dynamics. Avoid generic statements like "we're passionate" - show specific qualification.

6. THE ASK - CLEAR AND CONFIDENT (15 seconds): State exactly what you're raising, what you'll do with it, and what milestone it gets you to. Example: "We're raising $1.5M to achieve [specific milestone] within [timeframe]." Never apologise for asking. Be direct and confident.

FORMAT REQUIREMENTS:
- Tone: {tone}. Visionary but grounded. You're selling a future that is credible, not science fiction.
- Every sentence should be quotable. No wasted words.
- Target word count: 300-500 words (2-3 minutes).
- Write in first person as the founder. Include "I" and "we" naturally.
- Include [PAUSE FOR EFFECT] after the problem section and after the traction stat.`,
    sourceFilter: "website",
    outputFilter: "sales",
    difficulty: "advanced",
    emoji: "🚀",
  },

  {
    id: "opt-18",
    title: "Tutorial Page to Step-by-Step Script",
    description: "Convert a how-to tutorial page into a clear, easy-to-follow instructional video script.",
    inputSource: "Tutorial or how-to page URL",
    inputType: "url",
    outputType: "Step-by-step instructional video script",
    bestFor: ["Technical educators", "SaaS onboarding videos", "DIY content creators", "Documentation teams"],
    defaultPlatform: "YouTube / Product onboarding",
    defaultTone: "clear and encouraging",
    defaultLength: "medium (5-8 min)",
    scriptStructure: [
      "What we're building/doing and the end result (30 sec)",
      "Prerequisites or what you'll need (30 sec)",
      "Step 1 with visual description",
      "Step 2 with visual description",
      "Step 3+ as needed",
      "Common mistakes to avoid (30 sec)",
      "Congratulations and next steps (30 sec)",
    ],
    placeholderInput: "https://www.docs.yourproduct.com/tutorial or any how-to page URL",
    promptTemplate: `You are a technical instructional designer who creates clear, engaging step-by-step tutorial video scripts. Transform the following tutorial page into a complete video script that guides viewers through the process confidently and without confusion.

SOURCE CONTENT:
{content}

SCRIPT PARAMETERS:
- Platform: {platform}
- Tone: {tone}
- Target length: {length}
- Audience: {audience}

INSTRUCTIONS:

1. OUTCOME STATEMENT (30 seconds): Open by showing or describing what the viewer will have accomplished by the end of the tutorial. Create future-pacing: "In the next [X] minutes, you're going to [specific outcome]. Here's what that looks like [reference to finished result]." This motivates viewers to stay through the whole tutorial.

2. PREREQUISITES (30 seconds): Briefly list what the viewer needs before starting: software, accounts, files, prior knowledge. Frame prerequisites positively: "Before we start, make sure you have [X] - if you don't, I'll link a setup guide in the description."

3. STEP-BY-STEP INSTRUCTIONS: For each step in the tutorial, write: first, WHAT - a clear numbered statement of what this step accomplishes. Second, HOW - specific action-verb instructions for what to click, type, or do. Third, VISUAL CUE - [SHOW SCREEN: zoomed in on the relevant element] so the video editor knows what to display. Fourth, CHECKPOINT - a brief confirmation of what success looks like at the end of this step.

4. COMMON MISTAKES (30 seconds): Name the 1-2 most frequent errors learners make at this task and how to identify and fix them. This is often the most watched section of tutorial videos.

5. COMPLETION AND NEXT STEPS (30 seconds): Congratulate the viewer genuinely. Then provide a specific next step: the next tutorial in the series, a more advanced feature, or where to get help if something went wrong.

FORMAT REQUIREMENTS:
- Tone: {tone}. Patient, encouraging, and precise. Never make the viewer feel stupid for not knowing something.
- Use exact UI language: if a button says "Submit Request," say "Submit Request" - not "click send."
- Target word count: 800-1,400 words (5-8 minutes at instructional pace).
- Include [SCREEN RECORDING CUE] markers throughout for the video editor.`,
    sourceFilter: "website",
    outputFilter: "education",
    difficulty: "beginner",
    emoji: "🔧",
  },

  {
    id: "opt-19",
    title: "Multiple Links to One Script",
    description: "Synthesise content from multiple URLs into a single, unified long-form video script.",
    inputSource: "Multiple URLs (paste one per line)",
    inputType: "multi-url",
    outputType: "Comprehensive long-form video or presentation script",
    bestFor: ["Documentary-style videos", "Deep-dive YouTube essays", "Research synthesis", "Comprehensive reviews"],
    defaultPlatform: "YouTube",
    defaultTone: "authoritative and engaging",
    defaultLength: "long (10-20 min)",
    scriptStructure: [
      "Thesis and promise: what this video will prove or explore",
      "Source overview: the landscape of information you synthesised",
      "Section 1: first theme or argument with multi-source support",
      "Section 2: second theme with evidence and counterpoints",
      "Section 3: synthesis - what the sources agree on",
      "Section 4: what the sources disagree on and your take",
      "Conclusion: your thesis confirmed or complicated by the evidence",
    ],
    placeholderInput: "https://source1.com\nhttps://source2.com\nhttps://source3.com",
    promptTemplate: `You are a research-based video essayist who synthesises multiple sources into compelling, well-structured long-form video scripts. Your task is to read the following content from multiple sources and write a unified, authoritative video script that presents a coherent narrative.

SOURCE CONTENT (from multiple links):
{content}

SCRIPT PARAMETERS:
- Platform: {platform}
- Tone: {tone}
- Target length: {length}
- Audience: {audience}

INSTRUCTIONS:

1. ESTABLISH A THESIS (first 60 seconds): Unlike summary videos, this script must have a point of view. Before writing, identify the one central argument or insight that all your sources collectively support - or interestingly contradict. Open with that thesis, stated clearly and boldly.

2. SOURCE LANDSCAPE OVERVIEW (60-90 seconds): Briefly establish the scope of your research. Not a bibliography recitation - a credibility builder. "I went through [number] of sources including [types: academic papers, industry reports, interviews]. Here's what I found, and here's what surprised me."

3. SECTION DEVELOPMENT (3-4 sections, 2-4 minutes each): Develop each major theme or argument using evidence from multiple sources. For each section: state the section's thesis in one sentence, present supporting evidence from at least two sources attributed naturally, include a counterpoint or nuance from a source that complicates the picture, and end the section with an insight that advances the overall argument. Never cite a source without explaining its significance.

4. POINTS OF AGREEMENT AND DISAGREEMENT (2 minutes): Explicitly address what the sources agree on and where they diverge. "Interestingly, [Source A] and [Source B] reach opposite conclusions on [point]. Here's why that matters..."

5. CONCLUSION - YOUR SYNTHESIS (90 seconds): Return to your opening thesis and show how the evidence confirmed, complicated, or expanded it. End with a clear, memorable statement of what you want the audience to take away.

FORMAT REQUIREMENTS:
- Tone: {tone}. Authoritative and intellectually rigorous, but not dry.
- Cite sources naturally in spoken language. Not "(Smith, 2023)" - say "a 2023 McKinsey report found that..."
- Target word count: 1,600-3,000 words (10-20 minutes).
- Include [CHAPTER CARD: "Section 1: [Title]"] markers for video editing.`,
    sourceFilter: "multi",
    outputFilter: "long-video",
    difficulty: "advanced",
    emoji: "🔗",
  },

  {
    id: "opt-20",
    title: "Long Source to Short Viral Script",
    description: "Extract the single most shareable insight from any long-form source and write it as a viral short script.",
    inputSource: "Any URL, text, or content (article, PDF, video transcript, report)",
    inputType: "url",
    outputType: "Viral short-form video script (30-60 sec)",
    bestFor: ["Content repurposers", "Social media managers", "Growth hackers", "Creator economy brands"],
    defaultPlatform: "TikTok / Instagram Reels / YouTube Shorts",
    defaultTone: "punchy and memorable",
    defaultLength: "very short (30-60 sec)",
    scriptStructure: [
      "The single best idea from the source (stated boldly)",
      "Why most people don't know this (creates exclusivity)",
      "The insight explained simply (15 seconds)",
      "One concrete example or data point (10 seconds)",
      "Memorable one-liner close (5 seconds)",
    ],
    placeholderInput: "Paste any URL, text, or content - article, report, transcript, or YouTube link...",
    promptTemplate: `You are an expert at viral content extraction. Your superpower is reading any long-form source and finding the single most shareable, surprising, or valuable idea hidden inside it. Your task is to take the following content - regardless of type, length, or format - and write the best possible 30-60 second viral short video script from it.

SOURCE CONTENT:
{content}

SCRIPT PARAMETERS:
- Platform: {platform}
- Tone: {tone}
- Target length: {length}
- Audience: {audience}

INSTRUCTIONS:

STEP 1 - THE EXTRACTION (do this before writing): Read the entire source and identify the single most viral-worthy idea. Ask yourself: What in this source would make someone stop scrolling? What would make them say "wait, what?" or "I had no idea"? What would make them want to share it immediately? That idea - not the thesis, not the summary - is your script.

1. HOOK (first 3 seconds - non-negotiable): The hook must create an instant response: surprise, curiosity, or disagreement. Options: a counterintuitive stat, a challenge ("You've been doing [everyday thing] wrong your whole life"), or a promise ("One idea from [source] changed how I think about [topic] forever"). Write 5 versions and pick the sharpest.

2. THE EXCLUSIVITY FRAME (3-10 seconds): Make the viewer feel like they are about to learn something most people don't know. "This was buried on page 47 of a McKinsey report and almost nobody is talking about it." Or: "I read 200 pages so you don't have to. Here's the only thing that matters."

3. THE INSIGHT - EXPLAINED SIMPLY (10-40 seconds): State the idea. Explain it in plain language. Give one concrete example, analogy, or data point that makes it tangible. Do not add context, background, or qualifications - this is a viral clip, not a lecture. Every word must earn its place.

4. ONE-LINER CLOSE (final 5-10 seconds): End with a sentence the viewer will remember. Ideally something they'll want to screenshot or quote: a pithy restatement of the insight, a provocative question, or a challenge. "If that's true - what else are we getting wrong?"

FORMAT REQUIREMENTS:
- Tone: {tone}. Punchy, direct, and confident.
- Maximum sentence length: 10 words. Use fragments. Break grammar rules for rhythm.
- Target word count: 80-150 words (30-60 seconds at fast speaking pace).
- Never say "In this video." Never start with "So." Never end with "Let me know in the comments."
- The script is done when it can't be shorter without losing the idea.`,
    sourceFilter: "article",
    outputFilter: "short-video",
    difficulty: "beginner",
    emoji: "⚡",
  },
];
