'use client'

import { useState } from 'react'
import { useAsyncRequest } from '@/hooks/use-async-request'
import { type JwtVerifyRequest, verifyJwt } from '../functions/verify-jwt'

export const keyModes = ['jwks', 'publicKey', 'secret'] as const
export type KeyMode = (typeof keyModes)[number]

/** Map the selected key mode to the matching local verifier input. */
const requestField: Record<KeyMode, keyof JwtVerifyRequest> = {
  jwks: 'jwksUrl',
  publicKey: 'publicKey',
  secret: 'secret',
}

export const useJwtVerify = () => {
  const [token, setToken] = useState('')
  const [mode, setMode] = useState<KeyMode>('jwks')
  const [key, setKey] = useState('')
  const [issuer, setIssuer] = useState('')
  const [audience, setAudience] = useState('')
  const request = useAsyncRequest(verifyJwt, 'JWT verification failed')

  /** Switching the key material invalidates whatever was typed for the old one. */
  const changeMode = (next: KeyMode) => {
    setMode(next)
    setKey('')
  }

  const run = () =>
    request.run({
      token,
      issuer: issuer || undefined,
      audience: audience || undefined,
      [requestField[mode]]: key,
    })

  const clear = () => {
    setToken('')
    setKey('')
    setIssuer('')
    setAudience('')
    request.reset()
  }

  return {
    token,
    setToken,
    mode,
    changeMode,
    key,
    setKey,
    issuer,
    setIssuer,
    audience,
    setAudience,
    ...request,
    run,
    clear,
    canSubmit: Boolean(token.trim() && key.trim()),
  }
}
