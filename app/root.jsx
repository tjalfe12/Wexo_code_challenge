/* eslint-disable react/prop-types */
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import stylesheet from "~/tailwind.css?url";
import { json, redirect } from "@remix-run/node";
import User from "./models/User.js";
import LoginForm from "./components/LoginForm.jsx";
import Header from "./components/Header.jsx";
import { MovieProvider } from "./movieContext.jsx";
import WishlistedMovie from "./models/WishlistedMovie.js";
import { commitSession, getSession, destroySession } from "./sessions.server";

export async function loader({ request }) {
  const wishlistedMovies = [];

  const session = await getSession(request.headers.get("Cookie"));
  const userId = session.get("userId");

  // Check if the user is logged in
  const isLoggedIn = !!userId;
  // If the user is logged in, get their wishlisted movies
  if (isLoggedIn) {
    const wishlistedMoviesData = await WishlistedMovie.find({ userId });
    wishlistedMoviesData.forEach((movie) => {
      wishlistedMovies.push(movie.movieId);
    });
  }

  //If user is logged in, return wishlist data, otherwise return only logged in status
  return isLoggedIn
    ? json({ isLoggedIn, wishlistedMovies })
    : json({ isLoggedIn, wishlistedMovies: [] });
}

export async function action({ request }) {
  const form = await request.formData();
  const actionType = form.get("action");

  if (actionType === "wishlist") {
    const session = await getSession(request.headers.get("Cookie"));

    const userId = session.get("userId");
    const movieId = form.get("movieId");

    if (!userId) {
      return json({ message: "User is not logged in" }, { status: 401 });
    }

    // Check if the movie is already wishlisted
    const existingWishlistedMovie = await WishlistedMovie.findOne({
      userId,
      movieId,
    });

    // If the movie is already wishlisted, remove it
    if (existingWishlistedMovie) {
      await WishlistedMovie.deleteOne({ _id: existingWishlistedMovie._id });
      return json({ message: "Wishlist action" });
    }

    // If the movie is not wishlisted, add it to the wishlist
    const newWishlistedMovie = new WishlistedMovie({
      userId,
      movieId,
    });

    await newWishlistedMovie.save();

    return json({ message: "Wishlist action" });
  }

  if (actionType === "logout") {
    const session = await getSession(request.headers.get("Cookie"));

    const redirectURL = new URL(request.url).pathname;
    return redirect(redirectURL, {
      headers: {
        "Set-Cookie": await destroySession(session),
      },
    });
  }
  if (actionType === "login") {
    const username = form.get("username");
    const password = form.get("password");

    // Find the user in the database based on the submitted username
    const user = await User.findOne({ username });

    if (user && user.password === password) {
      const session = await getSession(request.headers.get("Cookie"));

      session.set("userId", user._id.toString());
      const redirectURL = new URL(request.url).pathname;
      return redirect(redirectURL, {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      });
    } else {
      return json({ message: "Invalid credentials" }, { status: 401 });
    }
  }
  return null;
}
export function ErrorBoundary({ error }) {
  return (
    <html>
      <head>
        <title>Oh no!</title>
      </head>
      <body>
        <h1 className="text-textPrimary text-lg text-center mt-12">
          Oops! Something went wrong.
        </h1>
      </body>
    </html>
  );
}

export const links = () => [{ rel: "stylesheet", href: stylesheet }];

export function Layout({ children }) {
  const data = useLoaderData();

  var wishlistedMovies = data.wishlistedMovies ? data.wishlistedMovies : [];

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <MovieProvider
          wishlistData={wishlistedMovies}
          isLoggedIn={data.isLoggedIn}
        >
          <Header>
            <LoginForm isLoggedIn={data.isLoggedIn} />
          </Header>
          <div className="pt-16 sm:pt-16 bg-rose-50 min-h-screen font-josefine">
            {children}
          </div>
          <ScrollRestoration />
          <Scripts />
        </MovieProvider>
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
