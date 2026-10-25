'use client'

import { useState } from 'react'
import { lookupWhois, type WhoisReport } from '@/libs/api/public-services'

export const useWhois = () => {
  const [domain, setDomain] = useState('example.com')
  const [report, setReport] = useState<WhoisReport | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const run = async () => {
    const value = domain.trim()
    if (!value) {
      return
    }
    setLoading(true)
    setError('')
    try {
      setReport(await lookupWhois(value))
    } catch (reason) {
      setReport(null)
      if (reason instanceof Error) setError(reason.message)
      else setError('RDAP lookup failed')
    } finally {
      setLoading(false)
    }
  }

  const clear = () => {
    setDomain('')
    setReport(null)
    setError('')
  }

  return { domain, setDomain, report, error, loading, run, clear }
}
