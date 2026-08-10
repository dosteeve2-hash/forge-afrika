import { NextRequest, NextResponse } from 'next/server'

const rateMap = new Map<string, { count: number; reset: number }>()
const LIMIT = 60, WINDOW = 60_000

export function middleware(req: NextRequest) {
  const ip  = req.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown'
  const now = Date.now()
  const entry = rateMap.get(ip) ?? { count: 0, reset: now + WINDOW }
  if (now > entry.reset) { entry.count = 0; entry.reset = now + WINDOW }
  entry.count++
  rateMap.set(ip, entry)
  if (entry.count > LIMIT)
    return new NextResponse('Too Many Requests', { status: 429, headers: { 'Retry-After': '60' } })
  return NextResponse.next()
}

export const config = { matcher: ['/api/:path*'] }
