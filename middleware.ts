import createIntlMiddleware from 'next-intl/middleware';
import { type NextRequest, NextResponse } from 'next/server';

import { locales } from './navigation';

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale: 'en',
});

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith('/auth')) {
    return NextResponse.next();
  }

  // For admin routes, we need to manually handle locale
  if (pathname.startsWith('/admin')) {
    // Get locale from cookie or accept-language header
    const locale =
      request.cookies.get('NEXT_LOCALE')?.value ||
      request.headers.get('accept-language')?.split(',')[0]?.split('-')[0] ||
      'en';

    // Add locale information to the request headers
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-next-intl-locale', locale);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
