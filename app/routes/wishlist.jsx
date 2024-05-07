import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import WishlistedMovie from "../models/WishlistedMovie.js";
import SingleMovieSample from "../components/SingleMovieSample.jsx";
import { getSession } from "../sessions.server.js";

export async function loader({ request }) {
  const session = await getSession(request.headers.get("Cookie"));
  const userId = session.get("userId");
  var movies = [];

  if (!userId) {
    throw json({ message: "User is not logged in" }, { status: 401 });
  }

  const wishlistedMovies = await WishlistedMovie.find({ userId });
  const movieIds = wishlistedMovies.map((movie) => movie.movieId);

  movies = await Promise.all(
    movieIds.map(async (movieId) => {
      const response = await fetch(
        `https://feed.entertainment.tv.theplatform.eu/f/jGxigC/bb-all-pas/${movieId}?form=json`
      );
      const data = await response.json();
      return data;
    })
  );

  return json({ movies });
}

export default function WishlistedMovies() {
  const { movies } = useLoaderData();

  function conditionalRender() {
    if (movies.length === 0) {
      return <p className="text-center">No movies wishlisted yet</p>;
    } else {
      return (
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>
              <SingleMovieSample movie={movie} />
            </li>
          ))}
        </ul>
      );
    }
  }

  return (
    <div>
      <h2 className="text-lg text-center mb-4">Wishlisted Movies</h2>
      <ul>{conditionalRender()}</ul>
    </div>
  );
}
