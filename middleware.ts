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
    // 从 cookie 获取 locale，避免使用 headers
    const locale = request.cookies.get('NEXT_LOCALE')?.value || 'en';

    // 将 locale 信息添加到 URL 中，而不是请求头
    const url = request.nextUrl.clone();
    url.searchParams.set('locale', locale);

    return NextResponse.rewrite(url);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
