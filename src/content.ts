// All site copy and data lives here. Edit this file to change what the site says.

export const profile = {
  name: 'Carter King',
  tagline: 'AI strategist and builder.',
  intro:
    'Strategy student at BYU Marriott. I build agent systems and context tooling for teams, and I work on the strategy behind where they fit.',
  links: {
    github: 'https://github.com/ck22coding',
    linkedin: 'https://www.linkedin.com/in/carter-king1/'
  }
}

export type Project = { label: string; blurb: string; link: string; hue: number }

// Gallery covers are generated placeholders. Swap `cover(...)` for a screenshot
// path in public/ (e.g. '/projects/strat-411.png') when one exists.
export const projects: Project[] = [
  {
    label: 'STRAT 411 Skills',
    blurb: 'Case-analysis skills for Claude Code built on the STRAT 411 method.',
    link: 'https://github.com/ck22coding/strat-411-skills',
    hue: 265
  },
  {
    label: 'Claude Audit',
    blurb: 'A skill that audits and fixes a Claude Code setup.',
    link: 'https://github.com/ck22coding/claude-audit',
    hue: 20
  },
  {
    label: 'King Research CRM',
    blurb: 'Open-source research CRM where your own computer is the backend.',
    link: 'https://github.com/ck22coding/king-research-crm',
    hue: 160
  },
  {
    label: 'Locker Skill',
    blurb: 'Skill router for Locker, a team skill vault for Claude.',
    link: 'https://github.com/ck22coding/locker-skill',
    hue: 210
  },
  {
    label: 'Afton King Gallery',
    blurb: 'A live art gallery site.',
    link: 'https://github.com/ck22coding/afton-king-gallery',
    hue: 330
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
