import { useSyncExternalStore, type Key, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
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
import Activity from '../components/Activity'
import AccordionGallery from '../components/reactbits/AccordionGallery'
import CountUp from '../components/reactbits/CountUp'
import LogoLoop, { type LogoItem } from '../components/reactbits/LogoLoop'
import TechText from '../components/reactbits/TechText'
import { cover, experience, profile, projectHref, projects, tools } from '../content'
import stats from '../stats.json'

const wordmark = (text: string) => <span className="font-display text-[22px] font-bold tracking-tight">{text}</span>

// Tools without an icon here fall back to a text wordmark.
const TOOL_ICONS: Record<string, ReactNode> = {
  Claude: <SiClaude aria-hidden="true" />,
  Vercel: <SiVercel aria-hidden="true" />,
  Turborepo: <SiTurborepo aria-hidden="true" />,
  LangChain: <SiLangchain aria-hidden="true" />,
  LangGraph: <SiLanggraph aria-hidden="true" />,
  'Model Context Protocol': <SiModelcontextprotocol aria-hidden="true" />,
  'Next.js': <SiNextdotjs aria-hidden="true" />,
  Supabase: <SiSupabase aria-hidden="true" />,
  FastAPI: <SiFastapi aria-hidden="true" />,
  Expo: <SiExpo aria-hidden="true" />
}

const TOOLS = tools.map(t => ({ node: TOOL_ICONS[t.name] ?? wordmark(t.name), title: t.name, href: t.href }))

// The loop repeats the list to fill the track; only the first copy stays in the tab order.
const renderTool = (item: LogoItem, key: Key) => (
  <a
    href={item.href}
    target="_blank"
    rel="noreferrer noopener"
    aria-label={item.title}
    tabIndex={String(key).startsWith('0-') ? undefined : -1}
    className="group/tool relative flex h-[34px] items-center rounded"
  >
    {'node' in item && item.node}
    <span
      aria-hidden="true"
      className="pointer-events-none absolute top-full left-1/2 mt-3 -translate-x-1/2 rounded bg-panel px-2 py-1 font-sans text-xs whitespace-nowrap text-ink opacity-0 transition-opacity group-hover/tool:opacity-100 group-focus-visible/tool:opacity-100"
    >
      {item.title}
    </span>
  </a>
)

const GALLERY = projects.map(p => ({ image: cover(p.hue), label: p.label, link: projectHref(p), alt: '' }))

// The gallery stacks its panels under 520px, so it needs the matching orientation there.
const narrow = '(max-width: 520px)'
const subscribeNarrow = (cb: () => void) => {
  const mq = window.matchMedia(narrow)
  mq.addEventListener('change', cb)
  return () => mq.removeEventListener('change', cb)
}
const useNarrow = () => useSyncExternalStore(subscribeNarrow, () => window.matchMedia(narrow).matches)

// Tech Text draws on a canvas and cannot wrap, so phones get the tagline as two lines.
const words = profile.tagline.split(' ')
const TAGLINE_LINES = [words.slice(0, 2).join(' '), words.slice(2).join(' ')]

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
          <span className="sr-only"> {profile.tagline}</span>
        </h1>
        <div aria-hidden="true" className="-mx-5 font-display">
          {(isNarrow ? TAGLINE_LINES : [profile.tagline]).map((line, i, lines) => (
            <TechText
              key={line}
              text={line}
              align="left"
              sweep={i === lines.length - 1 && 'once'}
              fontSize={isNarrow ? 48 : 72}
              fontWeight={700}
              letterSpacing={-0.025}
              color="#c8ff5c"
              accentColor="#ededf0"
              style={{ height: isNarrow ? 72 : 108 }}
            />
          ))}
        </div>
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
            renderItem={renderTool}
            className="pb-12"
          />
        </div>
      </section>

      <section>
        <SectionTitle>Activity</SectionTitle>
        <Activity />
      </section>

      <section>
        <SectionTitle>Projects</SectionTitle>
        <AccordionGallery
          items={GALLERY}
          orientation={isNarrow ? 'vertical' : 'horizontal'}
          height={isNarrow ? 64 * projects.length : 440}
          accentColor="#c8ff5c"
          grayscale={false}
        />
        <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
          {projects.map(p => {
            const href = projectHref(p)
            const link = 'font-medium text-ink underline decoration-white/25 underline-offset-4 hover:decoration-accent'
            return (
              <li key={p.slug} className="text-sm text-muted">
                {href.startsWith('/') ? (
                  <Link className={link} to={href}>
                    {p.label}
                  </Link>
                ) : (
                  <a className={link} href={href}>
                    {p.label}
                  </a>
                )}{' '}
                — {p.blurb} <span className="whitespace-nowrap text-accent">({p.status})</span>
              </li>
            )
          })}
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
