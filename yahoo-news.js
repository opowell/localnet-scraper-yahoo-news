// An article (/news/articles/…-230000048.html) reads as its headline and the paragraphs, headings, lists and pictures
// of its body (the article's .col-body, without the header that names its publisher; the recommended articles
// after it are outside it), headed by its authors and time. Any other page (/news, a section) is a listing of each
// article and live page it links to.
function parseYahooNews(_profileId) {
  if (!/(?:^|\.)yahoo\.com$/.test(location.hostname) || !location.pathname.startsWith('/news')) {
    return null
  }
  return newsPage({
    body: 'article .col-body, .caas-body',
    skip: 'header, aside, [data-testid^="ad-"], [data-testid*="-ad-"], .caas-da',
    listed: /^https:\/\/www\.yahoo\.com\/news\/.+\.html$/,
  })
}

// The parser a scrape calls.
registerParser(parseYahooNews)
