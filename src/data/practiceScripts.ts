export interface PracticeScript {
  id: string;
  title: string;
  category: "business" | "interview" | "ielts" | "sales" | "leadership" | "tech" | "story" | "public";
  difficulty: "beginner" | "intermediate" | "advanced";
  tags: string[];
  description: string;
  content: string;
}

export const PRACTICE_SCRIPTS: PracticeScript[] = [
  // ─── BUSINESS (10) ───────────────────────────────────────────────────────────

  {
    id: "bus-01",
    title: "Q3 Quarterly Business Update",
    category: "business",
    difficulty: "beginner",
    tags: ["quarterly", "update", "results", "metrics"],
    description: "A clear and confident quarterly performance update for an all-hands meeting.",
    content:
      `[STRONG] Good morning, everyone. // Thank you for joining today's Q3 business update. //
I want to start by saying — **this quarter mattered**. / Not just because of the numbers, / but because of **what those numbers represent**.

[SLOW] Let me walk you through where we stand. ///

Our total revenue for Q3 came in at **$4.2 million**, / which is **eleven percent above** our target. // That's the **third consecutive quarter** of beating forecast, / and I don't think that's a coincidence. //

On the customer side, / we added **87 new accounts** — including two enterprise deals / that had been in the pipeline for over six months. // Our churn rate dropped to **2.1 percent**, / down from **3.4 percent** last quarter. // [SMILE] That's a number we've been working toward for a long time.

[STRONG] Operationally, / the team executed extremely well. // We shipped **four major product updates**, / resolved **94 percent** of support tickets within 24 hours, / and onboarded 12 new team members / without missing a beat.

[SLOW] Now, / what does Q4 look like? ///

We're entering the quarter with **$6.1 million in qualified pipeline**. // Our focus areas will be: / enterprise expansion, / partner channel development, / and continued product investment. //

I want to be **honest** — Q4 is always challenging. / The holidays slow decision cycles. / Budgets shift. / But we have the team, / the product, / and the **momentum** to finish strong.

[SMILE] Thank you to every single person in this room / and on this call. // You built this quarter. // Let's build an even better one. ///

Questions? I'm happy to go deeper on any of these areas. /`
  },

  {
    id: "bus-02",
    title: "New Product Launch Announcement",
    category: "business",
    difficulty: "beginner",
    tags: ["product launch", "announcement", "internal", "excitement"],
    description: "An internal product launch announcement that builds excitement and communicates key benefits.",
    content:
      `[SMILE] Good afternoon, team. // I have been waiting **weeks** to say this: / our new product / **is officially ready to launch**. ///

[STRONG] Meet **Axiom 2.0**. //

For those who've been on the development side — / you already know what went into this. // For everyone else, / let me paint the picture. ///

Axiom 2.0 is our most significant release in **three years**. // We've rebuilt the core workflow engine from the ground up, / reduced processing time by **40 percent**, / and introduced a real-time collaboration layer / that our beta users have described as — / and I'm quoting directly here — / [SLOW] "the feature they didn't know they needed / until they couldn't live without it." ///

We ran a 90-day beta with **23 enterprise clients**, / including Hartwell Financial and Velo Logistics. // Their feedback shaped **every major decision** in the final build. // [STRONG] This product was co-created with the people who will use it. //

So what happens now? //

Starting Monday, / the product team will begin coordinated outreach to all existing customers. // Marketing launches the campaign Tuesday morning. // Sales has been briefed. / Support has been trained. // We are **aligned**. //

[SLOW] I want to take a moment / to acknowledge the people who made this possible. /// The engineering team worked through a lot of late nights. / Design pushed for a standard of quality / that made all of us better. / And product leadership — / you held this together / when it would have been easy to rush. //

[SMILE] This is what we're capable of. // Now let's go show the market. /`
  },

  {
    id: "bus-03",
    title: "Annual Budget Proposal Presentation",
    category: "business",
    difficulty: "intermediate",
    tags: ["budget", "finance", "proposal", "strategy"],
    description: "A persuasive budget proposal for executive stakeholders with clear ROI framing.",
    content:
      `[SLOW] Thank you for the time today. // I know everyone's calendar is stretched in planning season, / so I'll be direct and deliberate with every minute. ///

We are requesting a total budget of **$2.8 million** for fiscal year 2025. // That represents a **17 percent increase** over last year. // And I want to explain — clearly and honestly — **why that number is the right number**. ///

[STRONG] Last year, / we were allocated $2.4 million. // We delivered $11.3 million in attributed revenue. // That's a **4.7x return** on every dollar invested in this department. //

Here's what the additional $400,000 unlocks. //

[SLOW] First: / headcount. / We are proposing two senior hires — / a data infrastructure lead / and a customer success manager for enterprise accounts. // Together, / they close gaps that are currently costing us deals. //

Second: / technology. / Our current analytics stack is three years old. / Migrating to a modern platform / will reduce reporting time by **60 percent** / and give leadership real-time visibility / into the metrics that matter. //

Third: / market expansion. / We've identified **Southeast Asia** as an underserved segment / with strong product-market fit signals. // A targeted pilot requires $120,000 in Q2 investment. // Projected return in year one: **$800,000**. ///

[STRONG] I'm not asking for budget. / I'm asking for **growth capital**. //

Every line in this proposal is tied to a measurable outcome. / Every outcome is tied to the company's three-year plan. //

[SLOW] The question isn't whether we can afford to invest. // It's whether we can afford / **not to**. ///

I'm ready for questions. /`
  },

  {
    id: "bus-04",
    title: "Strategic Partnership Announcement",
    category: "business",
    difficulty: "intermediate",
    tags: ["partnership", "announcement", "strategic", "alliance"],
    description: "A formal announcement of a high-value strategic partnership to internal and external stakeholders.",
    content:
      `[STRONG] Today, / I'm proud to announce a partnership / that we have been building toward / for the better part of **18 months**. ///

Meridian Tech and **Solara Capital** are joining forces. //

[SLOW] This is not a transactional deal. / This is a **strategic alignment** / between two organizations / that share a vision for what infrastructure financing / should look like in the next decade. ///

Let me give you some context. //

Solara Capital manages **$4.7 billion** in assets under management. // They've backed 14 infrastructure projects across North America / in the last five years alone. // Their due diligence process is rigorous. / Their reputation is exceptional. // And after extensive conversation, / they chose **us** as their preferred technology partner. //

[STRONG] What does this mean practically? //

Beginning in Q1, / Meridian's project management platform / will be embedded across Solara's entire portfolio. // That's **immediate access** to 14 active projects / and a pipeline that includes seven more / expected to close by mid-year. //

For our sales team, / this means warm introductions at the highest level. // For our product team, / it means direct feedback from some of the most sophisticated infrastructure operators in the country. // For our customers, / it means a platform that's stress-tested / at **real institutional scale**. ///

[SLOW] Partnerships like this / don't happen by accident. // They happen when your work speaks for itself / and when your team builds trust / one conversation at a time. ///

[SMILE] So — thank you. / To the team that made this possible. // The work is just beginning, / and I couldn't be more excited about where we're headed. /`
  },

  {
    id: "bus-05",
    title: "Company Vision Speech",
    category: "business",
    difficulty: "intermediate",
    tags: ["vision", "culture", "strategy", "inspiration"],
    description: "A visionary all-hands speech that aligns the company around a bold three-year direction.",
    content:
      `[SLOW] I want to start with a question. ///

Why are we **here**? //

Not here in this room. / I mean — why does this company **exist**? // What is the thing we're actually trying to do in the world? ///

[STRONG] I've been sitting with that question a lot lately. // And I want to share where I've landed. ///

Three years ago, / we started Novara with a single idea: / that **small businesses deserve enterprise-grade tools**. // We believed the market had left them behind. / We believed technology could close that gap. / And we believed — [SLOW] maybe naively at first — / that a small team with the right focus / could make that happen. ///

Here's what I know now: / we were **right**. //

Today, / over **12,000 small businesses** use Novara every single day. // They're running payroll, / managing inventory, / serving customers, / and building livelihoods — / all on a platform / that **this team built**. ///

[STRONG] But I'm not interested in celebrating where we've been. // I'm interested in where we're going. ///

Over the next three years, / our goal is to reach **100,000 businesses** across five countries. // We're going to expand into financial services, / build a marketplace of integrations, / and — most importantly — / **listen harder** to the people who depend on us. //

[SLOW] Because here's the truth: / our customers aren't using software. // They're trying to **build something**. // Our job / is to make that a little less hard. ///

[SMILE] That's the vision. / That's why I come to work. //

I hope it's why you do too. /`
  },

  {
    id: "bus-06",
    title: "Project Status Update to Leadership",
    category: "business",
    difficulty: "beginner",
    tags: ["project update", "status", "milestones", "risk"],
    description: "A structured project status update delivered to senior leadership with clear milestones and risks.",
    content:
      `[STRONG] Good afternoon. // I'm here to give you a current status update / on the Orion Platform migration project, / and to flag one area / where I need your input. ///

[SLOW] Let me start with the good news. ///

We are **on schedule** and **within budget**. // As of today, / we've completed **Phase 1** — / data extraction and validation — / two days ahead of the planned date. // The team moved fast / without cutting corners, / and the quality assurance results came back clean. //

Phase 2 — system integration — / is now underway. // We have **six of twelve** integration points completed. // The remaining six are scheduled for completion by **October 18th**, / which keeps us on track / for the November 1st go-live. ///

[STRONG] Budget status: / we've spent **$420,000** of our **$510,000** allocation. // We expect to finish within budget / with a small contingency buffer remaining. //

[SLOW] Now — / the area I need to flag. ///

The vendor handling our legacy data migration / has notified us of a **72-hour delay** in their final deliverable. // This does not threaten our go-live date, / but it does compress our testing window / from ten days to **seven days**. //

[STRONG] My recommendation: / we bring in two additional QA resources on a contract basis / for the final testing sprint. // Cost: approximately **$8,000**. // Risk mitigation: **significant**. //

[SLOW] I've prepared a one-page summary / with three options and their tradeoffs. // I'd like your decision by end of day Thursday / so we can adjust resourcing immediately. ///

Happy to answer any questions. /`
  },

  {
    id: "bus-07",
    title: "Market Expansion Strategy Presentation",
    category: "business",
    difficulty: "advanced",
    tags: ["expansion", "market entry", "strategy", "international"],
    description: "A board-level presentation on entering a new regional market with data-driven rationale.",
    content:
      `[SLOW] The opportunity I'm presenting today / is the single largest addressable market / we have **not yet entered**. ///

[STRONG] The Canadian mid-market. //

Let me give you the headline numbers, / and then I'll walk you through the rationale. //

Canada's mid-market SaaS spend is projected to reach **$6.4 billion CAD** by 2026. // Current penetration by US-based platforms in our category: / **less than 12 percent**. // Our closest competitor, Fieldline, / entered Canada in 2021 / and reached **$11 million ARR** within 18 months. ///

[SLOW] Why us? / Why now? ///

We have three structural advantages / that Fieldline did not. //

**One**: our platform already supports bilingual interfaces — / English and French. / That matters enormously / in Quebec and New Brunswick. //

**Two**: we have **four existing enterprise customers** with Canadian subsidiaries / who have already requested localized contracts. / This is a warm entry, / not a cold one. //

**Three**: / the regulatory environment in Canada / aligns more closely with our existing compliance framework / than any other international market we've evaluated. ///

[STRONG] The investment required for a 12-month pilot: / **$1.4 million CAD**. // Projected ARR by month 18: / **$8 to $12 million CAD**. // Payback period at midpoint: **under 24 months**. ///

[SLOW] I want to be clear about the risks. // Currency volatility is real. / Building a local partner network takes time. / And competing against homegrown players / requires deliberate positioning. //

But the downside is bounded. / The upside / is a **new growth engine** / for the next five years. ///

I'll take questions on any section. /`
  },

  {
    id: "bus-08",
    title: "Annual Report to Investors",
    category: "business",
    difficulty: "advanced",
    tags: ["annual report", "investors", "financials", "transparency"],
    description: "An investor-facing annual report narration balancing financial results with honest forward guidance.",
    content:
      `[SLOW] Good morning, / and thank you for joining our annual investor briefing. ///

2024 was a year of **deliberate growth**. // We made choices — / some of them difficult — / that we believe position this company / for durable, long-term value creation. // I want to walk you through those choices, / the results they produced, / and where we're headed in 2025. ///

[STRONG] Financial performance. //

Full-year revenue: / **$38.4 million**, / representing **29 percent year-over-year growth**. // Gross margin expanded to **72 percent**, / up from **67 percent** in 2023. // Adjusted EBITDA: / **negative $2.1 million**, / a significant improvement / from negative $8.7 million the prior year. ///

[SLOW] We are on a clear path to profitability. // Our current burn rate / and revenue trajectory / put us at EBITDA breakeven / in **Q3 of 2025**. ///

**Customer metrics.** / ARR reached **$41.2 million** at year-end. // Net Revenue Retention: **118 percent**. // That number tells you / that our existing customers / are growing with us. ///

[STRONG] Where we invested in 2024: //

We made the decision to **reduce our SMB sales motion** / and double down on enterprise. / That transition was painful in Q1 and Q2. // But by Q4, / enterprise ARR represented **63 percent** of our total base — / and our average contract value / increased by **44 percent**. ///

[SLOW] I won't pretend every decision was perfect. / We over-hired in one function / and under-invested in another. // We've corrected course, / and we're entering 2025 / with a leaner, more focused organization. ///

[SMILE] Our commitment to you remains unchanged: / **honest reporting**, / responsible capital allocation, / and **relentless focus** on delivering customer value. ///

Thank you. /`
  },

  {
    id: "bus-09",
    title: "Team Performance Review — Department All-Hands",
    category: "business",
    difficulty: "beginner",
    tags: ["team performance", "recognition", "metrics", "morale"],
    description: "A warm, data-backed team performance review that celebrates wins and sets direction.",
    content:
      `[SMILE] Alright, let's talk about what this team accomplished / in the last 90 days. // Because I think / sometimes we move so fast / that we don't stop long enough to **actually see it**. ///

So — let's see it. //

[STRONG] Customer satisfaction score: / **4.8 out of 5**. // Up from 4.5 last quarter. // That is the **highest score this department has ever recorded**. ///

Ticket resolution time: / average of **18 hours**, / down from 27. // We resolved **99.2 percent** of tickets / within the SLA window. / Industry benchmark? / **87 percent**. // We're running at **12 points above benchmark**. ///

[SLOW] Escalations to leadership: / down **41 percent**. // That tells me the team is solving problems earlier / and more effectively. // That doesn't happen by accident. // That happens because people care. ///

[SMILE] I also want to highlight a few individuals. //

Priya handled the Hartwell account crisis in September / with a level of composure and creativity / that I genuinely didn't expect / from someone eight months into their role. // Marcus rebuilt our internal knowledge base / in his spare time / and reduced new-hire ramp-up by **three weeks**. // And our entire evening shift / volunteered extra hours during the September launch / without being asked. ///

[STRONG] That's the culture we're building. //

[SLOW] Going into next quarter, / our focus is **proactive outreach**. // We're moving from reactive support / to genuine **customer partnership**. // I'll share the playbook in Thursday's briefing. ///

But today — / just for a moment — / [SMILE] let's appreciate what we built. /`
  },

  {
    id: "bus-10",
    title: "New Initiative Kickoff — Innovation Lab",
    category: "business",
    difficulty: "advanced",
    tags: ["innovation", "new initiative", "kickoff", "internal"],
    description: "A compelling internal kickoff speech launching a new cross-functional innovation initiative.",
    content:
      `[SLOW] I want to tell you about a problem / that I've been sitting with / for about eight months. ///

We are a company / that knows **how to execute**. // We have great processes, / strong discipline, / and a team that delivers. // [STRONG] But execution without exploration / is just running in place faster. ///

[SLOW] That's why today / I'm announcing the launch of the **Vertex Innovation Lab**. ///

Here's what it is. //

Vertex is a **quarterly sprint program** / open to any employee in the company. // Every 90 days, / three cross-functional teams / will be given **protected time**, / a modest budget of **$15,000 each**, / and a clear brief: / find the problem our customers haven't told us about yet, / and build the beginning of a solution. ///

[STRONG] No approval chains. / No quarterly OKR dependencies. / No "let's revisit in the roadmap planning cycle." // Just: / here is the space, / here is the support, / **go build something that matters**. ///

This is not a hackathon for show. / The Vertex program comes with a **real pathway to production**. // If a team's prototype scores above threshold in customer testing, / it enters the standard product pipeline / with full funding and headcount. ///

[SLOW] Why now? ///

Because our roadmap is defined by what our **existing** customers ask for. // And that's right — / we should listen to them. // But the companies that change industries / are the ones who build things / their customers didn't know to ask for yet. ///

[SMILE] Applications open next Monday. / I expect a lot of them. ///

Let's build something **unexpected**. /`
  },

  // ─── INTERVIEW (10) ──────────────────────────────────────────────────────────

  {
    id: "int-01",
    title: "Tell Me About Yourself — Software Engineer",
    category: "interview",
    difficulty: "beginner",
    tags: ["self-introduction", "tech", "background", "elevator pitch"],
    description: "A polished 'tell me about yourself' answer tailored for a software engineering role.",
    content:
      `[SLOW] Sure — / happy to walk you through my background. ///

I'm a software engineer with **six years of experience**, / primarily focused on backend systems and distributed architecture. // I started my career at a mid-sized fintech startup called Lendify, / where I spent three years building and scaling their loan origination API. // By the time I left, / that system was processing **over 40,000 transactions per day** / with 99.97 percent uptime. ///

[STRONG] That experience taught me a lot / about what it means to build for reliability / — not just functionality. //

After Lendify, / I joined Rexova, / a Series B data infrastructure company. // There, I led the re-architecture of our data pipeline / from a monolithic ETL system / to a modular, event-driven architecture / using Kafka and Kubernetes. // We reduced processing latency by **65 percent** / and cut infrastructure costs by about **$180,000 annually**. ///

[SLOW] I also care a lot about engineering culture. // At Rexova, / I started a bi-weekly internal tech talk series / that ended up running for two years / and grew to include external speakers / from companies like Stripe and Cloudflare. ///

[STRONG] What draws me to this role specifically / is the intersection of performance engineering and developer tooling. // It's a combination I find genuinely compelling, / and it maps directly to what I've been building toward. //

[SLOW] I'm someone who cares about **craft** — / not just shipping, / but shipping things that **last** / and that the next engineer will thank you for. ///

That's the short version. / I'm happy to go deeper on any part of that. /`
  },

  {
    id: "int-02",
    title: "Tell Me About Yourself — Marketing Manager",
    category: "interview",
    difficulty: "beginner",
    tags: ["self-introduction", "marketing", "background", "narrative"],
    description: "A confident and story-driven 'tell me about yourself' answer for a marketing leadership role.",
    content:
      `[SMILE] Of course — / I'll give you the highlights and then you can pull on whatever thread is most relevant. ///

I've spent **eight years in B2B marketing**, / with a focus on demand generation and brand strategy. // I started out at an agency, / which was an incredible foundation — / I worked across about **11 different industries** in three years / and learned to move fast / and adapt my thinking quickly. ///

[SLOW] From there, / I went in-house for the first time / at a HR-tech company called Workpath. // I joined as their second marketing hire / and helped build the function from scratch. // Over three years, / I grew our MQL volume by **340 percent**, / built a content engine that still generates leads today, / and launched our first customer conference — / which drew 600 attendees / in its inaugural year. ///

[STRONG] Most recently, / I've been at Centra Software / as Director of Growth Marketing. // My proudest achievement there / was restructuring our paid acquisition strategy / to focus on intent data / rather than broad targeting. // We cut cost per qualified lead by **44 percent** / while simultaneously **increasing pipeline quality** — / which, as any marketer knows, / is the hard part. ///

[SLOW] What I'm drawn to now / is a role where I can operate at the intersection of strategy and execution. // I love the thinking, / but I also love getting in the details. ///

[SMILE] This role stood out to me because it offers exactly that. // I'm excited to talk more about how my background maps to what you're building. /`
  },

  {
    id: "int-03",
    title: "Why Do You Want This Role?",
    category: "interview",
    difficulty: "beginner",
    tags: ["motivation", "fit", "role alignment", "authenticity"],
    description: "An authentic and well-researched answer to 'why do you want this role?' that avoids clichés.",
    content:
      `[SLOW] That's a question I've thought about carefully, / because I wanted to give you a real answer / rather than a polished one. ///

[STRONG] The honest answer is: / **this specific combination** / doesn't come up often. //

Most product operations roles I've seen / are either heavily process-focused with limited strategic scope, / or strategically ambitious / but disconnected from the execution layer. // What I read in this job description — / and what I heard in our initial conversation — / is that this role actually sits at that intersection. / The person in it / needs to be comfortable in a board deck **and** in a Notion doc at the same time. ///

[SLOW] That's where I do my best work. ///

Secondly — / and I'll be direct — / Arkon is at a **genuinely interesting inflection point**. // You've hit product-market fit, / you've raised a strong Series B, / and now the question is how you scale the operating model / without losing what made the product great. // That's the type of problem / I've thought about for years / and have direct experience navigating. ///

[STRONG] I spent 18 months at Clearfield helping them make that exact transition. // And while it was uncomfortable at times, / it was the most **growth I've experienced** in my career. //

[SLOW] I want to feel that again. / And I want to do it / in a company I believe in. ///

I've used your product. / I've talked to people who work here. / The things they say about the culture / match what I see in how you communicate externally. //

[SMILE] That doesn't happen by accident. / It's why I'm here. /`
  },

  {
    id: "int-04",
    title: "Greatest Professional Achievement",
    category: "interview",
    difficulty: "intermediate",
    tags: ["achievement", "results", "STAR", "impact"],
    description: "A STAR-structured answer about a high-impact professional achievement with specific results.",
    content:
      `[SLOW] I'll share an achievement that I'm genuinely proud of — / not just because of the outcome, / but because of what it took to get there. ///

[STRONG] Context: / I joined the operations team at NovaBridge / during a period of serious dysfunction. //

The company had grown quickly — / from **200 to 600 employees** / in under two years. // But the internal systems hadn't scaled with the headcount. // Onboarding took **six weeks** on average. / Employees were leaving in their first 90 days / at a rate that was costing us / nearly **$1.2 million annually** in replacement costs alone. ///

[SLOW] I was asked to fix it. / I had a team of three and no dedicated budget. ///

The first thing I did was **talk to people**. // I interviewed 40 employees in their first year / and mapped exactly where the experience was breaking down. // The data pointed to three specific failure points: / unclear role expectations in week one, / no structured connection to colleagues, / and a technology setup process / that averaged **11 days to complete**. ///

[STRONG] We rebuilt all three. //

I partnered with IT to reduce technology setup to **2 days**. // I designed a 90-day onboarding roadmap / with weekly manager check-ins built in. // And I launched a peer-mentor program / that was entirely volunteer-run — / and had **80 people sign up** in the first week. ///

[SLOW] Six months later: / 90-day turnover dropped by **62 percent**. / Average onboarding time: / **three weeks**. / Employee satisfaction in the first 90 days / jumped from **3.1 to 4.6 out of 5**. ///

[SMILE] The part I'm most proud of / isn't the metrics. // It's that we built something / that **people actually wanted to use**. /`
  },

  {
    id: "int-05",
    title: "Handling a Difficult Coworker",
    category: "interview",
    difficulty: "intermediate",
    tags: ["conflict", "interpersonal", "teamwork", "maturity"],
    description: "A candid and professional answer about navigating a difficult working relationship.",
    content:
      `[SLOW] I'll share a situation that was genuinely difficult at the time, / and that I learned a lot from. ///

I was leading a cross-functional project / at Tessera Systems — / a six-month initiative / to consolidate our customer data platforms. // One of the key stakeholders / was a senior engineer named Daniel. // And from the beginning, / he was resistant. // He challenged decisions in meetings, / sometimes in ways that felt personal, / and created friction / that slowed the team down. ///

[SLOW] My first instinct — / honestly — / was to escalate. // But I held back / and asked myself: / **what's actually going on here?** ///

[STRONG] So I asked him to coffee. // Not to address the conflict directly at first — / just to listen. ///

What I learned in that conversation / shifted everything. // Daniel had led a similar consolidation project two years earlier / that had failed badly — / and he felt the root cause / had been ignored. // He wasn't trying to be difficult. / He was trying to **prevent a repeat**. ///

[SLOW] Once I understood that, / I invited him into the architecture review. // I gave him a formal voice in the process / rather than treating his input as disruption. // He identified **three real risks** / that we hadn't fully addressed. ///

[STRONG] The project shipped on time. // Daniel and I ended up co-presenting the results to leadership. // And at the end of the project, / he told me it was the best-run cross-functional initiative / he'd been part of. ///

[SLOW] What I took from that: / difficult people are often people / whose perspective hasn't been heard. / My job as a leader / is to hear it. /`
  },

  {
    id: "int-06",
    title: "Leadership Story — Leading Through Pressure",
    category: "interview",
    difficulty: "intermediate",
    tags: ["leadership", "pressure", "team", "results"],
    description: "A compelling leadership story demonstrating composure and results under pressure.",
    content:
      `[SLOW] I'll share a leadership moment / that tested me / in a way I wasn't fully prepared for. ///

I was the engineering lead for a product launch at Crestline — / a major feature release / for our largest enterprise client, / Axiom Health. // Two days before go-live, / we discovered a critical bug / in the authentication flow. // It wasn't cosmetic. / If we shipped it, / there was a real risk of a HIPAA compliance issue. ///

[STRONG] My team was exhausted. / The client was expecting a Tuesday morning launch. / And I had to make a decision. ///

[SLOW] The first thing I did was pause. // I brought the team into a room / and I told them the truth: / **we have a serious problem, / and I need your best thinking for the next four hours**. ///

We broke into two parallel tracks. / One team worked on the bug fix. / One team drafted a communication plan / for the client. // I took personal responsibility for the client call — / I didn't delegate it. ///

[STRONG] The bug was resolved in **six hours**. // We launched 18 hours late / with the client's full understanding and support. // They told us afterward / that the way we handled it / **increased their confidence** in us — / not decreased it. ///

[SLOW] What I learned: / people don't expect you to be perfect. // They expect you to be **honest** / and to **lead when things are hard**. ///

[SMILE] I also learned that the team I had / was extraordinary. // My job in that moment / was to create the space for them to prove it. /`
  },

  {
    id: "int-07",
    title: "Why Are You Leaving Your Current Role?",
    category: "interview",
    difficulty: "beginner",
    tags: ["transition", "motivation", "authenticity", "growth"],
    description: "An honest and forward-looking answer about why you're pursuing a new opportunity.",
    content:
      `[SLOW] I want to answer this one honestly, / because I think the honest answer / actually reflects well on both sides of this conversation. ///

[STRONG] I'm not leaving because things are bad. / I'm leaving because I've grown / as far as this role is designed to let me grow. ///

I joined Cova two and a half years ago / as a mid-level analyst. // In that time, / I've taken on more and more responsibility — / I'm currently leading a team of five, / managing our largest client relationship, / and effectively running our quarterly reporting cycle. ///

[SLOW] But here's the reality: / the head of analytics position / that I would naturally step into / isn't going to open for at least two to three years. // The person in that role is doing great, / and there's no path around them. ///

[STRONG] I've had a candid conversation with my manager about this. // She understands my reasons / and has been supportive. // She's one of the best managers I've had, / and I'll leave with that relationship intact. ///

[SLOW] What I'm looking for / is a place where my trajectory / doesn't depend on someone else's departure. // I want to be in a role / where the ceiling is defined by my performance, / not by the org chart. ///

[SMILE] When I looked at this opportunity, / the scope of the analytics function, / the growth stage of the company, / and the fact that this role has a clear path to a VP-level seat — / it felt like the right fit at the right time. ///

That's the honest answer. /`
  },

  {
    id: "int-08",
    title: "Where Do You See Yourself in 5 Years?",
    category: "interview",
    difficulty: "beginner",
    tags: ["career goals", "ambition", "growth", "alignment"],
    description: "A grounded and forward-thinking answer to the five-year plan question that shows alignment with the role.",
    content:
      `[SLOW] Five years is a long time in any industry, / and I try to hold long-term plans loosely. // But I can tell you / where I'm trying to grow / and why this role / fits into that trajectory. ///

[STRONG] In five years, / I want to be operating as a senior product leader — / someone who owns a significant product surface, / builds and develops high-performing teams, / and has a real voice in company strategy. ///

[SLOW] That's the target. // Now — how do I get there from here? ///

Right now, / my gap is experience at the **intersection of product and revenue**. // I've built products. / I understand users. / But I haven't yet had the experience / of owning a product that is directly tied to a sales motion / — where the decisions I make / have an immediate commercial impact. ///

[STRONG] This role changes that. //

[SLOW] The product you're building / lives at that exact intersection. // And the opportunity to work alongside a Go-to-Market team / as a core partner — / not just a handoff — / is exactly the development experience I'm seeking. ///

[SMILE] I also want to be honest: / I think the best five-year plans / are made in collaboration with the company you're at, / not just brought in from the outside. // I have a direction. / But I expect that direction / to be shaped by what I learn here, / by the mentorship I receive, / and by the problems / that turn out to be bigger and more interesting / than I expected. ///

That's the honest version. / Five years from now, / I want to be able to say / this was where it all came together. /`
  },

  {
    id: "int-09",
    title: "Greatest Weakness — Product Manager",
    category: "interview",
    difficulty: "intermediate",
    tags: ["weakness", "self-awareness", "growth", "authenticity"],
    description: "A self-aware and credible answer to the weakness question that shows genuine growth.",
    content:
      `[SLOW] I'll give you a real answer to this one, / because I think the diplomatic version / doesn't actually help either of us. ///

[STRONG] My biggest weakness / is that I can be **too attached to my own hypotheses**. ///

[SLOW] Here's what I mean. // Early in a product cycle, / I do a lot of research, / a lot of synthesis, / and I usually arrive at a point of view / that I feel confident in. // And that's a strength — / the ability to form a clear view quickly / is valuable in fast-moving environments. ///

[STRONG] But there's a shadow side to it. //

There have been moments / where I've held onto a direction longer than I should have / because I was emotionally invested in the analysis that got me there. // The most notable example: / at Velo, / I championed a feature / based on quantitative data / that I was confident in. // Our designer kept raising a qualitative concern / that I was deprioritizing. ///

[SLOW] I shipped the feature. / It underperformed. / And the concern the designer raised / was the reason. ///

[STRONG] That was a meaningful failure / and I sat with it. ///

Since then, / I've built in a specific process: / before any feature ships, / I explicitly invite the strongest counter-argument / from someone who isn't bought into my framing. // I even designate someone as "devil's advocate" / in key review meetings. ///

[SLOW] It's made me a better product manager. // Not because I was wrong about everything — / but because I learned / that **being right less quickly** / sometimes means **being right more often**. ///

[SMILE] That's the honest answer. /`
  },

  {
    id: "int-10",
    title: "Career Change — From Finance to Product",
    category: "interview",
    difficulty: "advanced",
    tags: ["career change", "transition", "transferable skills", "narrative"],
    description: "A compelling narrative for a career changer moving from finance into product management.",
    content:
      `[SLOW] I want to address the elephant in the room directly, / because I think that's the most useful thing I can do. ///

Yes — / my background is in finance, / not product. // I spent **seven years** in investment banking / at Greystone Capital. // And I'm sitting in front of you / for a product management role. ///

[STRONG] Let me tell you why I believe / that's actually an advantage. ///

[SLOW] Here's what finance teaches you at its core: / how to build a rigorous case / under uncertainty, / how to synthesize complex data / into a clear recommendation, / and how to earn the trust of extremely skeptical decision-makers. // Those are **exactly** the skills / that separate good product managers / from great ones. ///

But the transition wasn't impulsive. //

Two years ago, / I started building on the side. / I took two structured PM courses, / got certified, / and then did something that changed everything: / I volunteered to manage the internal tooling roadmap / for a nonprofit called GreenPath. // Unpaid, / alongside my day job. ///

[STRONG] In eight months, / I shipped five features, / managed two contractors, / and reduced their volunteer onboarding time by **60 percent**. // More importantly, / I discovered / that this is the work I **wake up thinking about**. ///

[SLOW] Finance was a great chapter. / It taught me how to think rigorously / and communicate under pressure. // But the work I want to do for the next twenty years / is **this**. ///

[SMILE] I'm not coming in naïve. / I know there are things I still need to learn. // But I'm coming in with a foundation, / a genuine hunger, / and proof / that I can get things done. ///

That's why I'm here. /`
  },

  // ─── IELTS (8) ───────────────────────────────────────────────────────────────

  {
    id: "iel-01",
    title: "Describe a Memorable Journey",
    category: "ielts",
    difficulty: "beginner",
    tags: ["travel", "narrative", "personal", "descriptive"],
    description: "An IELTS-style spoken response describing a memorable travel experience vividly.",
    content:
      `[SLOW] I'd like to talk about a journey / that I took about three years ago — / a solo train trip / from Hanoi to Ho Chi Minh City / in Vietnam. ///

[STRONG] It remains one of the most memorable experiences of my life, / and I think about it often. //

The journey itself / took about **36 hours** on a sleeper train. // To some people, / that sounds like a hardship. // For me, / it became one of the most peaceful stretches of time / I can remember. ///

[SLOW] I had a small compartment / with a fold-out bunk / and a window / that faced the Vietnamese coastline. // The train moved slowly through the mountains of Da Nang — / and at one point, / it curved along a cliff / so dramatically / that you could see the ocean below / and the front of the train at the same time. ///

[STRONG] That image — / the train curling along the cliffs, / the sea glinting far below — / is burned into my memory. //

But the journey wasn't just beautiful. / It was also deeply **human**. //

[SLOW] I shared my compartment / with a Vietnamese grandmother / and her teenage granddaughter. // They spoke almost no English. / I spoke almost no Vietnamese. // But she offered me fruit from a plastic bag — / mango, I think — / and we sat watching the scenery in a perfectly comfortable silence. ///

[STRONG] There's something about long train journeys / that strip away the usual noise. // No Wi-Fi. / No obligations. / Just the landscape / moving past the glass. ///

[SLOW] That journey taught me / that the **most memorable** travel experiences / aren't always the destinations. // They're the **in-between** moments / that you didn't plan for. /`
  },

  {
    id: "iel-02",
    title: "Describe Your Hometown",
    category: "ielts",
    difficulty: "beginner",
    tags: ["hometown", "description", "community", "IELTS speaking"],
    description: "A well-structured IELTS speaking response describing a hometown with vivid personal detail.",
    content:
      `[SLOW] I'd like to describe the town where I grew up — / a place called **Dumfries**, / in the southwest of Scotland. ///

It's not a large city. / The population is around **30,000 people**. // But for a place that small, / it has a remarkable amount of **character**. ///

[STRONG] Dumfries sits along the River Nith, / and the river is really the heart of the town. // In summer, / you can walk along the riverbank / past old sandstone bridges / that look like they belong in a painting. // In winter, / the same path feels wild and grey / in a way that's somehow still beautiful. ///

[SLOW] The town is known for its connection to the poet **Robert Burns**, / who lived and died there. // His house is still standing / and open to visitors. // Growing up, / we used to visit it on school trips / and recite his poems — / whether we wanted to or not. ///

[SMILE] Looking back, / I'm glad we did. ///

What I remember most / is how **everyone knew everyone**. // The butcher knew your parents. / The librarian remembered your name. / The football coach / doubled as the school janitor. // There was a warmth to it / that I didn't fully appreciate / until I moved to a larger city. ///

[SLOW] Like many small towns, / Dumfries has faced economic challenges / as industries have shifted. // The high street has more empty shops than it once did. // But the community spirit / is something that hasn't diminished. ///

[STRONG] I think where you grow up / shapes how you see people. // And growing up in a place like Dumfries / taught me the value of **knowing your neighbours**. /`
  },

  {
    id: "iel-03",
    title: "The Impact of Technology on Society",
    category: "ielts",
    difficulty: "intermediate",
    tags: ["technology", "society", "opinion", "IELTS"],
    description: "A balanced and nuanced IELTS-style spoken response on technology's role in modern society.",
    content:
      `[SLOW] Technology's impact on society / is one of those topics / that invites easy answers / and resists simple ones. ///

If someone asked me / whether technology has made our lives better, / my honest answer would be: / **yes** — / and also / in some important ways, / **no**. ///

[STRONG] Let me explain what I mean. //

The benefits are real and significant. // Medical technology / has extended life expectancy dramatically. // Digital communication / has connected families across continents / and given voice to communities / that were historically invisible. // The internet has democratised access to information / in ways that would have seemed miraculous / just 30 years ago. ///

[SLOW] And yet — ///

[STRONG] The same technologies / have introduced serious costs. //

Social media platforms / were designed to maximise engagement, / not wellbeing. // The result has been an epidemic of anxiety, / comparison, / and misinformation / that disproportionately affects young people. // Research from the American Psychological Association / found that heavy social media use / is correlated with **significantly higher rates of depression** / in adolescents. ///

[SLOW] There is also the question of attention. // We are living in an age of constant distraction. / Deep work — / the kind of sustained focus / that produces genuine insight — / is becoming harder for many people to access. ///

[STRONG] I think the key insight / is that technology is **neutral**. // It amplifies what we already are. // It amplifies generosity / and connection / and knowledge. / But it also amplifies division, / surveillance, / and compulsion. ///

[SLOW] The question isn't **whether** we use technology. / The question is: / **who controls its design** / and to whose benefit? ///

That is a political and ethical question. / Not a technical one. /`
  },

  {
    id: "iel-04",
    title: "Environmental Challenges — Human Responsibility",
    category: "ielts",
    difficulty: "intermediate",
    tags: ["environment", "climate", "opinion", "IELTS"],
    description: "A thoughtful IELTS discussion on environmental challenges and the extent of individual vs. systemic responsibility.",
    content:
      `[SLOW] When we talk about environmental responsibility, / I think we often make two mistakes. // The first is placing all the blame on individuals. / The second is absolving individuals entirely. // The truth / is more nuanced — / and more useful. ///

[STRONG] Let me start with what the data actually says. //

Just **100 companies** are responsible for **71 percent** of global carbon emissions. // That statistic is frequently cited / to argue that individual action is pointless. // I understand the argument. / But I think it misses something important. ///

[SLOW] Individual choices, / at scale, / create the demand / that those companies respond to. // The shift toward electric vehicles / didn't happen because governments mandated it first. // It happened because consumers began choosing them, / creating market incentives / that companies then followed. ///

[STRONG] Individual agency **matters** — / but it cannot be our primary strategy. ///

The scale of the climate crisis / requires systemic change: / carbon pricing, / renewable energy investment, / reformed agricultural subsidies, / international cooperation. // These are policy decisions / that individuals cannot make alone. ///

[SLOW] What I believe most strongly / is that framing this as **individual versus system** / is a false choice. // We need both. ///

[STRONG] Governments must regulate. / Companies must decarbonise. / And individuals / must elect leaders / who take this seriously. ///

[SLOW] The generation growing up today / will inherit either a managed transition / or a crisis. // Which one they receive / depends not on one choice, / but on **millions of choices** / made in the next ten years. ///

I believe we are capable of making them. / But I also believe / that we are running out of time to prove it. /`
  },

  {
    id: "iel-05",
    title: "The Purpose of Education",
    category: "ielts",
    difficulty: "intermediate",
    tags: ["education", "opinion", "IELTS", "society"],
    description: "A structured IELTS opinion response exploring what education is truly for in the modern world.",
    content:
      `[SLOW] What is education **for**? ///

That question sounds simple. / But I think the answer we give to it / shapes every decision / we make about how schools are run, / what is taught, / and how we measure success. ///

[STRONG] The traditional answer / is that education exists to prepare people for the workforce. // And that's partly true. // A society that doesn't train doctors, / engineers, / and teachers / will struggle to function. ///

But I think reducing education to **job preparation** / is a significant mistake. ///

[SLOW] Education at its best / does something harder / and more important: / it teaches people **how to think**. // It exposes them to history, literature, mathematics, and science — / not so they can pass exams — / but so they develop the mental frameworks / to navigate a complex world. ///

[STRONG] A person who understands history / is harder to manipulate. // A person who understands statistics / is harder to deceive. // A person who has read widely / can hold complexity in their mind / rather than reaching for simple answers. ///

[SLOW] These are not luxury skills. / In a democracy, / they are **foundational**. ///

I am also concerned / about the narrowing of curricula / in many countries. // Arts, music, and philosophy / are increasingly treated as peripheral — / nice to have, / but not essential. // And yet these are precisely the disciplines / that develop creativity, / empathy, / and the capacity to ask / **the right question** / rather than just answering the one given to you. ///

[SLOW] If I could change one thing about how we think about education, / it would be to shift the primary goal / from **producing useful workers** / to **cultivating thoughtful citizens**. ///

The workforce will follow. / It always does. /`
  },

  {
    id: "iel-06",
    title: "Work-Life Balance in Modern Society",
    category: "ielts",
    difficulty: "advanced",
    tags: ["work-life balance", "IELTS", "opinion", "wellbeing"],
    description: "An IELTS advanced-level discussion on work-life balance with societal analysis and personal stance.",
    content:
      `[SLOW] The phrase "work-life balance" / has become so common / that I think it's lost some of its meaning. // We repeat it like a prescription / without examining what we're actually prescribing — / or whether the treatment / addresses the underlying condition. ///

[STRONG] Let me be direct about what I think the real problem is. ///

In many modern economies, / particularly in East Asia and North America, / **overwork is not a failure of personal discipline**. // It is a structural outcome. // When housing costs absorb **50 to 60 percent** of income in major cities, / when job insecurity is rising, / and when productivity is rewarded with more responsibility / rather than more time — / people don't overwork because they want to. // They overwork because the system / makes it rational to do so. ///

[SLOW] And yet / the consequences are severe. ///

Japan coined the term **karoshi** — / death from overwork. // The UK's NHS reports that **chronic stress** / is now one of the leading drivers / of absenteeism in the workforce. // And a study by Stanford University found / that productivity per hour / drops sharply / after 50 hours of work per week. ///

[STRONG] In other words: / overwork is not even efficient. // It simply feels that way. ///

[SLOW] What I believe is needed / is a shift in how we measure success. // Countries like Denmark and the Netherlands / have demonstrated that **shorter working hours** / can coexist with high productivity / and strong economic performance. // This is not utopian thinking. / It is a model that exists / and that works. ///

[STRONG] The question is whether we have the political will / to choose it. ///

[SLOW] I think the generation entering the workforce now / is asking that question more loudly than any before it. / And I think / that is something to be **genuinely hopeful about**. /`
  },

  {
    id: "iel-07",
    title: "Cultural Traditions in a Globalised World",
    category: "ielts",
    difficulty: "advanced",
    tags: ["culture", "globalisation", "IELTS", "traditions"],
    description: "An IELTS advanced response discussing whether cultural traditions can survive globalisation.",
    content:
      `[SLOW] Globalisation is often described / as a **threat** to cultural traditions. // And I understand why. // When the same brands, films, and social media platforms / reach every corner of the world, / it can feel as though local culture / is being quietly dissolved / into something homogeneous and commercial. ///

[STRONG] But I want to push back on that framing — / not entirely, / but meaningfully. ///

[SLOW] The relationship between globalisation and tradition / is more complicated / and more generative / than simple erosion. ///

Consider music. // In the 1980s, / when Western pop music expanded globally, / the response in many regions / was not replacement — / it was fusion. // Brazilian artists blended electronic production / with traditional samba rhythms. // South Korean artists fused Western pop structure / with traditional vocal styles, / creating what became / a **global cultural phenomenon** / in its own right. ///

[STRONG] Globalisation gave these traditions **new audiences** and **new tools**. ///

[SLOW] That said — / I do not want to be naive. // There are traditions / — particularly those tied to **indigenous communities** — / that face genuine existential pressure. // Languages are disappearing at a rate of **one every two weeks**. // When a language dies, / an entire cognitive framework, / a unique way of relating to the world, / disappears with it. // No amount of cultural fusion / can recover what is permanently lost. ///

[STRONG] So my position is this: / globalisation is neither inherently destructive / nor inherently preserving. // It is **amplifying**. // Strong traditions, / well-supported by their communities, / can thrive in a globalised world. // Fragile ones, / particularly those tied to marginalised peoples / with limited economic power, / are genuinely at risk. ///

[SLOW] The question isn't whether the world globalises — / that process is already underway. // The question is whether we allocate the resources and respect / to protect what is worth protecting. ///

That requires **intentional choice**. / Not nostalgia. /`
  },

  {
    id: "iel-08",
    title: "Healthy Lifestyle Habits and Modern Challenges",
    category: "ielts",
    difficulty: "beginner",
    tags: ["health", "lifestyle", "IELTS", "wellbeing"],
    description: "An IELTS beginner-level response on healthy living habits and the modern barriers to achieving them.",
    content:
      `[SLOW] I think most people / genuinely **want** to live healthily. // The challenge isn't awareness — / almost everyone knows that sleep, exercise, and nutrition matter. // The challenge is that the environments we live in / often make healthy choices harder / than unhealthy ones. ///

[STRONG] Let me give you some examples. //

A healthy meal prepared at home / takes **time** — / time to plan, / shop, / cook, / and clean. // For someone working two jobs / or caring for a family alone, / that time simply doesn't exist. // Meanwhile, / fast food is cheaper, / faster, / and engineered to be deeply satisfying. // The system / is not set up in their favour. ///

[SLOW] Exercise is similar. // Gym memberships cost money. / Public parks are not equally distributed across cities. / And after a 10-hour workday, / the idea of going for a run / competes with rest / that the body genuinely needs. ///

[STRONG] I'm not saying personal responsibility doesn't exist. // It does. / And small daily habits can make a real difference. ///

[SLOW] But I think the most useful framing / is to ask: / **what can each of us actually control?** ///

For most people, / that means sleep hygiene — / keeping a consistent bedtime / and reducing screen time before bed. // It means incorporating **incidental movement** — / taking stairs, / walking during calls, / cycling to nearby destinations. // And it means being deliberate / about **one meal a day** / rather than trying to overhaul everything at once. ///

[SLOW] Progress in health / rarely looks dramatic. // It usually looks like / small, sustainable choices / made consistently over time. ///

[SMILE] That's not a very exciting answer. / But I think it's the **honest** one. /`
  },

  // ─── SALES (7) ───────────────────────────────────────────────────────────────

  {
    id: "sal-01",
    title: "SaaS Product Demo — Workflow Automation Platform",
    category: "sales",
    difficulty: "beginner",
    tags: ["SaaS", "demo", "product", "automation"],
    description: "A structured and engaging SaaS product demo script for a workflow automation platform.",
    content:
      `[SMILE] Thank you for the time today — / I'll be respectful of your calendar. // What I'd like to do / is walk you through the platform in about **15 minutes**, / and then leave plenty of time / for your questions. //

[STRONG] Let's start with the problem. ///

Based on our discovery call, / your team is currently managing approvals across **three separate tools** — / Slack, / a shared inbox, / and a spreadsheet that seven different people have access to. // Every time a request comes in, / someone is manually forwarding it, / someone is manually updating the sheet, / and delays are creating downstream bottlenecks. // Does that sound about right? //

[SLOW] Here's what that typically costs a company your size: / research puts **cross-tool switching and manual coordination** at about **11 hours per employee per week**. // At 45 people in your operations team, / that's roughly **$340,000 in productivity per year**. ///

[STRONG] Now let me show you / what that looks like with Flowpath. //

[SLOW] When a request is submitted — / through email, Slack, or our web form — / it automatically creates a structured workflow. // Approvals are routed based on rules you define once. // Everyone can see status in real time. // And when something is approved, / the downstream actions — / notifications, / file creation, / CRM updates — / happen automatically. ///

[STRONG] Our median customer reduces approval cycle time by **68 percent** in the first 30 days. //

[SLOW] What I'd like to know / is: / where in your current process / does the most friction live? // Because everything I've shown you / can be configured specifically / around your workflows. ///

[SMILE] Let's make this relevant to **your** team. / Where do you want to start? /`
  },

  {
    id: "sal-02",
    title: "Investor Pitch — Series A Startup",
    category: "sales",
    difficulty: "advanced",
    tags: ["investor pitch", "Series A", "startup", "fundraising"],
    description: "A concise and compelling Series A investor pitch covering problem, solution, traction, and ask.",
    content:
      `[STRONG] Every year, / **$140 billion** in commercial real estate insurance / is incorrectly priced. // Not by a little — / by an average of **22 percent**. // The reason? / Underwriters are still making decisions / based on decade-old inspection data / and spreadsheet models / that haven't fundamentally changed since the 1990s. ///

[SLOW] We built **Terranova** to change that. ///

Terranova is an AI underwriting platform / that uses satellite imagery, / IoT sensor data, / and real-time weather models / to give commercial insurers / a live, accurate risk profile / of any property — / in under **90 seconds**. ///

[STRONG] The technology works. / Here's the proof. //

We've run **$2.3 billion** in commercial policies / through our platform / across four carrier pilots. // Loss ratios for Terranova-underwritten policies / are running **14 percentage points below** carrier averages. // In insurance, / that is a **massive number**. ///

[SLOW] Our business model is straightforward: / we charge a **per-policy fee** of $18 to $45, / depending on coverage size. // Current ARR: / **$1.4 million**. // Pipeline under active evaluation: / **$8 million ARR**. // We have three LOIs / from carriers representing / a combined **$420 million in annual premium volume**. ///

[STRONG] We're raising **$7 million** in Series A / to scale our carrier integrations / and expand into casualty lines. ///

[SLOW] The team: / I'm Marcus Webb — / 12 years in commercial insurance, / previously Chief Actuary at Galton Re. // My co-founder, Sarah Chen, / led machine learning infrastructure at Google X. ///

[STRONG] The market is massive. / The technology is proven. / The traction is real. ///

[SLOW] We're looking for partners / who want to reshape how risk is priced. // If that's you — / let's go deeper. /`
  },

  {
    id: "sal-03",
    title: "B2B Cold Call Opener — Logistics Software",
    category: "sales",
    difficulty: "intermediate",
    tags: ["cold call", "B2B", "logistics", "opener"],
    description: "A confident and non-pushy cold call opening script for a logistics management software platform.",
    content:
      `[STRONG] Hi Marcus — / this is Priya Sharma / calling from Clearpath Logistics. // I know you weren't expecting this call, / and I'll be quick. ///

[SLOW] I'm reaching out to companies / in the **mid-market freight brokerage space** / who are running on legacy TMS platforms. // The reason I'm calling specifically / is that we've been working with three brokerage firms / in your size range — / between $40 and $120 million in revenue — / and solving a problem / that keeps coming up in nearly every conversation. ///

[STRONG] The problem: / manual load matching. //

The brokers we talk to / are typically spending between **4 and 7 hours per day** / on load matching that could be automated. // That's time their best people / are spending on a task / rather than on relationships. ///

[SLOW] I don't know if that resonates with your situation. / It might not. / But if it does — / I think a 20-minute call / would be worth your time. ///

We've built an AI-assisted matching engine / that integrates with most major TMS platforms / in under a week. // Our clients typically see / manual matching time drop by **70 percent** in the first 30 days. ///

[STRONG] I'm not trying to set up a demo today. / I'm genuinely asking: / is load matching something / that's costing you capacity right now? //

[SLOW] If it is, / I'd love to have a conversation. // If it's not, / I completely understand / and I won't take any more of your time. ///

[SMILE] What's your honest take / on where that fits for you right now? /`
  },

  {
    id: "sal-04",
    title: "Partnership Proposal — Channel Sales",
    category: "sales",
    difficulty: "intermediate",
    tags: ["partnership", "channel", "proposal", "B2B"],
    description: "A persuasive partnership proposal for a channel sales relationship with clear mutual value.",
    content:
      `[SLOW] Thank you for making time today. // I want to use this conversation / to share a specific opportunity — / and I'll be direct about why I think / this is the right time / and the right fit for both organisations. ///

[STRONG] Helix Solutions and Vantage Consulting / are operating in adjacent markets / serving the same buyers. //

Your clients are mid-market CFOs / navigating financial technology transformation. // Our platform — / Helix FP&A — / is the most commonly requested tool / among that exact buyer profile. // The problem is: / our direct sales motion is strong, / but our implementation capacity / is currently our growth constraint. ///

[SLOW] That's where you come in. ///

We're looking for **three to five** certified implementation partners / who can deliver white-glove deployment / for enterprise deals. // In return, / we offer: / a **20 percent referral commission** on all introduced deals, / co-selling support from our enterprise team, / certification training at no cost, / and early access to our roadmap — / which means your team is always ahead of the curve. ///

[STRONG] What does the economics look like for Vantage? //

Our average enterprise deal is **$180,000 ACV**. // Implementation services for a deal that size / typically run **$60,000 to $90,000** — / which is entirely yours. // If we close **eight deals together** in the first year, / that's conservatively **$500,000 in services revenue / plus $288,000 in referral fees**. ///

[SLOW] That's what the model looks like / at a conservative volume. ///

[SMILE] What I'd like to do / is walk you through the certification process / and hear your questions about fit. // Because I think this is a significant opportunity — / and I'd rather start slowly / and build it right / than rush to a number. //

What's your reaction so far? /`
  },

  {
    id: "sal-05",
    title: "Nonprofit Fundraising Pitch",
    category: "sales",
    difficulty: "intermediate",
    tags: ["nonprofit", "fundraising", "pitch", "impact"],
    description: "An emotionally resonant and data-backed nonprofit fundraising pitch for a corporate sponsor.",
    content:
      `[SLOW] I want to start with a number. ///

**1 in 4**. ///

That's the proportion of children in the Westside Unified school district / who arrive at school on a Monday morning / having had **no hot meal** over the weekend. // Not one. // These aren't children in crisis countries. // They're children in classrooms / less than twelve miles from where we're sitting. ///

[STRONG] **Weekend Kitchen** was started five years ago / to close that gap. ///

Every Friday afternoon, / we pack a discreet, nutritious meal kit / into the backpacks of children / whose families have registered as food-insecure. // The kit provides **12 meals** — / enough for two children, / for two days. // No child knows who else is receiving one. / No stigma. / Just food. ///

[SLOW] In the last academic year, / we served **1,840 children** across 11 schools. // Teacher absenteeism in participating schools / dropped by **18 percent** — / because hungry children get sick more often. // Test scores in grade 3 literacy / among participants / improved by an average of **11 percentile points**. ///

[STRONG] We know what works. / We just need the resources to scale it. ///

[SLOW] We're approaching Dalton Capital / specifically / because your company's community investment strategy / centres on **educational equity and childhood wellbeing**. // This isn't a charity ask / that sits outside your values. // It's a direct expression of them. ///

We're requesting a **$75,000 sponsorship** / which covers 420 children for a full school year. // In return: / co-branded impact reports, / volunteer engagement opportunities, / and recognition as a founding community partner / in our 2025 expansion. ///

[SMILE] But most importantly — / 420 children / will go home this Friday / with something to eat. ///

That's what your investment does. /`
  },

  {
    id: "sal-06",
    title: "Consulting Services Pitch — Strategy Firm",
    category: "sales",
    difficulty: "advanced",
    tags: ["consulting", "pitch", "strategy", "B2B"],
    description: "A sophisticated consulting pitch for a strategy engagement with a C-suite decision maker.",
    content:
      `[SLOW] I want to be transparent about how I'm going to use the next 20 minutes, / because I think the best consulting relationships / start with honest framing. ///

I'm not here to impress you / with a capabilities deck. // I'm here because / based on what I've read about Valmora's situation / and what your CPO told me in our call last week, / I think there's a specific problem / that is likely to get significantly worse / if it doesn't get attention in the next **six months**. ///

[STRONG] Here's what I'm seeing from the outside. //

You've doubled your product portfolio / in 18 months through acquisition. // That's an ambitious and arguably correct strategic move. // But integrating three distinct product teams, / two legacy codebases, / and four different go-to-market motions / without a unifying operating model / creates a specific kind of dysfunction: / **strategic confusion at the customer interface**. ///

[SLOW] Your sales team doesn't know which product to lead with. // Your customer success team / is managing four different onboarding journeys. // And your marketing is producing content / for audiences / that increasingly overlap / but aren't being spoken to / as a unified value proposition. ///

[STRONG] I've seen this pattern before. //

We worked through an equivalent situation / with Arclight Software / following their acquisition of two vertical SaaS companies in 2022. // Within nine months, / we helped them consolidate to a unified commercial motion / and reduce their sales cycle by **31 percent**. ///

[SLOW] What I'm proposing / is a **12-week diagnostic and design engagement**. // Investment: **$180,000**. // Deliverable: an operating model blueprint / and a 90-day implementation roadmap / that your team can execute. ///

[STRONG] Not a report that sits on a shelf. / A plan with an owner and a timeline. ///

[SLOW] What's your honest read / on whether this is the right problem to be solving right now? /`
  },

  {
    id: "sal-07",
    title: "Product Launch Sales Kickoff",
    category: "sales",
    difficulty: "intermediate",
    tags: ["sales kickoff", "product launch", "enablement", "team"],
    description: "An energising sales kickoff script for a new product launch designed to align and motivate the sales team.",
    content:
      `[STRONG] Alright — / let's talk about what we're selling / starting **Monday**. ///

[SMILE] And I want to be honest with you: / this is the most excited I've been / about a product launch / since I've been in this role. // Not because I'm supposed to say that. / Because of what I've seen in beta. ///

[SLOW] Here's the story. ///

For the last three years, / our customers have been using Nexus Core / to manage their project pipelines. // And it's been good. / Solid. / Well-liked. // But the number one piece of feedback / in every QBR, / every NPS survey, / every support ticket / has been the same: ///

[STRONG] "We love it — / but we can't see across projects." //

[SLOW] As of Monday, / that problem doesn't exist anymore. ///

**Nexus Intelligence** gives every customer / a live portfolio view — / across all projects, / all teams, / all status updates — / in a single dashboard. // It integrates with their existing workflows / in under two hours. // No migration. / No retraining. / It just **appears**, / and it works. ///

[STRONG] Here's why this matters for your number: //

This feature unlocks **upsell** for every customer on our Standard plan. // The move to Premium — / which includes Nexus Intelligence — / is a **$420 per seat per year** upgrade. // In your book of business alone, / if you convert **30 percent** of Standard customers / to Premium, / that's an average of **$67,000 in expansion ARR per rep**. ///

[SLOW] This isn't just a product launch. / It's a **revenue unlock**. ///

[SMILE] I'll be spending the first hour today / walking you through the demo, / the positioning, / and the objection handling. // Pay attention. // Your Q4 will thank you. ///

Let's go. /`
  },

  // ─── LEADERSHIP (5) ──────────────────────────────────────────────────────────

  {
    id: "lea-01",
    title: "Motivating the Team — Mid-Year Reset",
    category: "leadership",
    difficulty: "intermediate",
    tags: ["motivation", "team", "culture", "mid-year"],
    description: "A candid and inspiring mid-year address to re-energise a team and reset collective focus.",
    content:
      `[SLOW] I've been thinking about what to say today / for about a week. // And I kept coming back to one decision: / do I give you the polished version, / or the **honest** one? ///

[STRONG] I'm going with honest. ///

The first half of this year / was harder than we planned for. // We missed our Q2 target. / We lost two deals we expected to win. / We said goodbye to colleagues / who were part of this team's foundation. // [SLOW] That was real. / I'm not going to paper over it. ///

[STRONG] But here's what I also saw. ///

[SLOW] I saw a team / that showed up. // When the Reinholt account went sideways in April, / Denise stayed until 11pm — / three nights in a row — / to rebuild the deliverable from scratch. // When we lost James, / his entire project load was absorbed / by three people / who were already stretched, / without a single complaint getting to my desk. ///

[STRONG] That's not normal. / That's exceptional. // And I need you to **know** that I see it. ///

[SLOW] Here's what I want us to do with the second half. ///

I want us to make **three fewer promises** / and **keep every single one** we make. // I want us to spend more time / on the work that matters most / and less time / in meetings about the work. // And I want us to be honest with each other / when something isn't working — / before it becomes a crisis. ///

[SMILE] We are not a team in trouble. // We are a team / that ran into a hard stretch / and didn't fall apart. ///

[STRONG] That is the foundation. / Now let's build on it. ///

[SLOW] I'm proud to work with you. / All of you. / Let's have a second half / that reflects what this team is actually capable of. /`
  },

  {
    id: "lea-02",
    title: "Crisis Communication — System Outage",
    category: "leadership",
    difficulty: "advanced",
    tags: ["crisis", "communication", "outage", "transparency"],
    description: "A composed and transparent crisis communication script for a major system outage affecting customers.",
    content:
      `[SLOW] Thank you for being available on short notice. // I'm going to give you the full picture / because you deserve it, / and because I believe / the only way we get through this well / is **together**. ///

[STRONG] At 7:14 this morning, / our primary database cluster experienced a cascading failure. // Services have been degraded / for **four hours and 22 minutes**. // Approximately **3,400 customers** are affected. ///

[SLOW] Here is what we know. // The failure originated from a deployment / pushed to production at 6:50am / that contained a misconfigured connection pool setting. // This was not caught in staging / because staging does not replicate our production load pattern. // That is a process failure / that we own entirely. ///

[STRONG] Here is what is happening right now. //

Our on-call engineering team / has been working on this since minute one. // We identified the root cause at 8:40am. // Rollback is in progress / and we expect **full service restoration** within the next **45 to 90 minutes**. ///

[SLOW] Customer communication went out at 9:15am / via status page and email. // The message was honest about the nature of the issue / and committed to an update / every 30 minutes. / We have met that commitment. ///

[STRONG] Here is what changes after today. ///

We are implementing mandatory load testing / for all production deployments. // We are also adding a staging environment / that mirrors production traffic patterns. // Both changes will be in place / before the end of this week. ///

[SLOW] I want to say this clearly: / this is on me. // I approved the deployment process. / I will stand in front of our customers / and own that. ///

[STRONG] What I need from each of you right now / is focus. / We are not fully recovered yet. // Let's finish the job. ///

Questions in the next ten minutes — / then we get back to work. /`
  },

  {
    id: "lea-03",
    title: "Change Management — Organisational Restructure",
    category: "leadership",
    difficulty: "advanced",
    tags: ["change management", "restructure", "leadership", "communication"],
    description: "A thoughtful and transparent leadership address announcing and contextualising an organisational restructure.",
    content:
      `[SLOW] I want to start / by acknowledging what this moment feels like. ///

Change — / even change that is right, / even change that is necessary — / carries uncertainty. // And uncertainty is uncomfortable. // So before I say anything else: / **I hear that**. / And I respect it. ///

[STRONG] Now let me tell you what's happening / and why. ///

Effective the first of November, / we are restructuring from a **functional model** / to a **product-aligned model**. // Instead of separate engineering, design, and product organisations / working in parallel, / each product line will have a **cross-functional pod** / with dedicated resources — / a product lead, / engineering capacity, / and design ownership. ///

[SLOW] Why are we making this change? ///

The honest answer: / because our current structure / creates coordination overhead / that is slowing us down. // Decisions that should take a week / take three. // Handoffs that should be seamless / create bottlenecks. // And the teams building products / don't have the autonomy / that would allow them to move at the speed / the market requires. ///

[STRONG] This structure fixes that. //

[SLOW] I want to be honest about what changes. // Some of you will have new managers. // Some teams will be physically reseated. // Some roles will be redefined. // I am not going to minimise that. / Change in daily working life / is genuinely disruptive. ///

[STRONG] Here is what does not change: / your role in this company, / your compensation, / and our commitment to your growth. ///

[SLOW] Over the next two weeks, / your direct manager will schedule a one-on-one / to walk through specifically what this means for your role. // Please bring your questions. // Nothing is off limits. ///

[SMILE] Change is never comfortable at the start. / But I believe — genuinely — / that in 12 months, / you will look back on this / as the decision / that let us build what we're capable of. ///

Thank you for your trust. / I don't take it lightly. /`
  },

  {
    id: "lea-04",
    title: "Employee Recognition — Annual Awards",
    category: "leadership",
    difficulty: "beginner",
    tags: ["recognition", "awards", "culture", "morale"],
    description: "A warm and specific employee recognition speech for an annual company awards ceremony.",
    content:
      `[SMILE] There are a lot of things we measure in this company. // Revenue. / Retention. / Net Promoter Score. // But there are things that matter / that don't show up in dashboards. ///

[SLOW] Tonight is about those things. ///

[STRONG] The first award — / **The Builder Award** — / goes to someone / who started here 18 months ago / with no playbook, / no predecessor, / and no template. ///

Nadia Osei / joined as our first dedicated data analyst. // She built the function from scratch. // She created the reporting architecture / that now underpins every strategic decision / in this company. // She trained colleagues / who've never read a SQL query in their lives. // And she did it / with the kind of patience and generosity / that makes people want to learn. ///

[SLOW] Nadia — / will you come up? ///

[STRONG] The second award — / **The Anchor Award** — / recognises someone / who holds steady / when everything else is moving fast. ///

[SLOW] This year, / that person is Marcus Tran. // When our largest account threatened to churn in September, / Marcus personally led five conversations / over ten days. // He listened more than he talked. // He problem-solved more than he promised. // And he retained an account / that represents **$620,000 in ARR**. // [SMILE] Marcus — / you already know / but we wanted everyone else to know too. ///

[STRONG] And finally — / the award that means the most to me personally: / **The Culture Award**. ///

[SLOW] This goes to someone / who has never been asked to take notes in a meeting — / and has taken them anyway. / Who has remembered everyone's birthdays. / Who has set up the Slack channel, / organised the team lunch, / and checked on colleagues / when they seemed like they were having a hard week. ///

[SMILE] Some of you already know who this is. / Priya Mehta — / the team is a **better team** because of you. /`
  },

  {
    id: "lea-05",
    title: "Vision Speech — Leadership Offsite Opener",
    category: "leadership",
    difficulty: "advanced",
    tags: ["vision", "offsite", "leadership", "strategy"],
    description: "A powerful leadership offsite opening that sets the tone for strategic alignment and ambitious thinking.",
    content:
      `[SLOW] I want to start with a question / that I genuinely don't know the answer to. ///

**Five years from now, / what kind of company are we?** ///

[SLOW] Not what our revenue is. / Not what our headcount is. / Not even what our market position is. // I'm asking something harder: / what is the **character** of this company? // What does it mean to work here? // What does the world know us for / that goes beyond what we sell? ///

[STRONG] That's what we're here to figure out. ///

[SLOW] I've been leading companies for 14 years. // And the most dangerous moment / in any organisation's life / is not when things are going badly. // The most dangerous moment / is when things are going **well** / but for the wrong reasons. ///

When growth is driven by market conditions / rather than competitive excellence, / companies mistake **luck for capability**. // They stop making hard choices. / They start protecting the status quo. / And then the market shifts — / and they're left with an organisation / that was optimised for a world / that no longer exists. ///

[STRONG] I believe we are at that moment. ///

[SLOW] Not because we're failing — / we're not. // But because the window / to shape our own future / is open right now. // And windows close. ///

Over the next two days, / I want us to have the conversations / that we're too busy to have in the office. // Not about Q4. / Not about the next product release. // About what we **believe** — / about our customers, / about our market, / about the kind of company / we want to hand to the next generation of leaders who come after us. ///

[STRONG] That is the conversation I'm here to have. ///

[SLOW] I hope you're ready for it. // Because if we do this well — / if we leave here **aligned** on who we are and where we're going — / everything else gets easier. ///

[SMILE] Let's begin. /`
  },

  // ─── TECH (5) ────────────────────────────────────────────────────────────────

  {
    id: "tec-01",
    title: "AI Product Demo — Intelligent Document Processing",
    category: "tech",
    difficulty: "intermediate",
    tags: ["AI", "demo", "product", "document processing"],
    description: "A technical yet accessible product demo for an AI-powered document processing platform.",
    content:
      `[STRONG] Let me show you something / that I think will change / how you think about your document workflows. ///

[SLOW] Right now, / your team receives somewhere between **200 and 400 vendor invoices per month**. // Each one is structured slightly differently. / Different field names. / Different layouts. / Some are PDFs. / Some are scanned images. / Some arrive in the body of an email. ///

[STRONG] What happens to each one? //

Someone opens it. / Someone reads it. / Someone types the information / into your ERP system. // On average: **4.5 minutes per document**. // At 300 invoices per month, / that's **22.5 hours of manual data entry** — / every single month. ///

[SLOW] Here's what **Docuflow** does instead. ///

An invoice arrives. / Docuflow identifies it automatically. // It extracts every relevant field — / vendor name, / invoice number, / line items, / totals, / due date — / regardless of format. // It cross-references the vendor against your approved supplier list. // It flags any discrepancy — / duplicate invoice number, / amount that doesn't match the PO, / vendor not on your list. // And then it routes the document / for approval or auto-processes it / based on rules you define. ///

[STRONG] Accuracy rate: / **99.4 percent**. / Processing time per document: / **under 8 seconds**. ///

[SLOW] I'll show you the live interface now. // What you're looking at / is a real invoice / that we ran through the system **30 seconds ago**. // Every field extracted. / Flagged for one discrepancy — / the PO number doesn't match. / Routed to the CFO approval queue. // [STRONG] Done — / without a single human touch. ///

[SLOW] Where in your current process / would this have the biggest impact? // That's where I'd like to focus next. /`
  },

  {
    id: "tec-02",
    title: "Technical Architecture Presentation — Microservices Migration",
    category: "tech",
    difficulty: "advanced",
    tags: ["architecture", "microservices", "technical", "migration"],
    description: "A clear technical architecture presentation on migrating from a monolith to microservices.",
    content:
      `[SLOW] What I want to walk you through today / is not a migration plan. // It's a **decision framework** / for whether to migrate at all, / and if so, **how**. ///

[STRONG] Let me start with where we are. ///

Our current monolith / has been in production for **seven years**. // It handles **14 million requests per day** / with an average response time of **210 milliseconds**. // It's maintained by a team of 18 engineers / who understand it reasonably well — / which is actually a meaningful advantage / we should not underestimate. ///

[SLOW] So why are we having this conversation? ///

Three reasons. //

**One**: / our deployment cycle is 11 days. // Any change to any part of the system / requires a full regression suite / and a coordinated release window. // That is a **competitive disadvantage** / in a market where our fastest competitor / ships multiple times per day. ///

**Two**: / we have exactly **two engineers** / who understand the billing subsystem in depth. // That is a single point of organizational failure / that keeps me up at night. ///

**Three**: / we're planning to add three new product lines in the next 18 months. // Adding them to the monolith / will make the first two problems significantly worse. ///

[STRONG] The proposal is a **strangler fig migration** — / not a rewrite, / not a big bang. ///

[SLOW] We identify the two or three subsystems / with the highest independent business value: / billing, / notification, / and authentication. // We extract them into services / with clearly defined API contracts. // We run them in parallel with the monolith / until confidence is established. / Then we route traffic progressively. ///

[STRONG] Timeline: **18 months** for initial extraction. / Cost: **$1.1 million** in engineering effort. / Risk: **manageable** with the phased approach. ///

[SLOW] The alternative — / staying on the monolith — / has a cost too. // It's just harder to see on a spreadsheet. ///

I'll take technical questions first. /`
  },

  {
    id: "tec-03",
    title: "Startup Competition Pitch — Developer Tooling",
    category: "tech",
    difficulty: "advanced",
    tags: ["startup pitch", "developer tools", "competition", "pitch"],
    description: "A sharp and competitive startup pitch for a developer tooling product at a tech competition.",
    content:
      `[STRONG] The average software engineer / spends **42 percent** of their time / not writing code. ///

[SLOW] Let that land for a second. ///

Forty-two percent. // They're in meetings about requirements / that should have been written down. // They're debugging environment issues / that only happen on their machine. // They're waiting for CI pipelines / that take **34 minutes** on average / for a 3-line change. ///

[STRONG] We built **Launchpad** / to give engineers those hours back. ///

Launchpad is a developer environment orchestration tool / that spins up a fully configured, / cloud-native development environment / in **under 90 seconds**. // Identical across every machine on the team. / No more "works on my machine." / No more three-hour onboarding sessions / for new engineers. // One command. / Everything is there. ///

[SLOW] We've been in private beta / for six months. // Our current users include engineering teams / at Stripe, / Figma, / and two YC companies / I can't name yet. // **Net Promoter Score: 71**. // Average reduction in environment setup time: / **87 percent**. ///

[STRONG] Business model: / **$35 per developer per month**. // At a company with 50 engineers, / that's $1,750 a month. // Our total addressable market is **9.4 million professional developers** / in North America alone. ///

[SLOW] We're a team of four. / Three MIT engineers / and a designer from Atlassian. // We've bootstrapped to **$180,000 ARR** / with no marketing spend. ///

[STRONG] We're raising **$2 million** / to hire two senior engineers, / launch our go-to-market, / and capture the land-and-expand opportunity / that's sitting right in front of us. ///

[SLOW] The problem is real. / The solution works. / The team knows how to ship. ///

[SMILE] We'd love your support / in doing it faster. /`
  },

  {
    id: "tec-04",
    title: "Developer Conference Keynote Opening",
    category: "tech",
    difficulty: "advanced",
    tags: ["conference", "keynote", "developer", "community"],
    description: "An energising developer conference keynote opening that builds community and sets an inspiring tone.",
    content:
      `[SLOW] Welcome. ///

I want to start by saying something / that I think is easy to forget / when we spend so much time / talking about **what** we're building. ///

The fact that we're building it **together** — / that 3,000 people are here, / in this room, / because they care about the same craft — / that is not a small thing. ///

[STRONG] This community is one of the most generous / I have ever been part of. ///

[SLOW] Think about the last tool / you relied on in your work. // There's a good chance / it was built by someone / who shared it for free. // There's a good chance / the documentation that helped you / was written by someone / who didn't have to write it. // There's a good chance / the answer to the problem you were stuck on / was on a forum / written by a developer at 11pm / who just didn't want someone else / to lose three hours / to the same issue they'd just solved. ///

[STRONG] That culture / is **not guaranteed**. // It is a choice we make / every single day. ///

[SLOW] This year's theme is **Build Forward**. // Not build bigger. / Not build faster. // [STRONG] Build forward. ///

[SLOW] What does that mean? // It means building things / that are worth building. // It means leaving APIs / and codebases / and documentation / in better shape / than we found them. // It means considering the developers who come after us / as seriously as we consider the users in front of us. ///

[STRONG] Because here is what I believe: / **the best code is not the cleverest code**. // It's the code / that someone else / can understand, / build on, / and thank you for. ///

[SLOW] You're going to hear from some extraordinary people this week. // But the most important conversations / will probably happen in the hallway, / at a table, / over a coffee, / with someone you haven't met yet. ///

[SMILE] Go find them. ///

Welcome to DevForward 2025. /`
  },

  {
    id: "tec-05",
    title: "Product Roadmap Presentation — Q1 Strategy",
    category: "tech",
    difficulty: "intermediate",
    tags: ["roadmap", "product", "strategy", "Q1"],
    description: "A clear and engaging product roadmap presentation that balances vision with execution realism.",
    content:
      `[SLOW] I want to start by being honest / about what a roadmap is / and what it isn't. ///

[STRONG] A roadmap is not a promise. / It's a **prioritised hypothesis**. ///

We're making bets about what will matter most / based on the best information we have today. // Some of those bets will be right. / Some will be overtaken by customer feedback / or market signals. // And a team that can't adapt its roadmap / is a team / that's confusing planning / with certainty. ///

[SLOW] With that framing in place — / here's Q1. ///

**Theme: Depth over breadth.** //

We're not shipping ten features. / We're shipping **four** — / and we're making each one genuinely great. ///

[STRONG] Feature one: / **Smart Assign 2.0**. //

The current assignment engine / allocates tasks based on availability. // Smart Assign 2.0 adds **skill weighting and workload balance** — / so the right work goes to the right person, / not just the next available one. // Beta feedback has been exceptional. / Launch target: **January 22nd**. ///

[SLOW] Feature two: / **Calendar Sync across platforms**. // This has been the number-one feature request / for seven consecutive months. // We're shipping bidirectional sync / with Google Calendar and Outlook. // Honestly — / we should have done this sooner. // Target: **February 7th**. ///

[STRONG] Features three and four: / **Custom Report Builder** / and **API v3** — / both targeting mid-March. // I'll walk through details / in the working sessions this afternoon. ///

[SLOW] What's **not** on the Q1 roadmap / is as important as what is. // Mobile native — / deferred to Q2. // AI-assisted suggestions — / still in research, / not on the plan. ///

[STRONG] I'd rather ship four things well / than seven things adequately. ///

[SLOW] Questions on priorities? / I'm genuinely open to pushback — / that's how we stress-test this. /`
  },

  // ─── STORY (3) ───────────────────────────────────────────────────────────────

  {
    id: "sto-01",
    title: "Personal Networking Intro — Conference Setting",
    category: "story",
    difficulty: "beginner",
    tags: ["networking", "personal intro", "story", "connection"],
    description: "A memorable and warm personal introduction story for professional networking events.",
    content:
      `[SMILE] I'll give you the honest version of how I ended up in this field, / because the honest version / is more interesting than the polished one. ///

[SLOW] I was a marine biologist. // Genuinely. / I spent three years / tagging sharks off the coast of South Africa / for a research programme. // It was extraordinary. / It was also incredibly remote, / occasionally terrifying, / and — as far as career advice goes — / [SMILE] nobody told me what came after the PhD. ///

[STRONG] What came after the PhD / was a data analysis problem. ///

[SLOW] We had **seven years** of tagging data / and no good way to visualise movement patterns. // A colleague introduced me to Python. / I learned it over a winter. / I built a tool to map the data. / It worked. // And then I realised — / building the tool / was the most alive I'd felt / in two years. ///

[STRONG] That's when everything changed. ///

[SLOW] I pivoted. / Badly at first — / I applied for developer jobs / with a CV that said "PhD in Marine Biology" / and got approximately zero responses. // But eventually, / through a combination of bootcamp work, / freelance projects, / and a mentor who took a chance on me, / I landed my first role / as a data engineer / at a climate tech startup. ///

[SMILE] That was four years ago. // Now I'm a principal engineer / working on infrastructure / for real-time environmental monitoring systems. // [SLOW] Turns out — / the sharks led me here after all. ///

[STRONG] I love meeting people at events like this, / because everyone has a version of that story. // The unexpected turn. / The thing that changed everything. ///

[SLOW] What's yours? /`
  },

  {
    id: "sto-02",
    title: "Overcoming Failure — A Career Story",
    category: "story",
    difficulty: "intermediate",
    tags: ["failure", "resilience", "career", "personal story"],
    description: "A vulnerable and inspiring story about recovering from a significant professional failure.",
    content:
      `[SLOW] I want to tell you about the worst professional moment of my life. // And I want to tell you / because I think / the version of this story that people usually share / has been cleaned up too much / to be useful. ///

In 2019, / I was the co-founder and CTO / of a startup called Vestry. // We'd raised **$2.2 million** in seed funding. // We had a team of nine people / who had left stable jobs / to build something with us. ///

[STRONG] And in October of that year — / we ran out of money. ///

[SLOW] The fundraising round we'd been counting on / fell through in the final week of diligence. // The investor cited "macro uncertainty" — / which was true, / and was also / a convenient reason / to say no. ///

[SLOW] I had to let nine people go / in a single afternoon. // People with mortgages. / People who'd moved cities. / People who had **believed** in what we were building. ///

[STRONG] That's a weight / that doesn't fully lift. ///

[SLOW] What I did in the following six months / was not heroic. // I was depressed. / I was embarrassed. / I avoided people / who had known me as "the startup founder." // I took a job / that felt like a significant step backward. ///

[STRONG] And then — / slowly — / I started to see it differently. ///

[SLOW] I started to see that the failure / had taught me more than any of my successes had. // It taught me the specific things I hadn't known: / how to manage cash conservatively, / when to stop fundraising and start earning, / how to tell people hard things / before they become catastrophes. ///

[STRONG] Four years later, / I cofounded another company. // We've been profitable since month 14. ///

[SLOW] I'm not glad it happened. / But I'm genuinely grateful / for what it made me. /`
  },

  {
    id: "sto-03",
    title: "A Mentorship Moment That Changed Everything",
    category: "story",
    difficulty: "intermediate",
    tags: ["mentorship", "story", "career", "gratitude"],
    description: "A moving story about a mentor whose single piece of advice reshaped the speaker's career trajectory.",
    content:
      `[SLOW] I want to tell you about a conversation / that lasted approximately **eight minutes** / and changed the direction of my career. ///

I was 27 years old. / I was three years into a consulting career / that was going fine — / not great, / not bad, / fine. // And I was starting to feel / that subtle, difficult-to-articulate dread / that comes when you're good at something / that you don't actually care about. ///

[SLOW] I had a meeting — / scheduled for something unrelated — / with a partner at the firm named Helen Reyes. // She was 20 years older than me, / extraordinarily direct, / and widely considered the most respected strategist / in the office. ///

[SLOW] At the end of the meeting, / almost as an afterthought, / she looked at me and said: ///

[STRONG] "You do good work. / But you seem bored. / Are you?" ///

[SLOW] I don't know why — / I'd never said this out loud to anyone — / but I told her the truth. / I said yes. ///

She asked me one question: / [STRONG] "What's the problem you would work on / if no one was paying you?" ///

[SLOW] I thought about it. / And I said — / somewhat surprised to hear myself say it — / "How organisations communicate in a crisis." ///

She nodded. / She said: / "Then go find the job / where that's the main thing you do. // Stop dabbling / and go all in." ///

[SLOW] That was it. / Eight minutes. ///

Six months later, / I had moved into crisis communications. // It is the best professional decision / I have ever made. ///

[STRONG] I think about Helen often. // Not because she gave me answers — / she didn't. // She just asked the right question / and waited long enough / for me to find my own. ///

[SLOW] That's what good mentorship is. / It doesn't tell you who to be. / It creates the space / for you to figure it out. /`
  },

  // ─── PUBLIC (2) ──────────────────────────────────────────────────────────────

  {
    id: "pub-01",
    title: "Graduation Address",
    category: "public",
    difficulty: "advanced",
    tags: ["graduation", "commencement", "address", "inspiration"],
    description: "A memorable and honest graduation address that avoids clichés and speaks to real uncertainty.",
    content:
      `[SLOW] I want to start by apologising. // Because I'm about to stand here / and give advice / about a world / that you understand better than I do. ///

[SMILE] So I'll try to keep the advice short / and the honesty long. ///

[STRONG] Here is what I actually believe about the moment you're entering. ///

[SLOW] It is more uncertain / than any graduation speech will admit. // The economy you're entering / is one that your parents' careers / did not prepare you for. // The skills that will matter most / in 10 years / are skills that barely exist yet. // And the clear path — / the follow-the-plan, / check-the-boxes, / arrive-at-success path — / is less available to this generation / than to any before it. ///

[STRONG] I know that's not what you expected to hear today. // But I think it's the most **useful** thing I can say. ///

[SLOW] Because here's what I know from watching people / navigate exactly this uncertainty: // The people who do well / are not the ones who had a perfect plan. // They're the ones who stayed **curious** when the plan fell apart. // They're the ones who treated failure / as information / rather than verdict. // They're the ones who showed up for other people / and built relationships / that outlasted the roles that created them. ///

[STRONG] You will be afraid. // Do it anyway. / You will be wrong. // Learn and keep moving. / You will be tempted to compare your path / to everyone else's. / [SLOW] That is the surest way / to miss your own. ///

[SLOW] You have been given something remarkable: / a moment of genuine beginning. // Most people / only get a few of those. ///

[STRONG] Don't waste it / trying to be someone else's version of successful. ///

[SLOW] Go find out what **you** are here to build. // And then — / [SMILE] build it with everything you have. ///

Congratulations, / Class of 2025. /`
  },

  {
    id: "pub-02",
    title: "TED-Style Opening — The Question We're Not Asking",
    category: "public",
    difficulty: "advanced",
    tags: ["TED", "public speaking", "idea", "opening"],
    description: "A TED-style talk opening designed to hook the audience with a provocative framing and urgent question.",
    content:
      `[SLOW] I'd like to start with a question / that I think most of us / have been answering wrong. ///

[STRONG] Not because we're stupid. / Because we've been asking the **wrong version** of it. ///

[SLOW] For the last 20 years, / the dominant conversation about artificial intelligence / has been centred on one question: / **"What can machines do?"** ///

We've measured what they can generate. / What they can diagnose. / What they can drive. / What they can predict. // And the answers / have been increasingly astonishing. ///

[STRONG] But I want to argue / that that's the wrong question. ///

[SLOW] The question that will actually determine / how this technology shapes human life / is not "what can machines do?" ///

It's: / [STRONG] "**Who decides** what they do — / and for whom?" ///

[SLOW] Because here is what I've come to believe / after a decade of working at the intersection of AI and public policy: ///

The technology itself is largely neutral. // The algorithms that recommend content online / are capable of surfacing both misinformation / and extraordinary education. // The systems that screen job applications / can reduce human bias / or encode it at scale. // The AI that diagnoses disease / can democratise access to expert care / or widen the gap between those who can afford it / and those who cannot. ///

[STRONG] The **technology** doesn't make that choice. / **We** do. ///

[SLOW] And right now, / that choice is being made / by a very small number of people, / in a very small number of cities, / with very little accountability / to the billions of people / whose lives it will shape. ///

[STRONG] That is not a technology problem. // That is a governance problem. / A democracy problem. / A **power** problem. ///

[SLOW] And the reason I'm standing here / is that I believe / it is still a solvable one — / if we're willing to ask the right question. ///

Let me show you what that solution could look like. /`
  },
];
