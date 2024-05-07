import { useLoaderData } from "@remix-run/react";
import MovieImage from "../components/MovieImage";
import WishlistButton from "../components/WishlistButton";

export let loader = async ({ params }) => {
  let response = await fetch(
    `https://feed.entertainment.tv.theplatform.eu/f/jGxigC/bb-all-pas/${params.id}?form=json`
  );
  let data = await response.json();
  return data;
};

export default function Single_Movie_ID() {
  let movie = useLoaderData();

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
          {movie.title}
        </p>
        <MovieImage
          movieId={movie.id}
          imageClasses={
            "max-h-72 min-h-12 w-24 sm:w-72 object-cover rounded-md shadow-md transition-all duration-300 ease-in-out hover:shadow-lg"
          }
        />

        <div className="flex flex-col items-center gap-4 mt-4">
          <p>{movie.description}</p>
          <p className="text-rose-500 text-md font-dosis tracking-wider">
            {genres.join(" - ")}
          </p>

          <WishlistButton movie_id={movie.id} />
        </div>
        <hr className="w-1/2 border-1 border-primary my-2" />
      </div>
    </div>
  );
}
