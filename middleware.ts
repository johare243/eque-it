import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose'
import { NextRequest } from 'next/server'

const secret = new TextEncoder().encode(process.env.JWT_SECRET)

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('auth_token')?.value
  if (!token) {
    const url = req.nextUrl.clone(); url.pathname = '/signin'
    return NextResponse.redirect(url)
  }
  try {
    await jwtVerify(token, secret)
    return NextResponse.next()
  } catch {
    const url = req.nextUrl.clone(); url.pathname = '/signin'
    return NextResponse.redirect(url)
  }
}

export const config = {
  matcher: ['/dashboard/:path*']
}

