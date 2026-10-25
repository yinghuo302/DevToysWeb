import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { fetchOgpMetadata, lookupWhois } from './public-services'

const jsonResponse = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json' },
  })

describe('fetchOgpMetadata', () => {
  it('requests exact Open Graph and X Card fields through Microlink', async () => {
    let requestUrl = ''
    const report = await fetchOgpMetadata('https://example.com/article', async (input) => {
      requestUrl = String(input)
      return jsonResponse({
        status: 'success',
        data: {
          url: 'https://example.com/article',
          title: { value: 'Page title' },
          description: { value: 'Page description' },
          ogTitle: { value: 'Social title' },
          ogImage: { value: 'https://example.com/preview.png' },
          twitterCard: { value: 'summary_large_image' },
        },
      })
    })

    const url = new URL(requestUrl)
    assert.equal(url.origin, 'https://api.microlink.io')
    assert.equal(url.searchParams.get('url'), 'https://example.com/article')
    assert.equal(url.searchParams.get('data.ogTitle.selector'), 'meta[property="og:title"]')
    assert.equal(report.page.title, 'Page title')
    assert.equal(report.page['og:title'], 'Social title')
    assert.equal(report.page['og:image'], 'https://example.com/preview.png')
    assert.equal(report.page['twitter:card'], 'summary_large_image')
  })

  it('rejects local targets and non-HTTP schemes before contacting the service', async () => {
    let requests = 0
    const fetcher: typeof fetch = async () => {
      requests += 1
      return jsonResponse({ status: 'success', data: {} })
    }

    await assert.rejects(
      fetchOgpMetadata('http://localhost:3000', fetcher),
      /Local or private addresses/,
    )
    await assert.rejects(
      fetchOgpMetadata('http://10.0.0.1/', fetcher),
      /Local or private addresses/,
    )
    await assert.rejects(fetchOgpMetadata('file:///etc/passwd', fetcher), /HTTP and HTTPS/)
    await assert.rejects(
      fetchOgpMetadata('https://user:secret@example.com/', fetcher),
      /Remove URL credentials/,
    )
    assert.equal(requests, 0)
  })
})

describe('lookupWhois through RDAP', () => {
  it('normalizes the domain and maps registration fields from RDAP JSON', async () => {
    let requestUrl = ''
    const report = await lookupWhois('Example.COM.', async (input) => {
      requestUrl = String(input)
      return jsonResponse({
        ldhName: 'EXAMPLE.COM',
        status: ['active', 'client transfer prohibited'],
        entities: [
          {
            roles: ['registrar'],
            vcardArray: ['vcard', [['fn', {}, 'text', 'Example Registrar']]],
          },
        ],
        events: [
          { eventAction: 'registration', eventDate: '2020-01-01T00:00:00Z' },
          { eventAction: 'last changed', eventDate: '2024-02-03T00:00:00Z' },
          { eventAction: 'expiration', eventDate: '2030-01-01T00:00:00Z' },
        ],
      })
    })

    assert.equal(requestUrl, 'https://rdap.org/domain/example.com')
    assert.equal(report.domain, 'EXAMPLE.COM')
    assert.equal(report.summary.registrar, 'Example Registrar')
    assert.equal(report.summary.createdAt, '2020-01-01T00:00:00Z')
    assert.equal(report.summary.updatedAt, '2024-02-03T00:00:00Z')
    assert.equal(report.summary.expiresAt, '2030-01-01T00:00:00Z')
    assert.equal(report.summary.status, 'active, client transfer prohibited')
    assert.match(report.raw, /EXAMPLE\.COM/)
  })

  it('rejects malformed hostnames and reports missing RDAP records', async () => {
    await assert.rejects(lookupWhois('localhost', fetch), /valid public domain/)
    await assert.rejects(lookupWhois('example.com/path', fetch), /valid public domain/)
    await assert.rejects(
      lookupWhois('example.com', async () => jsonResponse({ errorCode: 404 }, 404)),
      /No registration record found/,
    )
  })
})
