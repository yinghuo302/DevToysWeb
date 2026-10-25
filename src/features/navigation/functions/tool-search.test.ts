import assert from 'node:assert/strict'
import { test } from 'node:test'
import type { Locale } from '@/i18n/dictionaries'
import { tools } from '@/libs/domain/catalog'
import { matchesToolSearch } from './tool-search'

const jsonFormatter = tools.find((tool) => tool.slug === 'json-format')
if (!jsonFormatter) throw new Error('JSON formatter tool is missing from the catalog')

test('matches the localized Chinese title and description', () => {
  assert.equal(matchesToolSearch(jsonFormatter, 'JSON 格式化', 'zh-CN'), true)
  assert.equal(matchesToolSearch(jsonFormatter, '验证 JSON', 'zh-CN'), true)
})

test('matches titles and descriptions across locales', () => {
  const locales: Locale[] = ['ja', 'en', 'zh-CN']
  for (const locale of locales) {
    assert.equal(matchesToolSearch(jsonFormatter, 'JSON formatter', locale), true)
    assert.equal(matchesToolSearch(jsonFormatter, 'JSON整形', locale), true)
  }
})

test('matches case-insensitively and returns false for absent terms', () => {
  assert.equal(matchesToolSearch(jsonFormatter, 'JSON FORMATTER', 'en'), true)
  assert.equal(matchesToolSearch(jsonFormatter, 'missing-tool-term', 'en'), false)
})
