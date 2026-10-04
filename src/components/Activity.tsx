import { useEffect, useRef, useState } from 'react'
import { ActivityCalendar } from 'react-activity-calendar'
import 'react-activity-calendar/tooltips.css'
import activity from '../activity.json'

const SOURCES = {
  github: {
    label: 'GitHub',
    unit: 'contributions',
    note: `Contributions per day as GitHub reports them. As of ${activity.asOf}.`
  },
  claude: {
    label: 'Claude Code',
    unit: 'messages',
    note: `Messages per day in Claude Code on one machine, tracked since 2026-03-23. Data through ${activity.claudeAsOf}.`
  }
} as const

type Source = keyof typeof SOURCES

export default function Activity() {
  const [source, setSource] = useState<Source>('github')
  const { unit, note } = SOURCES[source]
  const total = activity[source].reduce((sum, d) => sum + d.count, 0).toLocaleString('en-US')
  const grid = useRef<HTMLDivElement>(null)

  // On narrow screens the grid scrolls sideways; start at the most recent weeks.
  useEffect(() => {
    const scroller = grid.current?.querySelector('.react-activity-calendar__scroll-container')
    if (scroller) scroller.scrollLeft = scroller.scrollWidth
  }, [source])

  return (
    <div>
      <div className="mb-5 flex gap-2">
        {(Object.keys(SOURCES) as Source[]).map(key => (
          <button
            key={key}
            type="button"
            aria-pressed={source === key}
            onClick={() => setSource(key)}
            className={`cursor-pointer rounded-full border px-4 py-1.5 text-sm font-medium ${
              source === key ? 'border-accent bg-accent text-bg' : 'border-white/15 text-muted hover:text-ink'
            }`}
          >
            {SOURCES[key].label}
          </button>
        ))}
      </div>
      <div ref={grid}>
        <ActivityCalendar
          data={activity[source]}
          colorScheme="dark"
          theme={{ dark: ['#1f1f29', '#c8ff5c'] }}
          blockSize={13}
          blockMargin={4}
          fontSize={13}
          labels={{ totalCount: `${total} ${unit} in the last year` }}
          tooltips={{ activity: { text: a => `${a.count.toLocaleString('en-US')} ${unit} on ${a.date}` } }}
        />
      </div>
      <p className="mt-3 text-sm text-muted">{note}</p>
    </div>
  )
}
