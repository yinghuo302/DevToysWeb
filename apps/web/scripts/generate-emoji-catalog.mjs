#!/usr/bin/env node

import { writeFile } from 'node:fs/promises'
/**
 * Regenerates the emoji catalog from official Unicode/CLDR data.
 *
 * Sources (© Unicode, Inc., Unicode-3.0 license):
 *  - https://unicode.org/Public/emoji/latest/emoji-test.txt
 *  - https://raw.githubusercontent.com/unicode-org/cldr/main/common/annotations/ja.xml
 *  - https://raw.githubusercontent.com/unicode-org/cldr/main/common/annotationsDerived/ja.xml
 *  - https://raw.githubusercontent.com/unicode-org/cldr/main/common/annotations/zh.xml
 *  - https://raw.githubusercontent.com/unicode-org/cldr/main/common/annotationsDerived/zh.xml
 *
 * Skin-tone-modified sequences are excluded to keep the catalog to one entry
 * per base emoji. Japanese names come from CLDR's short "tts" annotation,
 * the same data Japanese IME emoji pickers use.
 *
 * Run: pnpm --filter @repo/web generate:emoji-catalog
 */

const EMOJI_TEST_URL = 'https://unicode.org/Public/emoji/latest/emoji-test.txt'
const ANNOTATIONS_URL =
  'https://raw.githubusercontent.com/unicode-org/cldr/main/common/annotations/ja.xml'
const ANNOTATIONS_DERIVED_URL =
  'https://raw.githubusercontent.com/unicode-org/cldr/main/common/annotationsDerived/ja.xml'
const ANNOTATIONS_ZH_URL =
  'https://raw.githubusercontent.com/unicode-org/cldr/main/common/annotations/zh.xml'
const ANNOTATIONS_ZH_DERIVED_URL =
  'https://raw.githubusercontent.com/unicode-org/cldr/main/common/annotationsDerived/zh.xml'

const GROUP_TO_CATEGORY = {
  'Smileys & Emotion': 'smileys',
  'People & Body': 'people',
  'Animals & Nature': 'animals',
  'Food & Drink': 'food',
  'Travel & Places': 'travel',
  Activities: 'activities',
  Objects: 'objects',
  Symbols: 'symbols',
  Flags: 'flags',
}

const STOPWORDS = new Set(['with', 'and', 'in', 'on', 'of', 'the', 'a', 'for', 'to', 'without'])
const ZWJ = '‍'

async function fetchText(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`)
  return res.text()
}

function parseAnnotations(xml) {
  const tts = new Map()
  const keywords = new Map()
  const re = /<annotation cp="([^"]+)"([^>]*)>([^<]*)<\/annotation>/g
  let m = re.exec(xml)
  while (m) {
    const [, cp, attributes, textRaw] = m
    const text = textRaw.trim()
    if (/\btype="tts"/.test(attributes)) {
      tts.set(cp, text)
    } else {
      keywords.set(
        cp,
        text
          .split('|')
          .map((w) => w.trim())
          .filter(Boolean),
      )
    }
    m = re.exec(xml)
  }
  return { tts, keywords }
}

function parseEmojiTest(text) {
  let group = null
  const entries = []
  const lineRe = /^([0-9A-F ]+)\s*;\s*(\S+)\s*#\s*(\S+)\s+E[\d.]+\s+(.*)$/
  for (const raw of text.split('\n')) {
    const line = raw.trimEnd()
    if (line.startsWith('# group:')) {
      group = line.slice('# group:'.length).trim()
      continue
    }
    if (!line.trim() || line.startsWith('#')) continue
    const m = lineRe.exec(line)
    if (!m) continue
    const [, cpsRaw, status, , name] = m
    if (status !== 'fully-qualified' || group === 'Component') continue
    const codepoints = cpsRaw
      .trim()
      .split(/\s+/)
      .map((hex) => Number.parseInt(hex, 16))
    if (codepoints.some((cp) => cp >= 0x1f3fb && cp <= 0x1f3ff)) continue // skin tone modifiers
    entries.push({ group, emoji: String.fromCodePoint(...codepoints), name: name.trim() })
  }
  return entries
}

function buildKeywords(emoji, name, jaKeywords, jaName) {
  const words = []
  const seen = new Set()
  const add = (word) => {
    if (!word || seen.has(word)) return
    seen.add(word)
    words.push(word)
  }
  for (const w of jaKeywords ?? []) {
    if (words.length >= 3) break
    if (w !== jaName) add(w)
  }
  for (const w of name.split(/[\s-]+/)) {
    if (words.length >= 6) break
    const lower = w.toLowerCase()
    if (lower.length < 3 || STOPWORDS.has(lower)) continue
    add(lower)
  }
  if (emoji.includes(ZWJ)) {
    add('ZWJ')
    add('ゼロ幅接合子')
  }
  return words
}

async function main() {
  const [emojiTestText, jaXml, jaDerivedXml, zhXml, zhDerivedXml] = await Promise.all([
    fetchText(EMOJI_TEST_URL),
    fetchText(ANNOTATIONS_URL),
    fetchText(ANNOTATIONS_DERIVED_URL),
    fetchText(ANNOTATIONS_ZH_URL),
    fetchText(ANNOTATIONS_ZH_DERIVED_URL),
  ])

  const base = parseAnnotations(jaXml)
  const derived = parseAnnotations(jaDerivedXml)
  const zhBase = parseAnnotations(zhXml)
  const zhDerived = parseAnnotations(zhDerivedXml)
  const entries = parseEmojiTest(emojiTestText)

  const strip = (emoji) => emoji.replaceAll('️', '')
  const lookupTts = (emoji) =>
    base.tts.get(strip(emoji)) ??
    base.tts.get(emoji) ??
    derived.tts.get(strip(emoji)) ??
    derived.tts.get(emoji)
  const lookupZhTts = (emoji) =>
    zhBase.tts.get(strip(emoji)) ??
    zhBase.tts.get(emoji) ??
    zhDerived.tts.get(strip(emoji)) ??
    zhDerived.tts.get(emoji)
  const lookupKeywords = (emoji) =>
    base.keywords.get(strip(emoji)) ??
    base.keywords.get(emoji) ??
    derived.keywords.get(strip(emoji)) ??
    derived.keywords.get(emoji)

  const missing = []
  const missingZh = []
  const rows = []
  for (const e of entries) {
    const category = GROUP_TO_CATEGORY[e.group]
    if (!category) continue
    const ja = lookupTts(e.emoji)
    if (!ja) {
      missing.push(e)
      continue
    }
    const zh = lookupZhTts(e.emoji)
    if (!zh) missingZh.push(e)
    const keywords = buildKeywords(e.emoji, e.name, lookupKeywords(e.emoji), ja)
    rows.push({ emoji: e.emoji, ja, en: e.name, zh: zh ?? e.name, category, keywords })
  }

  const lines = []
  lines.push('// AUTO-GENERATED by scripts/generate-emoji-catalog.mjs — do not edit by hand.')
  lines.push('// Source data (c) Unicode, Inc., Unicode-3.0 license:')
  lines.push('//   https://unicode.org/Public/emoji/latest/emoji-test.txt')
  lines.push(
    '//   https://github.com/unicode-org/cldr (common/annotations(Derived)/ja.xml, zh.xml)',
  )
  lines.push(`// Generated: ${new Date().toISOString().slice(0, 10)}, ${rows.length} entries.`)
  lines.push("import type { EmojiCategory, EmojiEntry } from './emoji-types'")
  lines.push('')
  lines.push(
    '// A typed factory (rather than raw object literals) keeps each entry a plain',
    "// `EmojiEntry`, not a fresh literal type — with ~2,000 entries, TypeScript's",
    '// union-of-literals inference on an untyped array blows past its complexity limit.',
  )
  lines.push(
    'const mk = (emoji: string, ja: string, en: string, zh: string, category: EmojiCategory, keywords: string[]): EmojiEntry => (',
  )
  lines.push('  { emoji, name: { ja, en, zh }, category, keywords }')
  lines.push(')')
  lines.push('')
  lines.push('export const generatedEmojiCatalog: readonly EmojiEntry[] = [')
  for (const row of rows) {
    const kw = row.keywords.map((w) => JSON.stringify(w)).join(', ')
    lines.push(
      `  mk(${JSON.stringify(row.emoji)}, ${JSON.stringify(row.ja)}, ${JSON.stringify(row.en)}, ${JSON.stringify(row.zh)}, ${JSON.stringify(row.category)}, [${kw}]),`,
    )
  }
  lines.push(']')
  const output = `${lines.join('\n')}\n`
  const outputPath =
    process.env.EMOJI_CATALOG_OUTPUT ??
    (process.argv.includes('--write')
      ? 'src/features/emoji/functions/emoji-catalog.generated.ts'
      : undefined)
  if (outputPath) {
    await writeFile(outputPath, output, 'utf8')
  } else {
    process.stdout.write(output)
  }

  if (missing.length) {
    console.error(`Warning: skipped ${missing.length} entries with no Japanese annotation:`)
    for (const e of missing) console.error(`  ${e.emoji} (${e.name})`)
  }
  if (missingZh.length) {
    console.error(`Warning: ${missingZh.length} entries have no Simplified Chinese annotation:`)
    for (const e of missingZh) console.error(`  ${e.emoji} (${e.name})`)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
