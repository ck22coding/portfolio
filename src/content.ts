// All site copy and data lives here. Edit this file to change what the site says.

export const profile = {
  name: 'Carter King',
  tagline: 'AI strategist and builder.',
  intro:
    'Strategy student at BYU Marriott. I build agent systems and context tooling for teams, and I work on the strategy behind where they fit.',
  links: {
    github: 'https://github.com/ck22coding',
    linkedin: 'https://www.linkedin.com/in/carter-king1/',
    // PLACEHOLDER: set to the full profile URL (https://x.com/<handle>). The X icon stays hidden while this is empty.
    x: ''
  }
}

export type Tool = { name: string; href: string }

// Order here is the order in the loop. Icons are matched by name in src/pages/Home.tsx.
export const tools: Tool[] = [
  { name: 'Claude', href: 'https://claude.ai' },
  { name: 'Vercel', href: 'https://vercel.com' },
  { name: 'Codex', href: 'https://openai.com/codex' },
  { name: 'AI SDK', href: 'https://ai-sdk.dev' },
  { name: 'Turborepo', href: 'https://turborepo.dev' },
  { name: 'LangChain', href: 'https://www.langchain.com' },
  { name: 'LangGraph', href: 'https://www.langchain.com/langgraph' },
  { name: 'Model Context Protocol', href: 'https://modelcontextprotocol.io' },
  { name: 'Next.js', href: 'https://nextjs.org' },
  { name: 'Supabase', href: 'https://supabase.com' },
  { name: 'FastAPI', href: 'https://fastapi.tiangolo.com' },
  { name: 'Expo', href: 'https://expo.dev' }
]

// X posts need only the URL; the post is fetched and drawn by react-tweet.
// LinkedIn has no embed data source, so its text is copied in here.
export type MediaPost =
  | { kind: 'x'; url: string }
  | { kind: 'linkedin'; url: string; author: string; date: string; text: string }

// PLACEHOLDER: empty until post URLs are added. The Media nav item appears once this has an entry.
export const media: MediaPost[] = []

export type Project = {
  slug: string
  label: string
  blurb: string
  status: string
  hue: number
  // Public repo, if there is one.
  repo?: string
  // Case page at /projects/<slug>, for work with no public repo.
  page?: { problem: string; built: string[]; stack: string[] }
}

// Where a project card points: its case page if it has one, otherwise its repo.
export const projectHref = (p: Project): string => (p.page ? `/projects/${p.slug}` : (p.repo ?? '/'))

// Gallery covers are generated placeholders. Swap `cover(...)` for a screenshot
// path in public/ (e.g. '/projects/strat-411.png') when one exists.
export const projects: Project[] = [
  {
    slug: 'strat-411-skills',
    label: 'STRAT 411 Skills',
    blurb: 'Case-analysis skills for Claude Code built on the STRAT 411 method.',
    repo: 'https://github.com/ck22coding/strat-411-skills',
    status: 'public',
    hue: 265
  },
  {
    slug: 'claude-audit',
    label: 'Claude Audit',
    blurb: 'A skill that audits and fixes a Claude Code setup.',
    repo: 'https://github.com/ck22coding/claude-audit',
    status: 'public',
    hue: 20
  },
  {
    slug: 'king-research-crm',
    label: 'King Research CRM',
    blurb: 'Open-source research CRM where your own computer is the backend.',
    repo: 'https://github.com/ck22coding/king-research-crm',
    status: 'public',
    hue: 160
  },
  {
    slug: 'locker-skill',
    label: 'Locker Skill',
    blurb: 'Skill router for Locker, a team skill vault for Claude.',
    repo: 'https://github.com/ck22coding/locker-skill',
    status: 'public',
    hue: 235
  },
  {
    slug: 'afton-king-gallery',
    label: 'Afton King Gallery',
    blurb: 'A live art gallery site.',
    repo: 'https://github.com/ck22coding/afton-king-gallery',
    status: 'public',
    hue: 330
  },
  {
    slug: 'topsail-engagement',
    label: 'Venture Fund Engagement',
    blurb: 'Context system, agents, and a data pipeline for a US venture capital fund.',
    status: 'client work, Apr – Jul 2026',
    hue: 120,
    page: {
      problem:
        'A high-volume US venture capital fund ran its deal flow on manual work: video creation, data extraction, and memo drafting, with its records split across a CRM, email, and LinkedIn. I led the engagement end to end at Topsail Partners. The client is not named.',
      built: [
        'A centralized context operating system that turns unstructured internal data into an indexed, queryable layer agents can retrieve from.',
        'A multi-agent system automating 8 workflows across the deal flow lifecycle.',
        'A pipeline integrating CRM, Gmail, and LinkedIn data, unifying 50,000+ records into a single source of truth.'
      ],
      stack: []
    }
  },
  {
    slug: 'eight-faces',
    label: 'Eight Faces',
    blurb: 'A text-based leadership coach built for a BYU AI Foundry client.',
    status: 'in progress',
    hue: 290,
    page: {
      problem:
        'Leaders face daily leadership challenges with no access to a human coach. This is team client work through the BYU AI Foundry, built on the client’s own leadership framework. I own the agent package; a teammate owns the web app, accounts, and data.',
      built: [
        'A chat screen wired to a LangGraph agent that calls a model through Vercel AI Gateway.',
        'A questionnaire scored in plain code, with a result chart (team).',
        'Sign-in on every screen (team).',
        'Not built yet: the coach prompt, retrieval over the source material, citations, streaming, and stored conversations.'
      ],
      stack: ['Turborepo', 'Next.js', 'AI SDK', 'LangGraph', 'Supabase', 'Playwright']
    }
  },
  {
    slug: 'companion',
    label: 'Companion',
    blurb: 'A personal calendar, scheduler, and goal-tracking app.',
    status: 'in progress',
    hue: 190,
    page: {
      problem:
        'A single-user planner that runs the whole week as Goal → Plan → Act → Account, with people, not tasks, as a first-class unit of progress.',
      built: [
        'Eleven screens rendering on mock data, including a calendar time grid with a block editor, a goals funnel, morning and nightly reviews, and daily and weekly planning steppers.',
        'Screens call typed data functions, so the mock data can be swapped for a database without rewriting them.',
        'Not built yet: the database, sign-in, and calendar sync.'
      ],
      stack: ['Next.js', 'React', 'Tailwind', 'FullCalendar', 'Vitest', 'Playwright']
    }
  },
  {
    slug: 'balkanski',
    label: 'Balkanski',
    blurb: 'A mobile app for learning Croatian, Serbian, and Bosnian.',
    status: 'paused since Jul 2026',
    hue: 45,
    page: {
      problem:
        'A language-learning app built for personal use. It treats Croatian, Serbian, and Bosnian as three distinct languages, keeps regional dialects as data, and orders the curriculum strictly by word frequency with spaced-repetition review on top.',
      built: [
        'Lessons that ask you to produce the word, with inline correction and tiered grading (right, close, wrong) that is aware of diacritics.',
        'A Serbian Latin and Cyrillic toggle, and a view that compares a word across the three languages.',
        'A Python content pipeline that seeds the vocabulary.',
        '100 tests passing as of May 2026. Not built: audio. No store build.'
      ],
      stack: ['Expo', 'React Native', 'TypeScript', 'Supabase', 'Python']
    }
  },
  {
    slug: 'locker',
    label: 'Locker',
    blurb: 'A skill vault that distributes AI coding skills across a team over MCP.',
    status: 'dormant since Aug 2026',
    hue: 210,
    page: {
      problem:
        'Teams share AI coding skills by copying files, so versions drift. Locker lets a team deploy a skill once and have every member get it through the Model Context Protocol.',
      built: [
        'A FastAPI backend with an MCP endpoint and a Next.js dashboard.',
        'Google sign-in, team tokens and personal access tokens, three visibility levels for skills, and encryption at rest.',
        'A command-line tool to deploy, sync, set up, and join.',
        '238+ automated tests. Development stopped in 2026; the project is dormant.'
      ],
      stack: ['Python', 'FastAPI', 'PostgreSQL', 'Next.js', 'MCP']
    }
  }
]

export function cover(hue: number): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="1200" viewBox="0 0 900 1200">
<defs>
<linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
<stop offset="0" stop-color="hsl(${hue} 70% 46%)"/>
<stop offset="1" stop-color="hsl(${(hue + 50) % 360} 60% 14%)"/>
</linearGradient>
<radialGradient id="r" cx="0.25" cy="0.2" r="0.9">
<stop offset="0" stop-color="hsl(${(hue + 320) % 360} 90% 70%)" stop-opacity="0.55"/>
<stop offset="1" stop-color="#000" stop-opacity="0"/>
</radialGradient>
</defs>
<rect width="900" height="1200" fill="url(#g)"/>
<rect width="900" height="1200" fill="url(#r)"/>
<g fill="none" stroke="#fff" stroke-opacity="0.14" stroke-width="2">
<circle cx="700" cy="950" r="160"/><circle cx="700" cy="950" r="300"/><circle cx="700" cy="950" r="440"/>
</g>
</svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

export type Role = { org: string; title: string; dates: string; note: string }

export const experience: Role[] = [
  {
    org: 'BYU AI Foundry',
    title: 'AI Strategist and Engineer, Founding Cohort',
    dates: 'Aug 2026 – present',
    note: 'Student-run AI consultancy at BYU Marriott.'
  },
  {
    org: 'Topsail Partners',
    title: 'AI Forward-Deployed Engineer and Consultant',
    dates: 'Apr – Jul 2026',
    note: 'Led an engagement for a US venture fund: a context operating system, a multi-agent system automating 8 workflows, and a pipeline unifying 50,000+ records.'
  },
  {
    org: 'Revi.Ai (YC F24)',
    title: 'Applied AI Intern',
    dates: 'Feb – Apr 2025',
    note: 'Raised extraction benchmark accuracy from 80% to 98%.'
  },
  {
    org: 'Vermilion Rock Advisors',
    title: 'Investment Banking Intern',
    dates: 'Jan – Apr 2025',
    note: 'Built sourcing workflows producing 45+ qualified targets a week.'
  }
]

export type Skill = { id: string; name: string; blurb: string; href?: string }
export type SkillGroup = { label: string; sublabel: string; skills: Skill[] }

// Claude Code skills and the plugin, grouped. `href` only where the repo is public.
export const skillGroups: SkillGroup[] = [
  {
    label: 'Published',
    sublabel: 'public repos',
    skills: [
      {
        id: 'strat-411',
        name: 'strat-411-skills',
        blurb: 'Walks a business case through framing, solution development, and assumption mapping.',
        href: 'https://github.com/ck22coding/strat-411-skills'
      },
      {
        id: 'claude-audit',
        name: 'claude-audit',
        blurb: 'Audits a Claude Code setup and fixes what it finds.',
        href: 'https://github.com/ck22coding/claude-audit'
      },
      {
        id: 'locker-skill',
        name: 'locker-skill',
        blurb: 'One thin router skill that fetches a team’s skills from a Locker server.',
        href: 'https://github.com/ck22coding/locker-skill'
      }
    ]
  },
  {
    label: 'mode-memory',
    sublabel: 'plugin',
    skills: [
      {
        id: 'close-session',
        name: 'close-session',
        blurb: 'Captures the decisions and state of a session into project and native memory.'
      },
      {
        id: 'new-session',
        name: 'new-session',
        blurb: 'Hands off to a fresh session with a pointer file instead of a transcript.'
      }
    ]
  },
  {
    label: 'Shifts',
    sublabel: 'overnight agent loop',
    skills: [
      { id: 'day-shift', name: 'day-shift', blurb: 'Sprint-plans the projects and cuts the night’s task cards.' },
      {
        id: 'night-shift',
        name: 'night-shift',
        blurb: 'A foreman agent works the queue overnight in isolated worktrees.'
      },
      {
        id: 'morning-shift',
        name: 'morning-shift',
        blurb: 'Reviews the overnight runs against benchmark gates, then merges or rejects.'
      },
      { id: 'dream', name: 'dream', blurb: 'Consolidates the day’s transcripts into memory.' }
    ]
  },
  {
    label: 'Meetings',
    sublabel: 'transcripts to action',
    skills: [
      {
        id: 'transcribe-media',
        name: 'transcribe-media',
        blurb: 'Transcribes a video or audio source locally, with no cloud service.'
      },
      {
        id: 'clean-transcript',
        name: 'clean-transcript',
        blurb: 'Strips filler from a transcript and keeps speakers, decisions, and action items.'
      },
      { id: 'actionize', name: 'actionize', blurb: 'Turns a meeting transcript into one to-do file per person.' }
    ]
  }
]

export const allSkills: Skill[] = skillGroups.flatMap(g => g.skills)
