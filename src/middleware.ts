
// import { createServerClient } from '@supabase/ssr'
// import { NextResponse, type NextRequest } from 'next/server'

// export async function middleware(request: NextRequest) {
//   let response = NextResponse.next({
//     request: { headers: request.headers },
//   })

//   // 1. INITIALIZE SUPABASE
//   const supabase = createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     {
//       cookies: {
//         getAll() { return request.cookies.getAll() },
//         setAll(cookiesToSet) {
//           cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
//           response = NextResponse.next({ request: { headers: request.headers } })
//           cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options))
//         },
//       },
//     }
//   )

//   // 2. CHECK USER
//   const { data: { user } } = await supabase.auth.getUser()

//   const { pathname } = request.nextUrl
//   const isAdminRoute = pathname.startsWith('/admin')
//   const isLoginRoute = pathname === '/admin/login'

//   // 3. SECURITY GATES
  
//   // A. Protect Admin Routes
//   if (isAdminRoute && !isLoginRoute && !user) {
//     return NextResponse.redirect(new URL('/admin/login', request.url))
//   }

//   // B. Prevent Double Login
//   if (isLoginRoute && user) {
//     return NextResponse.redirect(new URL('/admin/dashboard', request.url))
//   }

//   // C. Root Admin Redirect
//   if (pathname === '/admin') {
//      return NextResponse.redirect(new URL(user ? '/admin/dashboard' : '/admin/login', request.url))
//   }

//   return response
// }

// export const config = {
//   matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
// }

import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: { headers: request.headers },
  })

  // 1. INITIALIZE SUPABASE
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({ request: { headers: request.headers } })
          cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options))
        },
      },
    }
  )

  // 2. CHECK IDENTITY
  const { data: { user } } = await supabase.auth.getUser()
  
  const { pathname } = request.nextUrl
  const isAdminRoute = pathname.startsWith('/admin')
  const isLoginRoute = pathname === '/admin/login'

  // 3. SECURITY GATES
  
  // GATE A: Not Logged In -> Kick to Login
  if (isAdminRoute && !isLoginRoute && !user) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  // GATE B: Logged In but Unauthorized (The "Random Google User" Check)
  if (user && isAdminRoute) {
     // Check if this user has a Role in your database
     const { data: roleData } = await supabase
        .from('app_roles')
        .select('role')
        .eq('id', user.id)
        .single()
      
     // If they are NOT in the 'app_roles' table -> BLOCK THEM
     if (!roleData && !isLoginRoute) {
        // Optional: You could redirect to a specific "Unauthorized" page
        // For now, we kick them back to login with an error
        const url = new URL('/admin/login', request.url)
        url.searchParams.set('error', 'unauthorized_access')
        return NextResponse.redirect(url)
     }
  }

  // GATE C: Already Logged In -> Redirect to Dashboard
  if (isLoginRoute && user) {
     // (Optional optimization: Check role here too before redirecting to dashboard)
    return NextResponse.redirect(new URL('/admin/dashboard', request.url))
  }

  // GATE D: Root Admin Redirect
  if (pathname === '/admin') {
     return NextResponse.redirect(new URL(user ? '/admin/dashboard' : '/admin/login', request.url))
  }

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}