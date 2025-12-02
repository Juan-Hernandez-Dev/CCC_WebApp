import { NextResponse, type NextRequest } from 'next/server';

// Simple, secure image proxy for external image hosts (e.g. Google Photos)
// Validates hostname and streams the upstream response back to the client
export async function GET(req: NextRequest) {
  try {
    // NextRequest provides `nextUrl` which has parsed search params
    const url = req.nextUrl?.searchParams?.get('url') ?? null;
    if (!url) return NextResponse.json({ error: 'Missing url parameter' }, { status: 400 });

    let parsed: URL;
    try {
      parsed = new URL(url);
    } catch (e) {
      return NextResponse.json({ error: 'Invalid url' }, { status: 400 });
    }

    // Whitelist common image hosts to avoid open proxy abuse
    const allowedHosts = [
      'lh3.googleusercontent.com',
      'googleusercontent.com',
      'i.imgur.com',
      'pbs.twimg.com',
    ];

    const isAllowed = allowedHosts.some((h) => parsed.hostname.endsWith(h));
    if (!isAllowed) return NextResponse.json({ error: 'Host not allowed' }, { status: 403 });

    // Fetch with timeout (10 seconds max)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const upstream = await fetch(url, { 
      method: 'GET',
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    clearTimeout(timeoutId);

    if (!upstream.ok) {
      console.error(`[image-proxy] Upstream fetch failed: ${url} - Status: ${upstream.status}`);
      return new Response(null, { status: upstream.status });
    }

    // Forward content-type and stream body. Add caching to reduce repeated upstream hits
    const headers = new Headers(upstream.headers as HeadersInit);
    // Ensure we set a caching policy to reduce repeated upstream calls
    headers.set('Cache-Control', 'public, max-age=86400, stale-while-revalidate=86400');

    return new Response(upstream.body, {
      status: upstream.status,
      headers,
    });
  } catch (err: any) {
    console.error('[image-proxy] Error:', err?.message || err);
    return new Response(null, { status: 500 });
  }
}
