/* eslint-disable react/prop-types */
import { Link } from "@remix-run/react";
import MovieImage from "./MovieImage";
import WishlistButton from "./WishlistButton";

//Component to display a single movie as part of a genre list
export default function SingleMovieSample({ movie }) {
  //If movie id is not found, display the message
  if (!movie.id) {
    return <div>Movie not found</div>;
  }

  //Extract the ID number from the URL provided ex. from http://data.entertainment.tv.theplatform.eu/entertainment/data/ProgramAvailability/41561640227
  const id = movie.id.split("/").pop();
  movie.id = id;

  return (
    <div>
      <div className="flex flex-col items-center">
        <Link to={`/movie/${movie.id}`}>
          <MovieImage
            movieId={movie.id}
            imageClasses={
              "max-h-36 min-h-12 w-24 sm:w-36 object-cover rounded-md shadow-md transition-all duration-300 ease-in-out hover:shadow-lg"
            }
          />
        </Link>
        <div>
          <Link to={`/movie/${movie.id}`}>
            <p className="text-lg mt-4">{movie.title}</p>
          </Link>
          <WishlistButton movie_id={movie.id} />
        </div>
        <hr className="w-1/2 border-1 border-primary my-2" />
      </div>
    </div>
  );
}
