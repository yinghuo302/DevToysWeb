import assert from 'node:assert/strict'
import { createHmac, generateKeyPairSync, sign as signBytes } from 'node:crypto'
import { describe, it } from 'node:test'
import { verifyJwt } from './verify-jwt'

const encode = (value: unknown) => Buffer.from(JSON.stringify(value)).toString('base64url')

const sign = (payload: Record<string, unknown>, secret = 'test-secret', alg = 'HS256') => {
  const header = encode({ alg, typ: 'JWT' })
  const body = encode(payload)
  const content = `${header}.${body}`
  const digest = alg === 'HS384' ? 'sha384' : alg === 'HS512' ? 'sha512' : 'sha256'
  const signature = createHmac(digest, secret).update(content).digest('base64url')
  return `${content}.${signature}`
}

describe('verifyJwt in the browser', () => {
  it('validates an HMAC signature and standard claims locally', async () => {
    const token = sign({ sub: 'user-1', iss: 'issuer', aud: 'app', exp: 4_102_444_800 })
    const result = await verifyJwt({
      token,
      secret: 'test-secret',
      issuer: 'issuer',
      audience: 'app',
    })

    assert.equal(result.valid, true)
    assert.equal(result.signatureValid, true)
    assert.deepEqual(result.errors, [])
    assert.equal(result.payload.sub, 'user-1')
  })

  it('reports signature, expiration, issuer, and audience failures', async () => {
    const token = sign({ exp: 1, iss: 'wrong', aud: 'other' })
    const result = await verifyJwt({
      token,
      secret: 'wrong-secret',
      issuer: 'issuer',
      audience: 'app',
    })

    assert.equal(result.valid, false)
    assert.equal(result.signatureValid, false)
    assert.deepEqual(result.errors, [
      'Invalid signature',
      'Token has expired',
      'Issuer does not match',
      'Audience does not match',
    ])
  })

  it('verifies an RSA public key without sending the token to a server', async () => {
    const { privateKey, publicKey } = generateKeyPairSync('rsa', { modulusLength: 2048 })
    const header = encode({ alg: 'RS256', typ: 'JWT' })
    const body = encode({ sub: 'rsa-user' })
    const content = `${header}.${body}`
    const signature = signBytes('RSA-SHA256', Buffer.from(content), privateKey).toString(
      'base64url',
    )
    const token = `${content}.${signature}`
    const result = await verifyJwt({
      token,
      publicKey: publicKey.export({ type: 'spki', format: 'pem' }).toString(),
    })

    assert.equal(result.valid, true)
    assert.equal(result.signatureValid, true)
    assert.equal(result.payload.sub, 'rsa-user')
  })

  it('rejects none, malformed tokens, and missing HMAC secrets', async () => {
    const none = `${encode({ alg: 'none' })}.${encode({})}.`
    await assert.rejects(verifyJwt({ token: none }), /Unsupported or unsafe/)
    await assert.rejects(verifyJwt({ token: 'not-a-jwt' }), /three parts/)
    await assert.rejects(verifyJwt({ token: sign({}) }), /secret is required/)
  })
})
