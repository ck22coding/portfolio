import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'
import activity from '../src/activity.json' with { type: 'json' }
import { profile, projectHref, projects, skillGroups, tools } from '../src/content'
import stats from '../src/stats.json' with { type: 'json' }

const casePages = projects.filter(p => p.page)

for (const path of ['/', '/skills', '/media', ...casePages.map(projectHref)]) {
  test(`${path} has no axe violations`, async ({ page }) => {
    await page.goto(path)
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze()
    expect(results.violations.map(v => `${v.id}: ${v.nodes.map(n => n.target).join(' | ')}`)).toEqual([])
  })
}

test('home counts up to the committed line total', async ({ page }) => {
  await page.goto('/')
  const total = stats.linesOfCode.toLocaleString('en-US')
  await expect(page.getByLabel('By the numbers').locator('[aria-hidden="true"]')).toHaveText(total, { timeout: 20_000 })
})

test('gallery panels link to each project repo or case page', async ({ page }) => {
  await page.goto('/')
  const gallery = page.getByRole('list', { name: 'Image accordion gallery' })
  for (const p of projects) {
    await expect(gallery.getByRole('listitem', { name: p.label, exact: true })).toHaveAttribute('href', projectHref(p))
  }
})

test('every case page shows its project and problem', async ({ page }) => {
  for (const p of casePages) {
    await page.goto(projectHref(p))
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(p.label)
    await expect(page.getByRole('article')).toContainText(p.page!.problem)
  }
})

test('nav shows social links as named icons', async ({ page }) => {
  await page.goto('/')
  const nav = page.getByRole('navigation', { name: 'Primary' })
  await expect(nav.getByRole('menuitem', { name: 'GitHub' })).toHaveAttribute('href', profile.links.github)
  await expect(nav.getByRole('menuitem', { name: 'LinkedIn' })).toHaveAttribute('href', profile.links.linkedin)
  await expect(nav.getByRole('menuitem', { name: 'GitHub' }).locator('svg').first()).toBeVisible()
  // The X icon only appears once a profile URL is set in content.ts.
  await expect(nav.getByRole('menuitem', { name: 'X', exact: true })).toHaveCount(profile.links.x ? 1 : 0)
})

test('each tool links to its site and shows its name on focus', async ({ page }) => {
  await page.goto('/')
  const loop = page.getByRole('region', { name: 'Tools I work with' })
  for (const t of tools) {
    await expect(loop.getByRole('link', { name: t.name, exact: true })).toHaveAttribute('href', t.href)
  }
  const first = loop.getByRole('link', { name: tools[0].name, exact: true })
  await expect(first.locator('span[aria-hidden]')).toHaveCSS('opacity', '0')
  await first.focus()
  await expect(first.locator('span[aria-hidden]')).toHaveCSS('opacity', '1')
})

test('activity data has one entry per day with a 0-4 level', () => {
  for (const days of [activity.github, activity.claude]) {
    expect(days.length).toBeGreaterThan(1)
    for (const d of days) {
      expect(d.date).toMatch(/^\d{4}-\d{2}-\d{2}$/)
      expect(d.count).toBeGreaterThanOrEqual(0)
      expect(d.level).toBeGreaterThanOrEqual(0)
      expect(d.level).toBeLessThanOrEqual(4)
    }
  }
})

test('activity grid switches between GitHub and Claude Code', async ({ page }) => {
  await page.goto('/')
  const total = (days: { count: number }[]) => days.reduce((sum, d) => sum + d.count, 0).toLocaleString('en-US')
  await expect(page.getByText(`${total(activity.github)} contributions in the last year`)).toBeVisible()
  await page.getByRole('button', { name: 'Claude Code' }).click()
  await expect(page.getByRole('button', { name: 'Claude Code' })).toHaveAttribute('aria-pressed', 'true')
  await expect(page.getByText(`${total(activity.claude)} prompts in the last year`)).toBeVisible()
})

test('nav reaches the skills page and the tree selects a skill', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('menuitem', { name: 'Skills' }).first().click()
  await expect(page).toHaveURL(/\/skills$/)
  const skill = skillGroups[2].skills[1]
  await page.getByRole('button', { name: skill.name }).click()
  await expect(page.getByRole('article')).toContainText(skill.blurb)
})

test('opening a folder and picking a note selects that skill', async ({ page }) => {
  await page.goto('/skills')
  const skill = skillGroups[1].skills[1]
  await page.getByRole('button', { name: 'mode-memory, plugin' }).click()
  await page.getByRole('button', { name: skill.name, exact: true }).first().click()
  await expect(page.getByRole('article')).toContainText(skill.blurb)
})
