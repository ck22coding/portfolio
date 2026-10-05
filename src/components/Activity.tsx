import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { ActivityCalendar } from 'react-activity-calendar'
import 'react-activity-calendar/tooltips.css'
import activity from '../activity.json'
import GlideSelect from './reactbits/GlideSelect'

type Day = { date: string; count: number; level: number }

const byDate = (days: Day[]) => new Map(days.map(d => [d.date, d]))
const github = byDate(activity.github)
const claude = byDate(activity.claude)

// The two sources count different things, so a combined square takes the higher of the two levels.
const both: Day[] = [...new Set([...github.keys(), ...claude.keys()])].sort().map(date => {
  const g = github.get(date)
  const c = claude.get(date)
  return { date, count: (g?.count ?? 0) + (c?.count ?? 0), level: Math.max(g?.level ?? 0, c?.level ?? 0) }
})

const SOURCES = {
  both: { label: 'GitHub + Claude Code', data: both },
  github: { label: 'GitHub', data: activity.github },
  claude: { label: 'Claude Code', data: activity.claude }
} as const

type Source = keyof typeof SOURCES

const OPTIONS = (Object.keys(SOURCES) as Source[]).map(value => ({ value, label: SOURCES[value].label }))

// Levels 0-4: the empty square, then the accent at 25, 50, 75 and 100%.
const COLORS = ['#1f1f29', '#495736', '#748f43', '#9ec74f', '#c8ff5c']

// Columns in the grid: weeks start on Sunday, so the first one may be partial.
const first = new Date(both[0].date)
const days = (new Date(both[both.length - 1].date).getTime() - first.getTime()) / 86_400_000 + 1
const WEEKS = Math.ceil((first.getUTCDay() + days) / 7)
// Smallest column pitch; below this the grid scrolls sideways.
const MIN_PITCH = 14
const FONT_SIZE = 13
// Distance from the top of the calendar to the first row of squares (month labels plus spacing), as measured.
const LABELS = FONT_SIZE + 10

const count = (days: Map<string, Day>, date: string, unit: string) =>
  `${(days.get(date)?.count ?? 0).toLocaleString('en-US')} ${unit}`

const tooltip = (source: Source, date: string) => {
  const parts = [
    source !== 'claude' && count(github, date, 'contributions'),
    source !== 'github' && count(claude, date, 'prompts')
  ]
  return `${parts.filter(Boolean).join(', ')} on ${date}`
}

// `children` sits beside the grid on wide screens and can size itself from --squares and --labels.
export default function Activity({ children }: { children: ReactNode }) {
  const [source, setSource] = useState<Source>('both')
  const [width, setWidth] = useState(0)
  const root = useRef<HTMLDivElement>(null)

  // Size the squares so the grid spans the column.
  useLayoutEffect(() => {
    const el = root.current
    if (!el) return undefined
    const observer = new ResizeObserver(() => setWidth(el.clientWidth))
    observer.observe(el)
    setWidth(el.clientWidth)
    return () => observer.disconnect()
  }, [])
  const margin = width / WEEKS >= 18 ? 4 : 3
  const pitch = Math.max(MIN_PITCH, Math.floor(((width + margin) / WEEKS) * 10) / 10)

  // On narrow screens the grid scrolls sideways; start at the most recent weeks.
  useEffect(() => {
    const scroller = root.current?.querySelector('.react-activity-calendar__scroll-container')
    if (scroller) scroller.scrollLeft = scroller.scrollWidth
  }, [source, pitch])

  const sizes = { '--squares': `${7 * pitch - margin}px`, '--labels': `${LABELS}px` } as CSSProperties

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[minmax(0,1fr)_7.5rem]" style={sizes}>
      <div ref={root} className="flex min-w-0 flex-col gap-3">
        <ActivityCalendar
          data={[...SOURCES[source].data]}
          colorScheme="dark"
          theme={{ dark: COLORS }}
          blockSize={pitch - margin}
          blockMargin={margin}
          fontSize={FONT_SIZE}
          showTotalCount={false}
          showColorLegend={false}
          tooltips={{ activity: { text: a => tooltip(source, a.date) } }}
        />
        <div className="flex items-center justify-between gap-4">
          <GlideSelect
            className="[--gs-chip:22px]!"
            options={OPTIONS}
            value={source}
            onChange={value => setSource(value as Source)}
            ariaLabel="Activity source"
            size="sm"
            flip={false}
            accentColor="#c8ff5c"
            surfaceColor="#1f1f29"
            highlightColor="#34343f"
            textColor="#ededf0"
          />
          <p className="flex items-center gap-1 text-[13px] leading-[22px]">
            <span className="mr-1.5">Less</span>
            {COLORS.map(color => (
              <span key={color} className="size-3 rounded-[2px]" style={{ background: color }} />
            ))}
            <span className="ml-1.5">More</span>
          </p>
        </div>
      </div>
      {children}
    </div>
  )
}
