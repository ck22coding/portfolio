import { Link, useParams } from 'react-router-dom'
import { projects } from '../content'

const back = 'underline decoration-white/25 underline-offset-4 hover:decoration-accent'

export default function ProjectPage() {
  const { slug } = useParams()
  const project = projects.find(p => p.slug === slug)
  const page = project?.page

  if (!project || !page) {
    return (
      <div className="pt-10 md:pt-16">
        <h1 className="font-display text-4xl font-bold tracking-tight">Project not found</h1>
        <p className="mt-4">
          <Link className={back} to="/">
            Back to home
          </Link>
        </p>
      </div>
    )
  }

  return (
    <article className="max-w-2xl pt-10 md:pt-16">
      <p className="text-sm tracking-[0.2em] text-accent uppercase">{project.status}</p>
      <h1 className="mt-3 font-display text-5xl font-bold tracking-tight md:text-6xl">{project.label}</h1>
      <p className="mt-4 text-lg text-muted">{project.blurb}</p>

      <h2 className="mt-12 font-display text-sm font-medium tracking-[0.2em] text-muted uppercase">Problem</h2>
      <p className="mt-3">{page.problem}</p>

      <h2 className="mt-10 font-display text-sm font-medium tracking-[0.2em] text-muted uppercase">What I built</h2>
      <ul className="mt-3 flex list-disc flex-col gap-2 pl-5">
        {page.built.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      {page.stack.length > 0 && (
        <>
          <h2 className="mt-10 font-display text-sm font-medium tracking-[0.2em] text-muted uppercase">Stack</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {page.stack.map(item => (
              <li key={item} className="rounded-full border border-white/15 px-3 py-1 text-sm text-muted">
                {item}
              </li>
            ))}
          </ul>
        </>
      )}

      <p className="mt-12 flex gap-6">
        {project.repo && (
          <a className={back} href={project.repo}>
            View on GitHub
          </a>
        )}
        <Link className={back} to="/">
          Back to home
        </Link>
      </p>
    </article>
  )
}
