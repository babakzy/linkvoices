import { argon2id } from '@noble/hashes/argon2.js'
import { b64ToBytes, bytesToB64, randomBytes } from './bytes'

export const ARGON_PARAMS = { t: 2, m: 19456, p: 1, dkLen: 64 } as const

export interface EncryptedBlob {
  ciphertext: string
  nonce: string
}

export interface PasswordMaterial {
  salt: string
  verifier: string
  wrappingKey: Uint8Array
  kdfParams: {
    name: 'argon2id'
    salt: string
    t: number
    m: number
    p: number
  }
}

function asBuffer(bytes: Uint8Array): ArrayBuffer {
  const copy = new ArrayBuffer(bytes.byteLength)
  new Uint8Array(copy).set(bytes)
  return copy
}

async function importAes(keyBytes: Uint8Array): Promise<CryptoKey> {
  return crypto.subtle.importKey('raw', asBuffer(keyBytes), 'AES-GCM', false, ['encrypt', 'decrypt'])
}

export async function aesEncrypt(keyBytes: Uint8Array, plaintext: Uint8Array): Promise<EncryptedBlob> {
  const nonce = randomBytes(12)
  const key = await importAes(keyBytes)
  const cipher = new Uint8Array(await crypto.subtle.encrypt({ name: 'AES-GCM', iv: asBuffer(nonce) }, key, asBuffer(plaintext)))
  return { ciphertext: bytesToB64(cipher), nonce: bytesToB64(nonce) }
}

export async function aesDecrypt(keyBytes: Uint8Array, blob: EncryptedBlob): Promise<Uint8Array> {
  const key = await importAes(keyBytes)
  const plain = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: asBuffer(b64ToBytes(blob.nonce)) },
    key,
    asBuffer(b64ToBytes(blob.ciphertext)),
  )
  return new Uint8Array(plain)
}

export function derivePasswordMaterial(password: string, saltBytes = randomBytes(16)): PasswordMaterial {
  const salt = saltBytes
  const derived = argon2id(new TextEncoder().encode(password), salt, ARGON_PARAMS)
  return {
    salt: bytesToB64(salt),
    verifier: bytesToB64(derived.slice(0, 32)),
    wrappingKey: derived.slice(32),
    kdfParams: {
      name: 'argon2id',
      salt: bytesToB64(salt),
      t: ARGON_PARAMS.t,
      m: ARGON_PARAMS.m,
      p: ARGON_PARAMS.p,
    },
  }
}

export function wrappingKeyFromPassword(password: string, saltB64: string): Uint8Array {
  const derived = argon2id(new TextEncoder().encode(password), b64ToBytes(saltB64), ARGON_PARAMS)
  return derived.slice(32)
}

export function verifierFromPassword(password: string, saltB64: string): string {
  const derived = argon2id(new TextEncoder().encode(password), b64ToBytes(saltB64), ARGON_PARAMS)
  return bytesToB64(derived.slice(0, 32))
}
