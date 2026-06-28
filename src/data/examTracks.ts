// Data model for the Exam Speaking Mode. Each global English test is expressed
// as a "track" containing one or more timed speaking tasks. A generic runner
// reads this data, so adding a test = adding data (no new page).

export type TaskType =
  | "question"      // answer a spoken question
  | "topic-card"    // long-turn with bullet points (IELTS Part 2 style)
  | "read-aloud"    // read the given text aloud
  | "describe-info" // describe a chart/image brief
  | "retell"        // retell a short lecture/passage in your own words
  | "roleplay"      // professional role-play (OET)
  | "opinion";      // express & defend an opinion

export interface ExamTask {
  id: string;
  name: string;
  type: TaskType;
  instruction: string;        // shown to the user before/while speaking
  prepSeconds: number;        // 0 = no preparation time
  responseSeconds: number;    // recommended/auto-stop time
  prompts: string[];          // for read-aloud, each entry is the text to read
}

export interface ExamTrack {
  id: string;
  name: string;
  emoji: string;
  useCase: string;
  scoreSystem: string;        // native scale label, e.g. "Band 1–9"
  scoreHint: string;          // short note on how to read the score
  color: string;
  blurb: string;
  tasks: ExamTask[];
}

export const EXAM_TRACKS: ExamTrack[] = [
  // ── IELTS ──────────────────────────────────────────────────────────────────
  {
    id: "ielts",
    name: "IELTS Speaking",
    emoji: "🇬🇧",
    useCase: "Study, migration, work",
    scoreSystem: "Band 1–9",
    scoreHint: "Bands measure Fluency, Lexical Resource, Grammar, and Pronunciation.",
    color: "#E53935",
    blurb: "3-part interview: personal questions, a long-turn cue card, and an abstract discussion.",
    tasks: [
      {
        id: "ielts-p1", name: "Part 1 — Interview", type: "question",
        instruction: "Answer naturally in 2–3 sentences, as in a friendly interview. No long pauses.",
        prepSeconds: 0, responseSeconds: 45,
        prompts: [
          "Do you enjoy cooking? Why or why not?",
          "How often do you use public transport?",
          "What do you usually do in your free time?",
          "Describe your hometown.",
        ],
      },
      {
        id: "ielts-p2", name: "Part 2 — Cue Card (Long Turn)", type: "topic-card",
        instruction: "You have 1 minute to prepare, then speak for up to 2 minutes covering all points.",
        prepSeconds: 60, responseSeconds: 120,
        prompts: [
          "Describe a memorable journey you have taken. Say: where you went · who you went with · what you did · why it was memorable.",
          "Describe a person who has influenced you greatly. Say: who they are · how you know them · what they did · why they influenced you.",
          "Describe a skill you would like to learn. Say: what it is · why you want it · how you would learn it · how it would help you.",
        ],
      },
      {
        id: "ielts-p3", name: "Part 3 — Discussion", type: "opinion",
        instruction: "Give a developed, abstract answer with reasons and examples. Aim for 4–6 sentences.",
        prepSeconds: 0, responseSeconds: 75,
        prompts: [
          "Why do you think people enjoy travelling to foreign countries?",
          "How has technology changed the way we communicate?",
          "What are the advantages and disadvantages of remote work?",
        ],
      },
    ],
  },

  // ── TOEFL iBT ────────────────────────────────────────────────────────────────
  {
    id: "toefl",
    name: "TOEFL iBT Speaking",
    emoji: "🎓",
    useCase: "University admission",
    scoreSystem: "0–30",
    scoreHint: "Scored on Delivery, Language Use, and Topic Development.",
    color: "#0056D2",
    blurb: "Academic tasks: state an opinion or summarize, clearly and under time pressure.",
    tasks: [
      {
        id: "toefl-ind", name: "Independent — Express an Opinion", type: "opinion",
        instruction: "15 seconds to prepare, then 45 seconds to answer. State a clear position with two reasons.",
        prepSeconds: 15, responseSeconds: 45,
        prompts: [
          "Some people prefer to study alone. Others prefer to study in groups. Which do you prefer and why?",
          "Do you agree or disagree: universities should make physical education classes mandatory?",
          "Some students attend class in person; others prefer online learning. Which is better and why?",
        ],
      },
      {
        id: "toefl-int", name: "Integrated — Summarize & Respond", type: "retell",
        instruction: "30 seconds to prepare, then 60 seconds. Summarize the idea below and explain it in your own words.",
        prepSeconds: 30, responseSeconds: 60,
        prompts: [
          "A professor explains 'the bystander effect': people are less likely to help in an emergency when others are present, because responsibility feels shared. Summarize and give an example.",
          "A reading argues that remote internships lack mentorship. A student counters that they offer flexibility and broader access. Summarize both views.",
        ],
      },
    ],
  },

  // ── PTE Academic ─────────────────────────────────────────────────────────────
  {
    id: "pte",
    name: "PTE Academic",
    emoji: "💻",
    useCase: "Study, migration, work",
    scoreSystem: "10–90",
    scoreHint: "AI-scored on content, oral fluency, and pronunciation.",
    color: "#00B37D",
    blurb: "Computer-scored micro-tasks: Read Aloud, Describe Image, and Retell Lecture.",
    tasks: [
      {
        id: "pte-read", name: "Read Aloud", type: "read-aloud",
        instruction: "Read the text aloud clearly and fluently. ~40 seconds. Mind stress and intonation.",
        prepSeconds: 35, responseSeconds: 45,
        prompts: [
          "The rapid growth of renewable energy has transformed global markets, with solar and wind now cheaper than fossil fuels in many regions, accelerating the transition to a low-carbon economy.",
          "Universities increasingly rely on data analytics to predict student performance, allowing earlier intervention, though critics warn that over-reliance on metrics may overlook individual circumstances.",
        ],
      },
      {
        id: "pte-img", name: "Describe Image", type: "describe-info",
        instruction: "25 seconds to prepare, then 40 seconds. Describe the key features and the main trend.",
        prepSeconds: 25, responseSeconds: 40,
        prompts: [
          "Image brief: A bar chart of coffee consumption by country. Finland is highest (~12 kg/person/year), followed by Norway and Iceland; the USA is mid-range (~4.5 kg); India is lowest (~0.1 kg).",
          "Image brief: A line graph of global smartphone sales from 2010 to 2023. Sales rise sharply until 2016, plateau through 2019, dip in 2020, then recover modestly.",
        ],
      },
      {
        id: "pte-retell", name: "Retell Lecture", type: "retell",
        instruction: "10 seconds to prepare, then 40 seconds. Retell the lecture's main points in your own words.",
        prepSeconds: 10, responseSeconds: 40,
        prompts: [
          "Lecture: Sleep consolidates memory. During deep sleep the brain replays the day's experiences, strengthening neural connections; sleep deprivation impairs both learning and emotional regulation.",
          "Lecture: Urban green spaces reduce city temperatures, improve air quality, and boost mental health, but unequal access means wealthier neighborhoods often benefit far more than poorer ones.",
        ],
      },
    ],
  },

  // ── Cambridge C1/C2 ──────────────────────────────────────────────────────────
  {
    id: "cambridge",
    name: "Cambridge C1/C2",
    emoji: "🏛️",
    useCase: "High-level academic & professional English",
    scoreSystem: "CEFR B2–C2",
    scoreHint: "Judged on advanced fluency, range, accuracy, and discourse management.",
    color: "#7B61FF",
    blurb: "Long answers and opinion defense at advanced level, with rich, precise language.",
    tasks: [
      {
        id: "camb-long", name: "Long Turn", type: "topic-card",
        instruction: "Speak for up to 2 minutes. Develop your ideas fully with sophisticated language and clear structure.",
        prepSeconds: 30, responseSeconds: 120,
        prompts: [
          "To what extent should governments prioritise economic growth over environmental protection?",
          "Discuss whether globalisation has done more to unite or divide the world.",
          "How far do you agree that technology is eroding genuine human connection?",
        ],
      },
      {
        id: "camb-defend", name: "Defend a Position", type: "opinion",
        instruction: "Take a firm stance and defend it against the obvious counterargument. Use concession and rebuttal.",
        prepSeconds: 20, responseSeconds: 90,
        prompts: [
          "'Social media should be regulated like tobacco.' Defend or challenge this claim.",
          "'University education will be obsolete within 30 years.' Argue your position.",
        ],
      },
    ],
  },

  // ── TOEIC Speaking ───────────────────────────────────────────────────────────
  {
    id: "toeic",
    name: "TOEIC Speaking",
    emoji: "💼",
    useCase: "Workplace English",
    scoreSystem: "0–200",
    scoreHint: "Measures clarity and effectiveness in business and workplace contexts.",
    color: "#F5A623",
    blurb: "Real-world business speaking: opinions, describing information, workplace situations.",
    tasks: [
      {
        id: "toeic-opinion", name: "Express an Opinion", type: "opinion",
        instruction: "15 seconds to prepare, then 60 seconds. Give a clear, professional opinion with reasons.",
        prepSeconds: 15, responseSeconds: 60,
        prompts: [
          "Some companies allow employees to work from home permanently. Do you think this is a good policy? Why?",
          "What is the most important quality in a good manager? Explain.",
          "Should companies invest more in employee training or in new technology? Why?",
        ],
      },
      {
        id: "toeic-respond", name: "Respond to a Situation", type: "question",
        instruction: "Respond as if in a real workplace call. Be polite, clear, and solution-oriented. ~45 seconds.",
        prepSeconds: 10, responseSeconds: 45,
        prompts: [
          "A client calls upset that their order is two weeks late. Respond professionally and propose a solution.",
          "A colleague asks you to cover their shift at short notice, but you have plans. Respond tactfully.",
          "Your manager asks for a project update, but you're behind schedule. Explain the situation.",
        ],
      },
    ],
  },

  // ── OET ──────────────────────────────────────────────────────────────────────
  {
    id: "oet",
    name: "OET Healthcare",
    emoji: "🩺",
    useCase: "Healthcare professionals",
    scoreSystem: "Grade A–E",
    scoreHint: "Assesses clinical communication: empathy, clarity, and patient-appropriate language.",
    color: "#00B37D",
    blurb: "Professional role-play: explain, reassure, and advise patients with empathy.",
    tasks: [
      {
        id: "oet-roleplay", name: "Patient Role-Play", type: "roleplay",
        instruction: "You are the health professional. Speak to the patient: explain clearly, show empathy, check understanding, and advise. ~2 minutes.",
        prepSeconds: 45, responseSeconds: 120,
        prompts: [
          "Role: You are a nurse. A patient is anxious about an upcoming MRI scan. Explain what will happen, reassure them, and answer the likely fear of pain or claustrophobia.",
          "Role: You are a pharmacist. A patient doesn't understand how to take a new blood-pressure medication. Explain dosing, timing, and a key side effect to watch for.",
          "Role: You are a physiotherapist. A patient recovering from a knee operation is doing too much too soon. Advise them kindly on pacing and recovery.",
        ],
      },
    ],
  },

  // ── CELPIP ────────────────────────────────────────────────────────────────────
  {
    id: "celpip",
    name: "CELPIP Daily-Life",
    emoji: "🇨🇦",
    useCase: "Canadian immigration / citizenship",
    scoreSystem: "Level 1–12",
    scoreHint: "Practical everyday communication: advice, description, and persuasion.",
    color: "#0056D2",
    blurb: "Practical daily-life speaking: give advice, describe a scene, and persuade.",
    tasks: [
      {
        id: "celpip-advice", name: "Giving Advice", type: "question",
        instruction: "30 seconds to prepare, then ~60 seconds. Give clear, friendly, practical advice.",
        prepSeconds: 30, responseSeconds: 60,
        prompts: [
          "A friend just moved to a new city and feels lonely. Give them advice on how to settle in and make friends.",
          "A coworker wants to improve their English quickly. Advise them on the best ways to practice.",
        ],
      },
      {
        id: "celpip-persuade", name: "Persuasion", type: "opinion",
        instruction: "Persuade the listener to take your side. Be convincing and well-organized. ~60 seconds.",
        prepSeconds: 30, responseSeconds: 60,
        prompts: [
          "Persuade your family to spend a vacation in the mountains rather than at the beach.",
          "Convince your team to adopt a four-day work week.",
        ],
      },
      {
        id: "celpip-scene", name: "Describe a Scene", type: "describe-info",
        instruction: "Describe the scene in detail as if the listener can't see it. ~60 seconds.",
        prepSeconds: 30, responseSeconds: 60,
        prompts: [
          "Scene brief: A busy farmers' market on a sunny Saturday morning — stalls of fruit and flowers, a musician playing, families with strollers, a dog tied to a post.",
          "Scene brief: A train station at rush hour — commuters hurrying, a departure board flipping, someone running for a closing door, a vendor selling coffee.",
        ],
      },
    ],
  },
];

export function getTrack(id: string): ExamTrack | undefined {
  return EXAM_TRACKS.find((t) => t.id === id);
}
