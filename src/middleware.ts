import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from './lib/auth';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value;
  const { pathname } = request.nextUrl;

  // Public routes that don't require authentication
  const publicRoutes = ['/', '/api/search', '/api/stats', '/api/test'];
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Admin routes require authentication
  if (pathname.startsWith('/admin')) {
    // Allow access to login page
    if (pathname === '/admin/login') {
      return NextResponse.next();
    }

    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    const user = verifyToken(token);
    if (!user) {
      // Clear invalid token
      const response = NextResponse.redirect(new URL('/admin/login', request.url));
      response.cookies.delete('auth-token');
      return response;
    }

    // Check if user has admin role for admin routes
    if (user.role !== 'admin') {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
  ],
};
