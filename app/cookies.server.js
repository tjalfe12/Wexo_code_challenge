import { createCookie } from "@remix-run/node";

// Create a session cookie with the name "__session"
export const sessionCookie = createCookie("__session", {
  httpOnly: true,
  maxAge: 60 * 60 * 24 * 7,
  secrets: process.env.COOKIE_SECRET,
});
