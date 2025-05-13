// lib/auth.ts
import { compare, hash } from 'bcrypt'
import { nanoid } from 'nanoid'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/prisma'      // ← your Prisma singleton
import * as jose from 'jose'
import { cache } from 'react'

// JWT payload shape
interface JWTPayload {
  userId: string
  [key: string]: string | number | boolean | null | undefined
}

// Replace with process.env and ensure it's ≥32 chars
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET!
)
const JWT_EXPIRATION = '7d'
const REFRESH_THRESHOLD = 24 * 60 * 60

export async function hashPassword(password: string) {
  return hash(password, 10)
}

export async function verifyPassword(password: string, hashed: string) {
  return compare(password, hashed)
}

export async function createUser(email: string, password: string) {
  const hashed = await hashPassword(password)
  const id = nanoid()

  try {
    const user = await prisma.user.create({
      data: { id, email, password: hashed }
    })
    return { id: user.id, email: user.email }
  } catch (e) {
    console.error('createUser error:', e)
    return null
  }
}

export async function generateJWT(payload: JWTPayload) {
  return new jose.SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRATION)
    .sign(JWT_SECRET)
}

export async function verifyJWT(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jose.jwtVerify(token, JWT_SECRET)
    return payload as JWTPayload
  } catch {
    return null
  }
}

export async function shouldRefreshToken(token: string): Promise<boolean> {
  try {
    const { payload } = await jose.jwtVerify(token, JWT_SECRET, {
      clockTolerance: 15
    })
    const exp = payload.exp as number
    const now = Math.floor(Date.now() / 1000)
    return exp - now < REFRESH_THRESHOLD
  } catch {
    return false
  }
}

export async function createSession(userId: string) {
  try {
    const token = await generateJWT({ userId })
    const store = await cookies()
    store.set({
      name: 'auth_token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
      sameSite: 'lax',
    })
    return true
  } catch (e) {
    console.error('createSession error:', e)
    return false
  }
}

export const getSession = cache(async () => {
  try {
    const store = await cookies()
    const token = store.get('auth_token')?.value
    if (!token) return null
    const payload = await verifyJWT(token)
    return payload ? { userId: payload.userId } : null
  } catch (e) {
    if (
      e instanceof Error &&
      e.message.includes('During prerendering, `cookies()` rejects')
    ) {
      return null
    }
    console.error('getSession error:', e)
    return null
  }
})

export async function deleteSession() {
  const store = await cookies()
  store.delete('auth_token')
}

