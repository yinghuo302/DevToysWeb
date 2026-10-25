export type PageMetadataReport = {
  target: string
  finalUrl: string
  page: Record<string, string>
}

export type WhoisReport = {
  domain: string
  servers: string[]
  summary: Record<string, string | null>
  raw: string
}

type MicrolinkResponse = {
  status?: string
  message?: string
  code?: string
  data?: Record<string, unknown>
}

type RdapEvent = { eventAction?: string; eventDate?: string }
type RdapEntity = {
  roles?: string[]
  vcardArray?: [string, Array<[string, unknown, string, unknown]>]
  entities?: RdapEntity[]
}
type RdapResponse = {
  ldhName?: string
  status?: string[]
  events?: RdapEvent[]
  entities?: RdapEntity[]
}

const metadataSelectors = [
  { field: 'title', selector: 'title', attribute: 'text' },
  { field: 'description', selector: 'meta[name="description"]', attribute: 'content' },
  { field: 'canonical', selector: 'link[rel="canonical"]', attribute: 'href' },
  { field: 'ogTitle', selector: 'meta[property="og:title"]', attribute: 'content' },
  {
    field: 'ogDescription',
    selector: 'meta[property="og:description"]',
    attribute: 'content',
  },
  { field: 'ogImage', selector: 'meta[property="og:image"]', attribute: 'content' },
  { field: 'ogUrl', selector: 'meta[property="og:url"]', attribute: 'content' },
  { field: 'ogType', selector: 'meta[property="og:type"]', attribute: 'content' },
  { field: 'ogSiteName', selector: 'meta[property="og:site_name"]', attribute: 'content' },
  { field: 'ogLocale', selector: 'meta[property="og:locale"]', attribute: 'content' },
  { field: 'ogImageAlt', selector: 'meta[property="og:image:alt"]', attribute: 'content' },
  { field: 'twitterCard', selector: 'meta[name="twitter:card"]', attribute: 'content' },
  { field: 'twitterTitle', selector: 'meta[name="twitter:title"]', attribute: 'content' },
  {
    field: 'twitterDescription',
    selector: 'meta[name="twitter:description"]',
    attribute: 'content',
  },
  { field: 'twitterImage', selector: 'meta[name="twitter:image"]', attribute: 'content' },
  { field: 'twitterSite', selector: 'meta[name="twitter:site"]', attribute: 'content' },
  { field: 'twitterCreator', selector: 'meta[name="twitter:creator"]', attribute: 'content' },
] as const

const isPrivateIpv4 = (hostname: string) => {
  if (!/^\d{1,3}(\.\d{1,3}){3}$/.test(hostname)) return false
  const octets = hostname.split('.').map(Number)
  if (octets.length !== 4 || octets.some((octet) => octet < 0 || octet > 255)) return true
  const [first = 0, second = 0, third = 0] = octets
  return (
    first === 0 ||
    first === 10 ||
    first === 127 ||
    first >= 224 ||
    (first === 100 && second >= 64 && second <= 127) ||
    (first === 169 && second === 254) ||
    (first === 172 && second >= 16 && second <= 31) ||
    (first === 192 && second === 168) ||
    (first === 192 && second === 0 && third === 0) ||
    (first === 192 && second === 0 && third === 2) ||
    (first === 198 && (second === 18 || second === 19)) ||
    (first === 198 && second === 51 && third === 100) ||
    (first === 203 && second === 0 && third === 113)
  )
}

const isPrivateIpv6 = (hostname: string) => {
  const address = hostname.replace(/^\[|\]$/g, '').toLowerCase()
  return (
    address === '::' ||
    address === '::1' ||
    address.startsWith('fc') ||
    address.startsWith('fd') ||
    /^fe[89ab]/.test(address) ||
    address.startsWith('ff') ||
    address.startsWith('::ffff:127.') ||
    address.startsWith('::ffff:10.') ||
    address.startsWith('::ffff:192.168.')
  )
}

const toPublicHttpUrl = (input: string) => {
  const value = input.trim()
  if (!value || value.length > 2048) throw new Error('Enter a URL shorter than 2 KB')
  let url: URL
  try {
    url = new URL(value)
  } catch {
    throw new Error('Enter a complete HTTP or HTTPS URL')
  }
  if (url.protocol !== 'http:' && url.protocol !== 'https:')
    throw new Error('Only HTTP and HTTPS URLs are supported')
  if (url.username || url.password) throw new Error('Remove URL credentials before sending it')
  const hostname = url.hostname.toLowerCase()
  if (
    hostname === 'localhost' ||
    hostname.endsWith('.localhost') ||
    hostname.endsWith('.local') ||
    hostname.endsWith('.internal') ||
    isPrivateIpv4(hostname) ||
    isPrivateIpv6(hostname)
  ) {
    throw new Error(
      'Local or private addresses cannot be queried through a public metadata service',
    )
  }
  return url
}

const readString = (value: unknown) => {
  if (typeof value === 'string') return value
  if (value && typeof value === 'object' && 'value' in value) {
    const nested = (value as { value?: unknown }).value
    return typeof nested === 'string' ? nested : null
  }
  return null
}

/**
 * Microlink's public endpoint performs the remote page fetch; this app makes
 * only a browser-side request and does not expose its own API or secret.
 */
export const fetchOgpMetadata = async (
  input: string,
  fetcher: typeof fetch = fetch,
): Promise<PageMetadataReport> => {
  const target = toPublicHttpUrl(input)
  const endpoint = new URL('https://api.microlink.io/')
  endpoint.searchParams.set('url', target.toString())
  for (const { field, selector, attribute } of metadataSelectors) {
    endpoint.searchParams.set(`data.${field}.selector`, selector)
    endpoint.searchParams.set(`data.${field}.attr`, attribute)
  }

  const response = await fetcher(endpoint, { headers: { accept: 'application/json' } })
  if (!response.ok) throw new Error(`Microlink returned HTTP ${response.status}`)
  const result = (await response.json()) as MicrolinkResponse
  if (result.status !== 'success' || !result.data)
    throw new Error(result.message ?? result.code ?? 'Microlink could not read this page')

  const page: Record<string, string> = {}
  const keyMap = {
    title: 'title',
    description: 'description',
    canonical: 'canonical',
    ogTitle: 'og:title',
    ogDescription: 'og:description',
    ogImage: 'og:image',
    ogUrl: 'og:url',
    ogType: 'og:type',
    ogSiteName: 'og:site_name',
    ogLocale: 'og:locale',
    ogImageAlt: 'og:image:alt',
    twitterCard: 'twitter:card',
    twitterTitle: 'twitter:title',
    twitterDescription: 'twitter:description',
    twitterImage: 'twitter:image',
    twitterSite: 'twitter:site',
    twitterCreator: 'twitter:creator',
  } as const
  for (const [source, destination] of Object.entries(keyMap)) {
    const value = readString(result.data[source])
    if (value) page[destination] = value
  }

  return {
    target: target.toString(),
    finalUrl: readString(result.data.url) ?? page.canonical ?? target.toString(),
    page,
  }
}

const domainPattern = /^(?=.{1,253}$)([a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/i

export const normalizeDomain = (input: string) => {
  const value = input.trim().replace(/\.$/, '')
  let parsed: URL
  try {
    parsed = new URL(`https://${value}`)
  } catch {
    throw new Error('Enter a valid public domain name')
  }
  const hostname = parsed.hostname.toLowerCase()
  if (
    parsed.pathname !== '/' ||
    parsed.search ||
    parsed.hash ||
    parsed.port ||
    !domainPattern.test(hostname)
  )
    throw new Error('Enter a valid public domain name')
  return hostname
}

const entityName = (entity: RdapEntity) => {
  const vcard = entity.vcardArray?.[1]
  const value = vcard?.find(([name]) => name === 'fn' || name === 'org')?.[3]
  return Array.isArray(value) ? value.join(' ') : typeof value === 'string' ? value : null
}

const flattenEntities = (entities: RdapEntity[] = []): RdapEntity[] =>
  entities.flatMap((entity) => [entity, ...flattenEntities(entity.entities)])

const eventValue = (events: RdapEvent[] = [], action: string) =>
  events.find((event) => event.eventAction?.toLowerCase() === action)?.eventDate ?? null

/** Query public RDAP data directly; registries expose this JSON service for free. */
export const lookupWhois = async (
  input: string,
  fetcher: typeof fetch = fetch,
): Promise<WhoisReport> => {
  const domain = normalizeDomain(input)
  const response = await fetcher(`https://rdap.org/domain/${encodeURIComponent(domain)}`, {
    headers: { accept: 'application/rdap+json, application/json' },
  })
  if (response.status === 404) throw new Error(`No registration record found for ${domain}`)
  if (!response.ok) throw new Error(`RDAP returned HTTP ${response.status}`)

  const data = (await response.json()) as RdapResponse
  const entities = flattenEntities(data.entities)
  const registrar = entities.find((entity) => entity.roles?.includes('registrar'))
  const registrationEvent = eventValue(data.events, 'registration')
  const updatedEvent = eventValue(data.events, 'last changed')
  const expirationEvent = eventValue(data.events, 'expiration')
  const server = response.url ? new URL(response.url).host : 'rdap.org'

  return {
    domain: data.ldhName ?? domain,
    servers: [server],
    summary: {
      registrar: registrar ? entityName(registrar) : null,
      createdAt: registrationEvent,
      updatedAt: updatedEvent,
      expiresAt: expirationEvent,
      status: data.status?.join(', ') ?? null,
    },
    raw: JSON.stringify(data, null, 2),
  }
}
