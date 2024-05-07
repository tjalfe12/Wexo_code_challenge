import { useLoaderData } from "@remix-run/react";
import MovieImage from "../components/MovieImage";
import WishlistButton from "../components/WishlistButton";

async function checkImage(url) {
  try {
    const response = await fetch(url, { method: "HEAD" });
    return response.ok; // Ensure the image URL is accessible
  } catch {
    return false; // Return false on any error
  }
}

export let loader = async ({ params }) => {
  try {
    let response = await fetch(
      `https://feed.entertainment.tv.theplatform.eu/f/jGxigC/bb-all-pas/${params.id}?form=json`
    );
    let data = await response.json();

    const actors =
      data["plprogram$credits"]
        ?.filter((credit) => credit["plprogram$creditType"] === "actor")
        .map((actor) => actor["plprogram$personName"]) || [];
    const directors =
      data["plprogram$credits"]
        ?.filter((credit) => credit["plprogram$creditType"] === "director")
        .map((director) => director["plprogram$personName"]) || [];
    const releaseYear = data["plprogram$year"] || "Unknown";

    const thumbnails = data["plprogram$thumbnails"] || {};
    const thumbnailArray = Object.values(thumbnails).filter((thumbnail) => {
      return (
        thumbnail["plprogram$width"] >= 1280 &&
        thumbnail["plprogram$height"] >= 720
      );
    });

    let backgroundImage = "/placeholder-background.jpg"; // Default image
    for (const image of thumbnailArray) {
      if (await checkImage(image["plprogram$url"])) {
        backgroundImage = image["plprogram$url"];
        break;
      }
    }

    return { movie: data, actors, directors, releaseYear, backgroundImage };
  } catch (error) {
    console.error("Error fetching movie data:", error);
    return null; // Optional: handle errors as you see fit
  }
};

export default function Single_Movie_ID() {
  const { movie, actors, directors, releaseYear, backgroundImage } =
    useLoaderData();

  if (!movie || !movie.id) {
    return <div>Movie not found or error loading movie details.</div>;
  }

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
  const genres = movie["plprogram$tags"]
    .filter((tag) => tag["plprogram$scheme"] === "genre")
    .map((tag) => tag["plprogram$title"]);

  return (
    <div
      style={backgroundStyle}
      className="movie-background pt-8 pb-24 max-w-full m-auto flex flex-col items-center"
    >
      <div className="bg-white w-4/5 sm:w-3/4 pt-6 pb-12 px-8 text-sm sm:text-md rounded-md shadow-md flex flex-col items-center">
        <p className="text-2xl font-dosis tracking-widest mb-4 uppercase">
          {movie.title} ({releaseYear})
        </p>
        <MovieImage
          movieId={movie.id}
          imageClasses="max-h-60 sm:max-h-72 min-h-12 w-48 sm:w-72 object-cover rounded-md shadow-md transition-all duration-300 ease-in-out hover:shadow-lg"
        />
        <div className="flex flex-col items-center gap-4 mt-8 text-left md:text-center">
          <p>{movie.description || "No description available."}</p>
          <p className="text-rose-500 text-md font-dosis tracking-wider">
            {genres.length > 0 ? genres.join(" - ") : "No genres listed."}
          </p>
          <p>
            Actors:{" "}
            {actors.length > 0 ? actors.join(", ") : "No actors listed."}
          </p>
          <p>
            Director(s):{" "}
            {directors.length > 0
              ? directors.join(", ")
              : "No directors listed."}
          </p>
          <WishlistButton movie_id={movie.id} />
        </div>
        <hr className="w-1/2 border-1 border-primary my-2" />
      </div>
    </div>
  );
}
