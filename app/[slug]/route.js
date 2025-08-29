import { NextResponse } from 'next/server';
import { redirectsData } from '../../utils/data/redirectsData';

export async function GET(request, { params }) {
  const host = request.headers.get('host')?.split(':')[0];
  if (host === process.env.SHORT_DOMAIN) {
    const slug = params.slug;
    const destination = redirectsData[slug];
    // Redirect to mapped URL if found; otherwise go to main site
    return NextResponse.redirect(
      destination || `https://${process.env.MAIN_DOMAIN || 'grndlvl.com'}`,
      302
    );
  }
  return NextResponse.next();
}
