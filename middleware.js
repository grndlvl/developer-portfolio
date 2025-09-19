import { NextResponse } from 'next/server';
import { redirectsData } from './utils/data/redirectsData';

/**
 * Middleware to handle short domain slug redirects.
 * Redirects paths like '/slug' when accessed on SHORT_DOMAIN to the mapped destination or MAIN_DOMAIN.
 */
export function middleware(request) {
  const host = request.headers.get('host')?.split(':')[0];
  if (host === process.env.SHORT_DOMAIN) {
    const { pathname, search } = request.nextUrl;
    const slug = pathname.slice(1);
    const destination = redirectsData[slug];
    const redirectUrl = destination
      ? destination + search
      : `https://${process.env.MAIN_DOMAIN || 'grndlvl.com'}${search}`;
    return NextResponse.redirect(redirectUrl, 302);
  }
  return NextResponse.next();
}

export const config = {
  matcher: '/:slug',
};
