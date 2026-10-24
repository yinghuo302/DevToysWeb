import assert from 'node:assert/strict'
import { readdirSync, readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import test from 'node:test'
import { getChineseCopy } from '@/hooks/use-translate'
import { fancyStyles } from '@/features/fancy-text/functions/fancy-text'
import { emojiCatalog } from '@/features/emoji/functions/emoji'
import { kaomojiCatalog } from '@/features/kaomoji/functions/kaomoji'
import { invisibleCharacters } from '@/features/invisible/functions/invisible'
import { FIELD_DEFS } from '@/features/test-data/functions/test-data'
import { unitFamilies } from '@/features/unit-convert/functions/units'
import { toolGuides } from '@/libs/domain/tool-guides'

const sourceRoot = resolve(process.cwd(), 'src')
const sourceFiles = (directory: string): string[] =>
  readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name)
    if (entry.isDirectory()) return sourceFiles(path)
    return entry.isFile() && path.endsWith('.tsx') ? [path] : []
  })

const bilingualCall =
  /\bt\(\s*(['"])((?:\\.|(?!\1)[\s\S])*?)\1\s*,\s*(['"])((?:\\.|(?!\3)[\s\S])*?)\3(?:\s*,\s*(['"])((?:\\.|(?!\5)[\s\S])*?)\5)?/g

test('every static bilingual workspace string has a zh-CN translation', () => {
  const untranslated: string[] = []

  for (const path of sourceFiles(sourceRoot)) {
    const source = readFileSync(path, 'utf8')
    for (const match of source.matchAll(bilingualCall)) {
      const english = match[4]
      const explicitChinese = match[6]
      const hasExplicitChinese = Boolean(explicitChinese && /[\u3400-\u9fff]/.test(explicitChinese))
      if (!hasExplicitChinese && !getChineseCopy(english)) untranslated.push(`${path}: ${english}`)
    }
  }

  assert.deepEqual(untranslated, [], `Missing Simplified Chinese copy:\n${untranslated.join('\n')}`)
})

test('every tool guide instruction and caution has a zh-CN translation', () => {
  const untranslated: string[] = []

  for (const [slug, guide] of Object.entries(toolGuides)) {
    for (const line of [...guide.usage.en, ...guide.notes.en]) {
      if (!getChineseCopy(line)) untranslated.push(`${slug}: ${line}`)
    }
  }

  assert.deepEqual(
    untranslated,
    [],
    `Missing translated tool guide copy:\n${untranslated.join('\n')}`,
  )
})

test('data-backed workspace labels are localized in Simplified Chinese', () => {
  const labels = [
    ...FIELD_DEFS.map((field) => field.label.en),
    ...unitFamilies.flatMap((family) => [
      family.name.en,
      ...family.units.map((unit) => unit.name.en),
    ]),
    ...fancyStyles.map((style) => style.name.en),
    ...kaomojiCatalog.map((entry) => entry.name.en),
    ...invisibleCharacters.flatMap((character) => [character.name.en, character.description.en]),
  ]
  const untranslated = labels.filter((label) => !getChineseCopy(label))
  assert.deepEqual(untranslated, [], `Missing translated data labels:\n${untranslated.join('\n')}`)
})

test('every emoji catalog entry has a Simplified Chinese name or standard acronym', () => {
  const standardAcronyms = new Set(['OK', 'DVD', 'DNA'])
  const untranslated = emojiCatalog
    .filter(
      (entry) => !/[\u3400-\u9fff]/.test(entry.name.zh) && !standardAcronyms.has(entry.name.zh),
    )
    .map((entry) => `${entry.emoji} ${entry.name.en}: ${entry.name.zh}`)

  assert.deepEqual(untranslated, [], `Missing Chinese emoji names:\n${untranslated.join('\n')}`)
})
