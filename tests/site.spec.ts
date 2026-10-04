import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'
import { projects, skillGroups } from '../src/content'
import stats from '../src/stats.json' with { type: 'json' }

for (const path of ['/', '/skills']) {
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

test('gallery panels link to each project repo', async ({ page }) => {
  await page.goto('/')
  const gallery = page.getByRole('list', { name: 'Image accordion gallery' })
  for (const p of projects) {
    await expect(gallery.getByRole('listitem', { name: p.label })).toHaveAttribute('href', p.link)
  }
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
