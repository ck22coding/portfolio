import { BrowserRouter, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import PillNav from './components/reactbits/PillNav'
import { profile } from './content'
import Home from './pages/Home'
import Skills from './pages/Skills'

const NAV = [
  { label: 'Home', href: '/' },
  { label: 'Skills', href: '/skills' },
  { label: 'GitHub', href: profile.links.github },
  { label: 'LinkedIn', href: profile.links.linkedin }
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
          <a className="hover:text-ink" href={profile.links.github}>
            GitHub
          </a>
          <a className="hover:text-ink" href={profile.links.linkedin}>
            LinkedIn
          </a>
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
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
