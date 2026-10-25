import { getToolDescription, getToolTitle, type ToolDefinition } from '@/libs/domain/catalog'
import type { Locale } from '@/i18n/dictionaries'

export const matchesToolSearch = (tool: ToolDefinition, query: string, locale: Locale) => {
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean)
  if (!terms.length) return true

  const searchableText = [
    tool.slug,
    tool.pathSlug,
    tool.category,
    tool.title.ja,
    tool.title.en,
    tool.description.ja,
    tool.description.en,
    getToolTitle(tool, locale),
    getToolDescription(tool, locale),
  ]
    .join(' ')
    .toLowerCase()

  return terms.every((term) => searchableText.includes(term))
}
