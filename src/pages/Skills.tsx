import { useState } from 'react'
import BranchedMenu from '../components/reactbits/BranchedMenu'
import FolderFloat from '../components/reactbits/FolderFloat'
import { allSkills, skillGroups } from '../content'

const MENU = skillGroups.map(g => ({
  label: g.label,
  children: g.skills.map(s => ({ value: s.id, label: s.name }))
}))

// The two groups that exist as shareable packages get a folder each.
const FOLDERS = skillGroups.filter(g => g.label === 'Published' || g.label === 'mode-memory')

export default function Skills() {
  const [activeId, setActiveId] = useState(allSkills[0].id)
  // Bumped when a folder makes the selection, so the tree remounts onto it.
  const [menuKey, setMenuKey] = useState(0)
  const selectFromFolder = (id: string) => {
    setActiveId(id)
    setMenuKey(k => k + 1)
  }
  const active = allSkills.find(s => s.id === activeId) ?? allSkills[0]

  return (
    <div className="flex flex-col gap-16 overflow-x-clip pt-10 md:pt-16">
      <section>
        <h1 className="font-display text-4xl font-bold tracking-tight md:text-6xl">Skills &amp; plugin</h1>
        <p className="mt-5 max-w-xl text-lg text-muted">
          Claude Code skills I wrote and use, plus the plugin that packages my session workflow. Open a folder or pick
          from the tree.
        </p>
      </section>

      <section aria-label="Skill folders" className="flex flex-wrap justify-center gap-x-40 gap-y-36 pt-24 pb-4">
        {FOLDERS.map(g => (
          <FolderFloat
            key={g.label}
            label={g.label}
            sublabel={g.sublabel}
            trigger="click"
            items={g.skills.map(s => ({ label: s.name, value: s.id }))}
            onSelect={selectFromFolder}
            folderColor="#c8ff5c"
            frontColor="#dcff94"
            itemColor="#ededf0"
            itemTextColor="#0b0b0f"
            labelColor="#0b0b0f"
          />
        ))}
      </section>

      <section className="grid gap-10 md:grid-cols-[280px_1fr]">
        <BranchedMenu
          key={menuKey}
          items={MENU}
          defaultOpen={MENU.map((_, i) => i)}
          defaultActive={activeId}
          onSelect={setActiveId}
          color="#ededf0"
          accentColor="#c8ff5c"
          lineColor="rgba(255,255,255,0.18)"
        />
        <article aria-live="polite" className="order-first h-fit rounded-2xl bg-panel p-8 md:order-none">
          <h2 className="font-display text-2xl font-bold">/{active.name}</h2>
          <p className="mt-3 text-muted">{active.blurb}</p>
          {active.href && (
            <a
              className="mt-6 inline-block rounded-full bg-accent px-5 py-2 text-sm font-semibold text-bg"
              href={active.href}
            >
              View on GitHub
            </a>
          )}
        </article>
      </section>
    </div>
  )
}
