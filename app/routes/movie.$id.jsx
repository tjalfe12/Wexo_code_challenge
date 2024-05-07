import { useLoaderData } from "@remix-run/react";
import MovieImage from "../components/MovieImage";
import WishlistButton from "../components/WishlistButton";

export let loader = async ({ params }) => {
  let response = await fetch(
    `https://feed.entertainment.tv.theplatform.eu/f/jGxigC/bb-all-pas/${params.id}?form=json`
  );
  let data = await response.json();

  const actors = data["plprogram$credits"]
    .filter((credit) => credit["plprogram$creditType"] === "actor")
    .map((actor) => actor["plprogram$personName"]);
  const directors = data["plprogram$credits"]
    .filter((credit) => credit["plprogram$creditType"] === "director")
    .map((director) => director["plprogram$personName"]);
  const releaseYear = data["plprogram$year"];

  return { movie: data, actors, directors, releaseYear };
};

export default function Single_Movie_ID() {
  const { movie, actors, directors, releaseYear } = useLoaderData();

  if (!movie.id) {
    return <div>Movie not found</div>;
  }

  const genres = movie["plprogram$tags"]
    .filter((tag) => tag["plprogram$scheme"] === "genre")
    .map((tag) => tag["plprogram$title"]);

  return (
    <div className="py-2 max-w-full md:w-3/4 m-auto">
      <div className="flex flex-col items-center">
        <p className="text-2xl font-dosis tracking-widest mb-4 uppercase">
          {movie.title} ({releaseYear})
        </p>
        <MovieImage
          movieId={movie.id}
          imageClasses={
            "max-h-60 sm:max-h-72 min-h-12 w-48 sm:w-72 object-cover rounded-md shadow-md transition-all duration-300 ease-in-out hover:shadow-lg"
          }
        />
        <div className="flex flex-col items-center gap-4 mt-4">
          <p>{movie.description}</p>
          <p className="text-rose-500 text-md font-dosis tracking-wider">
            {genres.join(" - ")}
          </p>
          <div>
            <span className="text-md font-semibold">Actors:</span>{" "}
            <span className="text-sm">{actors.join(", ")}</span>
          </div>
          <div>
            <span className="text-md font-semibold">Director(s):</span>{" "}
            <span className="text-sm">{directors.join(", ")}</span>
          </div>
          <WishlistButton movie_id={movie.id} />
        </div>
        <hr className="w-1/2 border-1 border-rose-500 my-16" />
      </div>
    </div>
  );
}
