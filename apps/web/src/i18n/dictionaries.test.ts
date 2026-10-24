// biome-ignore-all lint/security/noSecrets: These assertions validate user-facing translations.

import assert from 'node:assert/strict'
import test from 'node:test'
import { getChineseCopy } from '@/hooks/use-translate'
import { alternatesFor, siteUrl } from '@/features/seo/domain/site'
import { getToolDescription, tools } from '@/libs/domain/catalog'
import { defaultLocale, getDictionary, isLocale, locales } from './dictionaries'

test('includes Simplified Chinese as a supported static locale', () => {
  assert.ok(locales.includes('zh-CN'))
  assert.equal(isLocale('zh-CN'), true)
  assert.equal(isLocale('zh-TW'), false)
})

test('uses Simplified Chinese as the default route and x-default alternate', () => {
  assert.equal(defaultLocale, 'zh-CN')
  assert.equal(alternatesFor(defaultLocale).canonical, `${siteUrl}/zh-CN/`)
  assert.equal(
    alternatesFor('en', 'about-app').languages['x-default'],
    `${siteUrl}/zh-CN/about-app/`,
  )
})

test('provides Chinese copy for the shared application interface', () => {
  const dictionary = getDictionary('zh-CN')
  assert.equal(dictionary.tagline, '开发日常，轻松一点。')
  assert.equal(dictionary.search, '搜索工具')
  assert.equal(dictionary.categories.converters, '格式转换')
})

test('translates every static content page to Simplified Chinese', () => {
  const chinese = getDictionary('zh-CN').contentPages
  const english = getDictionary('en').contentPages

  for (const slug of Object.keys(chinese) as (keyof typeof chinese)[]) {
    assert.notEqual(chinese[slug].title, english[slug].title, `${slug} title is untranslated`)
    assert.match(chinese[slug].description, /[\u3400-\u9fff]/, `${slug} description is not Chinese`)
  }
})

test('provides a Chinese description for every tool in the catalog', () => {
  for (const tool of tools) {
    assert.match(
      getToolDescription(tool, 'zh-CN'),
      /[\u3400-\u9fff]/,
      `${tool.slug} description is not localized`,
    )
  }
})

test('translates data-driven unit labels and dynamic workspace copy', () => {
  assert.equal(getChineseCopy('Kilometre'), '千米')
  assert.equal(getChineseCopy('Monday'), '星期一')
  assert.equal(getChineseCopy('Quality (75%)'), '质量（75%）')
  assert.equal(getChineseCopy('Convert 3 file(s)'), '转换 3 个文件')
})
