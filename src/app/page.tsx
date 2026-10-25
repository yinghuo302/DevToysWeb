import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { alternatesFor } from '@/features/seo/domain/site'
import { defaultLocale } from '@/i18n/dictionaries'

// The static export renders `/` as an empty client-redirect shell, so point
// crawlers at the default-language home page instead of indexing a blank URL.
export const metadata: Metadata = {
  alternates: alternatesFor(defaultLocale),
}

const Page = () => {
  redirect(`/${defaultLocale}/`)
}

export default Page
