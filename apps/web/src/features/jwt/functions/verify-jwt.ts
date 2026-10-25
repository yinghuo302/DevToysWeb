import {
  compactVerify,
  createRemoteJWKSet,
  decodeJwt,
  decodeProtectedHeader,
  importSPKI,
} from 'jose'

export type JwtVerifyRequest = {
  token: string
  secret?: string
  publicKey?: string
  jwksUrl?: string
  issuer?: string
  audience?: string
}

export type JwtVerifyResult = {
  valid: boolean
  signatureValid: boolean
  header: Record<string, unknown>
  payload: Record<string, unknown>
  errors: string[]
}

const supportedAlgorithms = new Set([
  'HS256',
  'HS384',
  'HS512',
  'RS256',
  'RS384',
  'RS512',
  'PS256',
  'PS384',
  'PS512',
  'ES256',
  'ES384',
  'ES512',
])

const isSignatureVerificationError = (reason: unknown) =>
  reason instanceof Error &&
  'code' in reason &&
  (reason as { code?: unknown }).code === 'ERR_JWS_SIGNATURE_VERIFICATION_FAILED'

const remoteJwks = (input: JwtVerifyRequest) => {
  if (!input.jwksUrl) throw new Error('A JWKS URL is required')
  let url: URL
  try {
    url = new URL(input.jwksUrl)
  } catch {
    throw new Error('Enter a valid JWKS URL')
  }
  if (url.protocol !== 'https:' && url.protocol !== 'http:')
    throw new Error('JWKS URLs must use HTTP or HTTPS')
  return createRemoteJWKSet(url)
}

const verifySignature = async (token: string, input: JwtVerifyRequest, algorithm: string) => {
  if (algorithm.startsWith('HS')) {
    if (!input.secret) throw new Error('A secret is required for HMAC tokens')
    return await compactVerify(token, new TextEncoder().encode(input.secret), {
      algorithms: [algorithm],
    })
  }
  if (input.jwksUrl)
    return await compactVerify(token, remoteJwks(input), { algorithms: [algorithm] })
  if (!input.publicKey) throw new Error('A public key or JWKS URL is required')
  const key = await importSPKI(input.publicKey, algorithm)
  return await compactVerify(token, key, { algorithms: [algorithm] })
}

/** Verify JWTs in the browser with Web Crypto; only JWKS mode makes a network request. */
export const verifyJwt = async (input: JwtVerifyRequest): Promise<JwtVerifyResult> => {
  const token = input.token.trim()
  if (token.length > 32_000) throw new Error('JWT exceeds the 32 KB limit')
  const parts = token.split('.')
  if (parts.length !== 3) throw new Error('JWT must contain three parts')

  const header = decodeProtectedHeader(token)
  const payload = decodeJwt(token)
  if (!header.alg || header.alg === 'none' || !supportedAlgorithms.has(header.alg))
    throw new Error('Unsupported or unsafe JWT algorithm')

  let signatureValid = false
  try {
    await verifySignature(token, input, header.alg)
    signatureValid = true
  } catch (reason) {
    if (!isSignatureVerificationError(reason)) throw reason
  }

  const now = Math.floor(Date.now() / 1000)
  const errors: string[] = []
  if (!signatureValid) errors.push('Invalid signature')
  if (typeof payload.exp === 'number' && payload.exp <= now) errors.push('Token has expired')
  if (typeof payload.nbf === 'number' && payload.nbf > now) errors.push('Token is not active yet')
  if (input.issuer && payload.iss !== input.issuer) errors.push('Issuer does not match')
  const audiences = Array.isArray(payload.aud) ? payload.aud : [payload.aud]
  if (input.audience && !audiences.includes(input.audience)) errors.push('Audience does not match')

  return {
    valid: errors.length === 0,
    signatureValid,
    header: header as Record<string, unknown>,
    payload: payload as Record<string, unknown>,
    errors,
  }
}
