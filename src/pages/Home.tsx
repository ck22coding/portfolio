import { useSyncExternalStore } from 'react'
import {
  SiClaude,
  SiExpo,
  SiFastapi,
  SiLangchain,
  SiLanggraph,
  SiModelcontextprotocol,
  SiNextdotjs,
  SiSupabase,
  SiTurborepo,
  SiVercel
} from 'react-icons/si'
import AccordionGallery from '../components/reactbits/AccordionGallery'
import CountUp from '../components/reactbits/CountUp'
import LogoLoop from '../components/reactbits/LogoLoop'
import { cover, experience, profile, projects } from '../content'
import stats from '../stats.json'

const wordmark = (text: string) => <span className="font-display text-[22px] font-bold tracking-tight">{text}</span>

const TOOLS = [
  { node: <SiClaude title="Claude" />, title: 'Claude' },
  { node: <SiVercel title="Vercel" />, title: 'Vercel' },
  { node: wordmark('Codex'), title: 'Codex' },
  { node: wordmark('AI SDK'), title: 'AI SDK' },
  { node: <SiTurborepo title="Turborepo" />, title: 'Turborepo' },
  { node: <SiLangchain title="LangChain" />, title: 'LangChain' },
  { node: <SiLanggraph title="LangGraph" />, title: 'LangGraph' },
  { node: <SiModelcontextprotocol title="Model Context Protocol" />, title: 'Model Context Protocol' },
  { node: <SiNextdotjs title="Next.js" />, title: 'Next.js' },
  { node: <SiSupabase title="Supabase" />, title: 'Supabase' },
  { node: <SiFastapi title="FastAPI" />, title: 'FastAPI' },
  { node: <SiExpo title="Expo" />, title: 'Expo' }
]

const GALLERY = projects.map(p => ({ image: cover(p.hue), label: p.label, link: p.link, alt: '' }))

// The gallery stacks its panels under 520px, so it needs the matching orientation there.
const narrow = '(max-width: 520px)'
const subscribeNarrow = (cb: () => void) => {
  const mq = window.matchMedia(narrow)
  mq.addEventListener('change', cb)
  return () => mq.removeEventListener('change', cb)
}
const useNarrow = () => useSyncExternalStore(subscribeNarrow, () => window.matchMedia(narrow).matches)

function SectionTitle({ children }: { children: string }) {
  return <h2 className="mb-6 font-display text-sm font-medium tracking-[0.2em] text-muted uppercase">{children}</h2>
}

export default function Home() {
  const isNarrow = useNarrow()
  return (
    <div className="flex flex-col gap-24">
      <section className="pt-10 md:pt-16">
        <h1 className="font-display text-5xl leading-[1.05] font-bold tracking-tight md:text-7xl">
          {profile.name}
          <span className="block text-accent">{profile.tagline}</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted">{profile.intro}</p>
      </section>

      <section aria-label="By the numbers" className="grid gap-8 sm:grid-cols-3">
        <div className="sm:col-span-2">
          <p className="font-display text-6xl font-bold tabular-nums md:text-8xl">
            <span aria-hidden="true">
              <CountUp to={stats.linesOfCode} separator="," duration={2} />
            </span>
            <span className="sr-only">{stats.linesOfCode.toLocaleString('en-US')}</span>
          </p>
          <p className="mt-2 text-muted">lines of code committed</p>
        </div>
        <div className="flex flex-col justify-end gap-1 text-muted">
          <p>
            <span className="text-ink">{stats.commits.toLocaleString('en-US')}</span> commits
          </p>
          <p>
            <span className="text-ink">{stats.repos}</span> repositories
          </p>
          <p className="text-sm">
            Lines added in code files, excluding lockfiles, build output, and other people&rsquo;s repos. As of{' '}
            {stats.asOf}.
          </p>
        </div>
      </section>

      <section>
        <SectionTitle>Tools</SectionTitle>
        <div className="text-ink">
          <LogoLoop
            logos={TOOLS}
            speed={60}
            logoHeight={34}
            gap={56}
            pauseOnHover
            fadeOut
            fadeOutColor="#0b0b0f"
            ariaLabel="Tools I work with"
          />
        </div>
      </section>

      <section>
        <SectionTitle>Projects</SectionTitle>
        <AccordionGallery
          items={GALLERY}
          orientation={isNarrow ? 'vertical' : 'horizontal'}
          height={isNarrow ? 320 : 440}
          accentColor="#c8ff5c"
          grayscale={false}
        />
        <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
          {projects.map(p => (
            <li key={p.link} className="text-sm text-muted">
              <a className="font-medium text-ink underline decoration-white/25 underline-offset-4 hover:decoration-accent" href={p.link}>
                {p.label}
              </a>{' '}
              — {p.blurb}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <SectionTitle>Experience</SectionTitle>
        <ol className="flex flex-col divide-y divide-white/10">
          {experience.map(r => (
            <li key={r.org} className="grid gap-1 py-5 md:grid-cols-[1fr_2fr] md:gap-8">
              <div>
                <h3 className="font-display text-lg font-medium">{r.org}</h3>
                <p className="text-sm text-muted">{r.dates}</p>
              </div>
              <div>
                <p className="font-medium">{r.title}</p>
                <p className="mt-1 text-muted">{r.note}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </div>
  )
}
