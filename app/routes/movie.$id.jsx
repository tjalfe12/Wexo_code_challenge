import { useLoaderData } from "@remix-run/react";

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
    <div>
      <h1>{movie.title}</h1>
      <p>{movie.description}</p>
      <p>Genres: {genres.join(", ")}</p>
    </div>
  );
}
