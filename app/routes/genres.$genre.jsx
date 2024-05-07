import { useEffect, useState } from "react";
import { useParams, useSearchParams, Link } from "@remix-run/react";
import SingleMovieSample from "../components/SingleMovieSample";

export default function GenreList() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const { genre } = useParams();
  const [searchParams] = useSearchParams();
  const [totalCount, setTotalCount] = useState(0);

  const itemsPerPage = 10;

  // Fetch the total count of movies and series for the genre, retrieving only the title field to reduce the payload size
  useEffect(() => {
    const fetchTotalCount = async () => {
      try {
        const movie_response = await fetch(
          `https://feed.entertainment.tv.theplatform.eu/f/jGxigC/bb-all-pas?form=json&range=1-10000&byTags=genre:${genre}&byProgramType=movie&fields=title`
        );
        const movie_data = await movie_response.json();
        const series_response = await fetch(
          `https://feed.entertainment.tv.theplatform.eu/f/jGxigC/bb-all-pas?form=json&range=1-10000&byTags=genre:${genre}&byProgramType=series&fields=title`
        );
        const series_data = await series_response.json();

        setTotalCount(movie_data.entryCount + series_data.entryCount);
      } catch (error) {
        console.error("Error fetching total count:", error);
      }
    };

    fetchTotalCount();
  }, [genre]);

  // Fetch the movies for the genre (implement support for series in the future)
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://feed.entertainment.tv.theplatform.eu/f/jGxigC/bb-all-pas?form=json&byTags=genre:${genre}&byProgramType=movie`
        );
        const data = await response.json();
        setMovies(data.entries);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [genre]);

  useEffect(() => {
    const page = parseInt(searchParams.get("page") || "1");
    setCurrentPage(page);
  }, [searchParams]);

  // Calculate the total number of pages based on the number of movies and the items per page
  const totalPages = Math.ceil(movies.length / itemsPerPage);

  // Display a loading message while fetching the movies
  if (isLoading) {
    return <div className="text-center text-lg">Loading...</div>;
  }

  // Calculate the start and end index for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMovies = movies.slice(startIndex, endIndex);

  return (
    <div>
      <h2 className="text-lg text-center mb-0">{genre.toUpperCase()}</h2>
      <p className="text-center text-sm mb-4">{totalCount} movies found:</p>

      <ul>
        {currentMovies.map((movie) => (
          <li key={movie.id}>
            <SingleMovieSample movie={movie} />
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap pagination gap-y-2 justify-center space-x-2 mt-4 pb-16 sm:pb-8">
        {Array.from({ length: totalPages }, (_, index) => (
          <Link
            key={index + 1}
            to={`?page=${index + 1}`}
            className={`text-xs sm:text-md px-2 sm:px-3 py-1 rounded ${
              currentPage === index + 1
                ? "bg-rose-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {index + 1}
          </Link>
        ))}
      </div>
    </div>
  );
}
