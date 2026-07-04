// "Outstanding Speeches" study library — Phase 1 (1–10).
//
// Copyright note: full transcripts are only embedded for public-domain works
// (U.S. Government speeches / pre-1929). Speeches still under copyright (e.g.
// Obama, King) link out to the official transcript instead of reproducing text.
// The "learn" analysis is original SpeakFlow commentary.

export interface Speech {
  num: number;
  speaker: string;
  title: string;
  date: string;
  place: string;
  topic: string;
  whyItStands: string;
  publicDomain: boolean;
  sourceUrl: string;
  sourceLabel: string;
  fullText?: string;   // embedded only for public-domain works
  excerpt?: string;    // a single iconic public-domain line, where applicable
  learn: string[];     // original analysis: what a speaker can learn from it
}

export const SPEECHES: Speech[] = [
  {
    num: 1,
    speaker: "Barack Obama",
    title: "2004 Democratic National Convention Keynote",
    date: "July 27, 2004",
    place: "Boston",
    topic: "Hope, unity, American identity",
    whyItStands: "A breakthrough national-introduction speech with a strong “personal story → national story” structure.",
    publicDomain: false,
    sourceUrl: "https://www.presidency.ucsb.edu/documents/keynote-address-the-2004-democratic-national-convention",
    sourceLabel: "The American Presidency Project",
    learn: [
      "Open with your own origin story, then widen it into the audience's shared story.",
      "Use the rule of three and parallel structure to build rhythm ('there is not a…').",
      "Repeat a single unifying idea until it becomes the takeaway.",
      "Raise energy gradually — start intimate, end soaring.",
    ],
  },
  {
    num: 2,
    speaker: "Barack Obama",
    title: "“A More Perfect Union”",
    date: "March 18, 2008",
    place: "Philadelphia",
    topic: "Race, identity, national healing",
    whyItStands: "A crisis-response speech that handles complexity without sounding defensive.",
    publicDomain: false,
    sourceUrl: "https://www.obama.org/stories/look-back-at-the-more-perfect-union-speech/",
    sourceLabel: "Obama Foundation",
    learn: [
      "Acknowledge the hard truth directly instead of dodging it — that builds trust.",
      "Hold two opposing viewpoints with empathy before offering a way forward.",
      "Anchor a complex argument to a concrete image or document (here, the Constitution).",
      "End on shared aspiration, not blame.",
    ],
  },
  {
    num: 3,
    speaker: "Martin Luther King Jr.",
    title: "“I Have a Dream”",
    date: "Aug. 28, 1963",
    place: "Washington, D.C.",
    topic: "Civil rights, equality",
    whyItStands: "One of the most powerful examples of repetition, rhythm, vision, and moral clarity.",
    publicDomain: false,
    sourceUrl: "https://www.archives.gov/press/exhibits/dream-speech.pdf",
    sourceLabel: "U.S. National Archives",
    learn: [
      "Anaphora: repeat an opening phrase ('I have a dream…') to build a wave of momentum.",
      "Paint a vivid, specific future the audience can see.",
      "Blend cadence and imagery — the speech is written for the ear, not the page.",
      "Escalate toward a climactic, quotable final movement.",
    ],
  },
  {
    num: 4,
    speaker: "Martin Luther King Jr.",
    title: "“I've Been to the Mountaintop”",
    date: "Apr. 3, 1968",
    place: "Memphis",
    topic: "Courage, justice, sacrifice",
    whyItStands: "A prophetic, emotional speech with strong biblical imagery and urgency.",
    publicDomain: false,
    sourceUrl: "https://kinginstitute.stanford.edu/ive-been-mountaintop-address-delivered-bishop-charles-mason-temple",
    sourceLabel: "Stanford King Institute",
    learn: [
      "Use metaphor (the 'mountaintop') as a spine the whole speech can climb.",
      "Personal courage in the face of danger gives words unmatched weight.",
      "Draw on imagery your audience already reveres for instant resonance.",
      "A calm, resolved tone can be more powerful than shouting.",
    ],
  },
  {
    num: 5,
    speaker: "Abraham Lincoln",
    title: "Gettysburg Address",
    date: "Nov. 19, 1863",
    place: "Gettysburg, Pennsylvania",
    topic: "Democracy, sacrifice, national purpose",
    whyItStands: "Extremely short but unforgettable — a perfect study in compression and moral framing.",
    publicDomain: true,
    sourceUrl: "https://www.loc.gov/exhibits/gettysburg-address/",
    sourceLabel: "Library of Congress",
    fullText: `Four score and seven years ago our fathers brought forth on this continent, a new nation, conceived in Liberty, and dedicated to the proposition that all men are created equal.

Now we are engaged in a great civil war, testing whether that nation, or any nation so conceived and so dedicated, can long endure. We are met on a great battle-field of that war. We have come to dedicate a portion of that field, as a final resting place for those who here gave their lives that that nation might live. It is altogether fitting and proper that we should do this.

But, in a larger sense, we can not dedicate — we can not consecrate — we can not hallow — this ground. The brave men, living and dead, who struggled here, have consecrated it, far above our poor power to add or detract. The world will little note, nor long remember what we say here, but it can never forget what they did here. It is for us the living, rather, to be dedicated here to the unfinished work which they who fought here have thus far so nobly advanced. It is rather for us to be here dedicated to the great task remaining before us — that from these honored dead we take increased devotion to that cause for which they gave the last full measure of devotion — that we here highly resolve that these dead shall not have died in vain — that this nation, under God, shall have a new birth of freedom — and that government of the people, by the people, for the people, shall not perish from the earth.`,
    learn: [
      "Radical brevity: ~270 words that say more than most hour-long speeches.",
      "Structure by time — past ('four score'), present ('now'), future ('the great task remaining').",
      "Triads land hard: 'we can not dedicate — consecrate — hallow'; 'of the people, by the people, for the people.'",
      "Shift focus from the speaker's words to the audience's duty.",
    ],
  },
  {
    num: 6,
    speaker: "Abraham Lincoln",
    title: "Second Inaugural Address",
    date: "Mar. 4, 1865",
    place: "Washington, D.C.",
    topic: "Reconciliation after civil war",
    whyItStands: "A model of humility, restraint, and healing after conflict.",
    publicDomain: true,
    sourceUrl: "https://www.loc.gov/item/mal4361300/",
    sourceLabel: "Library of Congress",
    excerpt: "With malice toward none, with charity for all, with firmness in the right as God gives us to see the right, let us strive on to finish the work we are in…",
    learn: [
      "Choose humility over triumph — Lincoln refuses to gloat in victory.",
      "Use balanced, almost scriptural cadence to signal gravity and grace.",
      "Aim the ending at reconciliation, giving the audience a shared task.",
      "Short, plain words carry moral authority.",
    ],
  },
  {
    num: 7,
    speaker: "John F. Kennedy",
    title: "Inaugural Address",
    date: "Jan. 20, 1961",
    place: "Washington, D.C.",
    topic: "Public service, liberty, Cold War leadership",
    whyItStands: "Famous for balanced phrases, cadence, and a clear call to service.",
    publicDomain: true,
    sourceUrl: "https://www.jfklibrary.org/archives/other-resources/john-f-kennedy-speeches/inaugural-address-19610120",
    sourceLabel: "JFK Presidential Library",
    excerpt: "And so, my fellow Americans: ask not what your country can do for you — ask what you can do for your country.",
    learn: [
      "Antithesis: flip a sentence on itself ('ask not… ask') for a memorable line.",
      "Chiasmus and balance make phrases feel inevitable and quotable.",
      "Address the audience as partners with a duty, not spectators.",
      "A single sculpted sentence can outlive the entire speech — craft yours.",
    ],
  },
  {
    num: 8,
    speaker: "John F. Kennedy",
    title: "“We Choose to Go to the Moon”",
    date: "Sept. 12, 1962",
    place: "Rice University, Houston",
    topic: "Ambition, science, national challenge",
    whyItStands: "Makes a difficult mission feel inspiring and inevitable.",
    publicDomain: true,
    sourceUrl: "https://www.jfklibrary.org/learn/about-jfk/historic-speeches/address-at-rice-university-on-the-nations-space-effort",
    sourceLabel: "JFK Presidential Library",
    excerpt: "We choose to go to the Moon in this decade and do the other things, not because they are easy, but because they are hard.",
    learn: [
      "Reframe difficulty as the reason to act, not the reason to hesitate.",
      "Give an abstract goal a concrete deadline ('in this decade').",
      "Use rhythm and repetition to make ambition feel like destiny.",
      "Tie a bold vision to shared identity and pride.",
    ],
  },
  {
    num: 9,
    speaker: "Franklin D. Roosevelt",
    title: "First Inaugural Address",
    date: "Mar. 4, 1933",
    place: "Washington, D.C.",
    topic: "Economic crisis, confidence",
    whyItStands: "A masterclass in calming fear during a national emergency.",
    publicDomain: true,
    sourceUrl: "https://www.fdrlibrary.org/first-inaugural-curriculum-hub",
    sourceLabel: "FDR Presidential Library",
    excerpt: "So, first of all, let me assert my firm belief that the only thing we have to fear is fear itself — nameless, unreasoning, unjustified terror…",
    learn: [
      "Name the audience's emotion (fear) and reframe it before doing anything else.",
      "Project calm, steady confidence when everyone expects panic.",
      "Lead with reassurance, then move to concrete action.",
      "One clear, confident thesis stabilizes an anxious room.",
    ],
  },
  {
    num: 10,
    speaker: "Franklin D. Roosevelt",
    title: "Pearl Harbor “Day of Infamy” Address",
    date: "Dec. 8, 1941",
    place: "Washington, D.C.",
    topic: "War response, national mobilization",
    whyItStands: "Short, direct, and decisive crisis communication.",
    publicDomain: true,
    sourceUrl: "https://www.archives.gov/milestone-documents/joint-address-to-congress-declaration-of-war-against-japan",
    sourceLabel: "U.S. National Archives",
    excerpt: "Yesterday, December 7, 1941 — a date which will live in infamy — the United States of America was suddenly and deliberately attacked…",
    learn: [
      "One precise, weighted opening line can define the entire moment.",
      "In a crisis, be brief, factual, and resolute — no hedging.",
      "Repetition of a key structure ('last night, Japanese forces attacked…') builds momentum toward the ask.",
      "End with a clear, unambiguous decision.",
    ],
  },
];
