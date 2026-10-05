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
    unit: 'prompts',
    note: `Prompts I typed per day in Claude Code on one machine, from ${activity.claudeSince}. Data through ${activity.claudeAsOf}.`
  }
} as const

const SINCE = new Date(`${activity.since}T00:00:00`).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

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
          blockSize={11}
          blockMargin={3}
          fontSize={13}
          labels={{ totalCount: `${total} ${unit} since ${SINCE}` }}
          tooltips={{ activity: { text: a => `${a.count.toLocaleString('en-US')} ${unit} on ${a.date}` } }}
        />
      </div>
      <p className="mt-3 text-sm text-muted">{note}</p>
    </div>
  )
}
