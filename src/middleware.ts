// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'

// export function middleware(request: NextRequest) {
//   // 1. IDENTIFY THE ZONES
//   const isAdminRoute = request.nextUrl.pathname.startsWith('/admin')
//   const isLoginRoute = request.nextUrl.pathname === '/admin/login'

//   // 2. CHECK CREDENTIALS (The "nexus_session" cookie)
//   // We set this cookie in the Login page when you enter the correct code.
//   const hasSession = request.cookies.has('nexus_session')

//   // 3. THE RULES OF ENGAGEMENT
  
//   // RULE A: If trying to enter Admin (and not on Login) without a session -> KICK OUT
//   if (isAdminRoute && !isLoginRoute && !hasSession) {
//     return NextResponse.redirect(new URL('/admin/login', request.url))
//   }

//   // RULE B: If already logged in and trying to access Login -> REDIRECT TO BRIDGE
//   if (isLoginRoute && hasSession) {
//     return NextResponse.redirect(new URL('/admin/dashboard', request.url))
//   }

//   // Allow all other requests to pass
//   return NextResponse.next()
// }

// // 4. THE SCOPE (Where this logic applies)
// export const config = {
//   matcher: ['/admin/:path*'],
// }

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isAdminRoute = pathname.startsWith('/admin')
  const isLoginRoute = pathname === '/admin/login'
  const isRootAdmin = pathname === '/admin' // Exact match

  const hasSession = request.cookies.has('nexus_session')

  // 1. Redirect root /admin to dashboard (or login)
  if (isRootAdmin) {
     const target = hasSession ? '/admin/dashboard' : '/admin/login';
     return NextResponse.redirect(new URL(target, request.url));
  }

  // 2. Protect Admin Routes
  if (isAdminRoute && !isLoginRoute && !hasSession) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  // 3. Prevent Login access if already authenticated
  if (isLoginRoute && hasSession) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}