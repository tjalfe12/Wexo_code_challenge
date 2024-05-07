import { useEffect, useState } from "react";
import { useParams, useSearchParams, Link } from "@remix-run/react";
import SingleMovieSample from "../components/SingleMovieSample";

export default function GenreList() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const { genre } = useParams();
  const [searchParams] = useSearchParams();

  const itemsPerPage = 10;

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

  const totalPages = Math.ceil(movies.length / itemsPerPage);

  if (isLoading) {
    return <div className="text-center text-lg">Loading...</div>;
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMovies = movies.slice(startIndex, endIndex);

  return (
    <div>
      <h2 className="text-lg text-center mb-4">{genre.toUpperCase()}</h2>
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
