import { useEffect, useRef, useState } from 'react'
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

const count = (days: Map<string, Day>, date: string, unit: string) =>
  `${(days.get(date)?.count ?? 0).toLocaleString('en-US')} ${unit}`

const tooltip = (source: Source, date: string) => {
  const parts = [
    source !== 'claude' && count(github, date, 'contributions'),
    source !== 'github' && count(claude, date, 'prompts')
  ]
  return `${parts.filter(Boolean).join(', ')} on ${date}`
}

export default function Activity() {
  const [source, setSource] = useState<Source>('both')
  const grid = useRef<HTMLDivElement>(null)

  // On narrow screens the grid scrolls sideways; start at the most recent weeks.
  useEffect(() => {
    const scroller = grid.current?.querySelector('.react-activity-calendar__scroll-container')
    if (scroller) scroller.scrollLeft = scroller.scrollWidth
  }, [source])

  return (
    <div ref={grid} className="relative w-fit max-w-full self-start pb-1.5">
      <ActivityCalendar
        data={[...SOURCES[source].data]}
        colorScheme="dark"
        theme={{ dark: ['#1f1f29', '#c8ff5c'] }}
        blockSize={11}
        blockMargin={3}
        fontSize={13}
        showTotalCount={false}
        tooltips={{ activity: { text: a => tooltip(source, a.date) } }}
      />
      {/* Sits in the footer slot the total used to fill; its menu opens upward over the squares. */}
      <GlideSelect
        className="absolute! bottom-0 left-0"
        options={OPTIONS}
        value={source}
        onChange={value => setSource(value as Source)}
        ariaLabel="Activity source"
        size="sm"
        placement="top"
        accentColor="#c8ff5c"
        surfaceColor="#1f1f29"
        highlightColor="#34343f"
        textColor="#ededf0"
      />
    </div>
  )
}
