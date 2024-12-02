import { Secret } from "saitamadotfun/utils";
import { type NextRequest, NextResponse } from "next/server";

import { saitamaApiKey } from "@/config";

export async function middleware(request: NextRequest) {
  const secret = new Secret(saitamaApiKey);
  const token = request.nextUrl.searchParams.get("auth.token");

  if (token) {
    const decodedToken = await secret.decrypt<string>(decodeURI(token));
    const response = NextResponse.next();
    response.cookies.set("auth.token", decodedToken);

    return response;
  }

  const authToken = request.cookies.get("auth.token");
  request.cookies.delete("auth.token");

  if (authToken && authToken.value) return NextResponse.next();
  const url = new URL(process.env.NEXT_SAITAMA_AUTH_URL!);
  url.searchParams.append("site", process.env.NEXT_SAITAMA_SITE_ID!);
  url.searchParams.append("next", request.nextUrl.toString());

  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/editor"],
};
