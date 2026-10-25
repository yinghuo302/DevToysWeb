'use client'

import { useState } from 'react'
import { fetchOgpMetadata, type PageMetadataReport } from '@/libs/api/public-services'

export const useOgpCheck = () => {
  const [url, setUrl] = useState('https://example.com')
  const [report, setReport] = useState<PageMetadataReport | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const run = async () => {
    const value = url.trim()
    if (!value) {
      return
    }
    setLoading(true)
    setError('')
    try {
      setReport(await fetchOgpMetadata(value))
    } catch (reason) {
      setReport(null)
      if (reason instanceof Error) setError(reason.message)
      else setError('OGP check failed')
    } finally {
      setLoading(false)
    }
  }

  const clear = () => {
    setUrl('')
    setReport(null)
    setError('')
  }

  return { url, setUrl, report, error, loading, run, clear }
}
