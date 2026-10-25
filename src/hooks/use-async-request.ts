'use client'

import { useState } from 'react'

/**
 * Runs a one-shot asynchronous operation and exposes its JSON result, error, and loading state.
 */
export const useAsyncRequest = <Request>(
  send: (request: Request) => Promise<unknown>,
  fallbackMessage: string,
) => {
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const run = async (request: Request) => {
    setLoading(true)
    setError('')
    try {
      setOutput(JSON.stringify(await send(request), null, 2))
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : fallbackMessage)
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setOutput('')
    setError('')
  }

  return { output, error, loading, run, reset }
}
