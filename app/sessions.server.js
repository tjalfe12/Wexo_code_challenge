// app/sessions.js
import { createCookieSessionStorage, redirect } from "@remix-run/node"; // or cloudflare/deno
import { sessionCookie } from "./cookies.server";

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    // a Cookie from `createCookie` or the CookieOptions to create one
    cookie: sessionCookie,
  });

export { getSession, commitSession, destroySession };

export async function requireUserSession(request) {
  const cookie = request.headers.get("cookie");
  const session = await getSession(cookie);

  if (!session.has("userId")) {
    throw redirect("/");
  }

  return session;
}
