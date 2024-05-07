// app/sessions.js
import { createCookieSessionStorage, redirect } from "@remix-run/node"; // or cloudflare/deno
import { sessionCookie } from "./cookies.server";

// Create a session storage object with the session cookie
const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    // a Cookie from `createCookie`
    cookie: sessionCookie,
  });

export { getSession, commitSession, destroySession };
