import { NextRequest, NextResponse } from "next/server"

export const middleware = async (request: NextRequest) => {
    let pathname = request.nextUrl.pathname
    let token = request.cookies.get('token')?.value || ''
    const publicPath = pathname == "/api/auth/login" || pathname == "/api/auth/register"
    if (!publicPath && !token) {
        return NextResponse.redirect(new URL('/api/auth/login', request.nextUrl))
    }
    if (token && publicPath) {
        return NextResponse.redirect(new URL('/api', request.nextUrl))
    }
}
export const config = {
    matcher: [
        "/api/auth/:path*",
        "/",
        "/api"
    ]
}