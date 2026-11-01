import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function proxy(request: NextRequest): NextResponse {
    const path = request.nextUrl.pathname;
    // Verification links remain accessible even when a session cookie exists.
    if (path === "/verifyemail") return NextResponse.next();
    const isAuthPath = path === "/sign-in" || path === "/sign-up";
    const token = request.cookies.get("token")?.value;
    if (isAuthPath && token) {
        return NextResponse.redirect(new URL("/", request.url));
    }
    if (!isAuthPath && !token) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/", "/profile/:path*", "/sign-in", "/sign-up", "/verifyemail"],
};
