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

  // 对于 admin 路由，我们需要手动处理 locale
  if (pathname.startsWith('/admin')) {
    // 从 cookie 或 accept-language 头中获取 locale
    const locale =
      request.cookies.get('NEXT_LOCALE')?.value ||
      request.headers.get('accept-language')?.split(',')[0]?.split('-')[0] ||
      'en';

    // 将 locale 信息添加到请求头中
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
