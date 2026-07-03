// Useful vocabulary & phrase bank for speakers — organized by function.

export interface VocabItem {
  phrase: string;
  note: string; // when/how to use it, or a short example
}

export interface VocabCategory {
  id: string;
  title: string;
  emoji: string;
  blurb: string;
  items: VocabItem[];
}

export const VOCAB_CATEGORIES: VocabCategory[] = [
  {
    id: "transitions",
    title: "Linking & Transitions",
    emoji: "🔗",
    blurb: "Connect ideas smoothly so your speech flows.",
    items: [
      { phrase: "To begin with, …", note: "Start your first point." },
      { phrase: "What's more, …", note: "Add a stronger supporting point." },
      { phrase: "On top of that, …", note: "Stack another reason." },
      { phrase: "That said, …", note: "Introduce a contrast or concession." },
      { phrase: "Having said that, …", note: "Soften before disagreeing with yourself." },
      { phrase: "For that reason, …", note: "Show cause and effect." },
      { phrase: "In other words, …", note: "Rephrase to clarify." },
      { phrase: "To put it simply, …", note: "Simplify a complex idea." },
      { phrase: "All things considered, …", note: "Lead into a conclusion." },
      { phrase: "To sum up, …", note: "Signal your closing summary." },
    ],
  },
  {
    id: "opinions",
    title: "Giving Opinions",
    emoji: "💬",
    blurb: "State your view with confidence and range.",
    items: [
      { phrase: "From my perspective, …", note: "Natural alternative to 'in my opinion'." },
      { phrase: "The way I see it, …", note: "Conversational and confident." },
      { phrase: "I'm inclined to think that …", note: "A measured, thoughtful opinion." },
      { phrase: "If you ask me, …", note: "Informal, personal take." },
      { phrase: "I'd argue that …", note: "Sets up a reasoned position." },
      { phrase: "It seems to me that …", note: "Softer, tentative opinion." },
      { phrase: "I'm firmly convinced that …", note: "Strong conviction." },
      { phrase: "There's no doubt in my mind that …", note: "Maximum certainty." },
    ],
  },
  {
    id: "agree",
    title: "Agreeing & Disagreeing",
    emoji: "⚖️",
    blurb: "React to others tactfully and precisely.",
    items: [
      { phrase: "I couldn't agree more.", note: "Strong agreement." },
      { phrase: "That's a fair point.", note: "Acknowledge before adding your view." },
      { phrase: "I see where you're coming from, but …", note: "Polite disagreement." },
      { phrase: "I'm not so sure about that.", note: "Gentle pushback." },
      { phrase: "I see it differently.", note: "Confident, respectful disagreement." },
      { phrase: "Up to a point, yes, but …", note: "Partial agreement." },
      { phrase: "That's exactly my point.", note: "Reinforce alignment." },
      { phrase: "With respect, I'd have to disagree.", note: "Formal, firm disagreement." },
    ],
  },
  {
    id: "business",
    title: "Business Collocations",
    emoji: "💼",
    blurb: "Words that naturally go together in professional English.",
    items: [
      { phrase: "make a decision", note: "Not 'do a decision'." },
      { phrase: "reach an agreement", note: "Conclude negotiations." },
      { phrase: "raise a concern", note: "Politely flag an issue." },
      { phrase: "deliver results", note: "Produce outcomes." },
      { phrase: "gain traction", note: "Start to succeed / grow." },
      { phrase: "drive growth", note: "Actively increase results." },
      { phrase: "take ownership", note: "Accept responsibility." },
      { phrase: "build trust", note: "Establish credibility." },
      { phrase: "meet a deadline", note: "Finish on time." },
      { phrase: "streamline the process", note: "Make it more efficient." },
    ],
  },
  {
    id: "academic",
    title: "Academic & Formal",
    emoji: "🎓",
    blurb: "Precise phrasing for exams, talks, and reports.",
    items: [
      { phrase: "It is widely acknowledged that …", note: "Introduce accepted facts." },
      { phrase: "A growing body of evidence suggests …", note: "Cite a trend without a source." },
      { phrase: "This raises the question of whether …", note: "Introduce an issue." },
      { phrase: "To a large extent, …", note: "Qualify how much you agree." },
      { phrase: "There are several factors at play.", note: "Signal a multi-part answer." },
      { phrase: "This can be attributed to …", note: "Explain a cause formally." },
      { phrase: "Conversely, …", note: "Present the opposite case." },
      { phrase: "In light of this, …", note: "Draw a consequence." },
    ],
  },
  {
    id: "persuasion",
    title: "Persuasion & Emphasis",
    emoji: "🔥",
    blurb: "Make key points land with weight.",
    items: [
      { phrase: "Here's the thing: …", note: "Signal the crucial point." },
      { phrase: "What really matters is …", note: "Focus attention." },
      { phrase: "Make no mistake, …", note: "Add force and certainty." },
      { phrase: "The bottom line is …", note: "Cut to the key takeaway." },
      { phrase: "Imagine if …", note: "Invite the listener into a scenario." },
      { phrase: "This is a game-changer.", note: "Signal high impact." },
      { phrase: "Time and time again, …", note: "Emphasize a repeated pattern." },
      { phrase: "At the end of the day, …", note: "Land the ultimate point." },
    ],
  },
  {
    id: "fillers",
    title: "Filler Replacements",
    emoji: "✨",
    blurb: "Say these instead of 'um', 'like', or 'you know'.",
    items: [
      { phrase: "(a deliberate pause)", note: "Silence beats a filler — pause and breathe." },
      { phrase: "Let me put it this way…", note: "Buys a second while staying fluent." },
      { phrase: "What I mean is…", note: "Clarify instead of saying 'like'." },
      { phrase: "That's a good question.", note: "Buys time to think in Q&A." },
      { phrase: "Let me think for a moment.", note: "Honest, confident pause." },
      { phrase: "To be precise, …", note: "Adds precision, not 'kind of'." },
      { phrase: "The key point here is…", note: "Refocus instead of rambling." },
    ],
  },
  {
    id: "storytelling",
    title: "Storytelling & Engagement",
    emoji: "📖",
    blurb: "Hook listeners and keep them with you.",
    items: [
      { phrase: "Picture this: …", note: "Set a vivid scene." },
      { phrase: "It all started when …", note: "Open a narrative." },
      { phrase: "And that's when it hit me: …", note: "Mark the turning point." },
      { phrase: "Long story short, …", note: "Skip to the outcome." },
      { phrase: "Here's what I learned: …", note: "Deliver the lesson." },
      { phrase: "You might be wondering …", note: "Address the listener's thought." },
      { phrase: "Believe it or not, …", note: "Set up something surprising." },
    ],
  },
  {
    id: "questions",
    title: "Handling Questions",
    emoji: "🛡️",
    blurb: "Stay composed and buy thinking time.",
    items: [
      { phrase: "Great question — let me address that.", note: "Acknowledge and take control." },
      { phrase: "If I understand you correctly, …", note: "Confirm before answering." },
      { phrase: "There are two parts to that.", note: "Structure a complex answer." },
      { phrase: "Let me come back to that in a moment.", note: "Defer gracefully." },
      { phrase: "I don't have that data to hand, but …", note: "Honest without losing authority." },
      { phrase: "To answer your question directly, …", note: "Signal a clear, on-point reply." },
    ],
  },
  {
    id: "powerverbs",
    title: "Power Verbs",
    emoji: "⚡",
    blurb: "Upgrade weak verbs to precise, confident ones.",
    items: [
      { phrase: "accelerate", note: "instead of 'make faster'" },
      { phrase: "streamline", note: "instead of 'make simpler'" },
      { phrase: "spearhead", note: "instead of 'lead' (a new effort)" },
      { phrase: "leverage", note: "instead of 'use' (a strength/resource)" },
      { phrase: "highlight", note: "instead of 'show'" },
      { phrase: "demonstrate", note: "instead of 'prove' softly" },
      { phrase: "address", note: "instead of 'deal with'" },
      { phrase: "amplify", note: "instead of 'increase' (impact/reach)" },
    ],
  },
];
