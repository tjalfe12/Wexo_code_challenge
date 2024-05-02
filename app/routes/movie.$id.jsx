import { useLoaderData } from "@remix-run/react";

export let loader = async ({ params }) => {
  let response = await fetch(
    `https://feed.entertainment.tv.theplatform.eu/f/jGxigC/bb-all-pas/${params.id}?form=json`
  );
  let data = await response.json();
  return data;
};

//Single_Movie_ID component to display the movie detailss
export default function Single_Movie_ID() {
  let movie = useLoaderData();

  //Function to display the movie title and description if the movie is available, else display the message "Movie not found"
  if (!movie.id) {
    return <div>Movie not found</div>;
  }

  return (
    <div>
      <h1>{movie.title}</h1>
      <p>{movie.description}</p>
    </div>
  );
}
