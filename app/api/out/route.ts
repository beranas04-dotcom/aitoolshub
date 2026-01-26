import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const url = searchParams.get('url');
    const toolId = searchParams.get('toolId');

    if (!url) {
        return new NextResponse('Missing URL parameter', { status: 400 });
    }

    try {
        // Validate that the URL is valid and uses http/https
        const targetUrl = new URL(url);
        if (targetUrl.protocol !== 'http:' && targetUrl.protocol !== 'https:') {
            return new NextResponse('Invalid URL protocol', { status: 400 });
        }

        // Here you would typically log the click event
        // console.log(`Click tracked for tool ${toolId} to ${url}`);

        return NextResponse.redirect(url, { status: 302 }); // Temporary redirect
    } catch (error) {
        return new NextResponse('Invalid URL provided', { status: 400 });
    }
}
