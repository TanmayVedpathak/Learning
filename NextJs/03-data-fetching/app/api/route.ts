import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest) {
  console.log("URL:", request.url);
  console.log("Method:", request.method);

  return NextResponse.json({
    message: "Hello!",
  });
}
