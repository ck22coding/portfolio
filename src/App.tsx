import { BrowserRouter, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import { FaGithub, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6'
import PillNav from './components/reactbits/PillNav'
import { media, profile } from './content'
import Home from './pages/Home'
import Media from './pages/Media'
import ProjectPage from './pages/ProjectPage'
import Skills from './pages/Skills'

const icon = 'block h-[18px] w-[18px]'

const SOCIAL = [
  { label: 'GitHub', href: profile.links.github, icon: <FaGithub aria-hidden="true" className={icon} /> },
  { label: 'LinkedIn', href: profile.links.linkedin, icon: <FaLinkedinIn aria-hidden="true" className={icon} /> },
  { label: 'X', href: profile.links.x, icon: <FaXTwitter aria-hidden="true" className={icon} /> }
].filter(link => link.href)

const NAV = [
  { label: 'Home', href: '/' },
  { label: 'Skills', href: '/skills' },
  ...(media.length > 0 ? [{ label: 'Media', href: '/media' }] : []),
  ...SOCIAL
]

function Layout() {
  const { pathname } = useLocation()
  return (
    <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-5">
      <header className="relative flex h-24 justify-center">
        <PillNav
          logo="/profile.jpg"
          logoAlt="Carter King"
          items={NAV}
          activeHref={pathname}
          baseColor="#ededf0"
          pillColor="#0b0b0f"
          pillTextColor="#ededf0"
          hoveredPillTextColor="#0b0b0f"
        />
      </header>
      <main className="flex-1 pb-24">
        <Outlet />
      </main>
      <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 py-8 text-sm text-muted">
        <span>{profile.name}</span>
        <span className="flex gap-5">
          {SOCIAL.map(link => (
            <a key={link.href} className="hover:text-ink" href={link.href}>
              {link.label}
            </a>
          ))}
        </span>
      </footer>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/media" element={<Media />} />
          <Route path="/projects/:slug" element={<ProjectPage />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
