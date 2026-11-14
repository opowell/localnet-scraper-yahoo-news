import { afterEach, describe, expect, it } from 'vitest'
import { parserLoader, resetPage, visit } from '#scraper-test'

// The parser, evaluated with the helpers it is injected with, as a scrape runs it.
const load = parserLoader(__dirname)

afterEach(resetPage)

describe('news fronts', () => {
  it.each([
    ['yahoo-news.js', 'parseYahooNews', 'https://www.yahoo.com/news/', '<a href="/news/us/articles/a-071112620.html">A</a><a href="/news/us/">US</a>', ['https://www.yahoo.com/news/us/articles/a-071112620.html']],
  ])('%s reads a front as a listing of its stories', async (file, parser, url, body, listed) => {
    visit(url, body)
    const parsed = await load(file, [parser])[parser]()
    expect(parsed.listing).toBe(true)
    expect(parsed.links.map((link: any) => link.url)).toEqual(listed)
  })
})
