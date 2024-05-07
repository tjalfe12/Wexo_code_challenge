/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import SingleMovieSample from "./SingleMovieSample";
import { Link } from "@remix-run/react";

export default function GenreSampler({ genre, type }) {
  const [items, setItems] = useState(null);
  const [displayedItems, setDisplayedItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const items_per_page = 3;
  let totalPages;
  const buttonStyle =
    "text-rose-500 border-2 border-rose-500 text-sm sm:text-md font-dosis tracking-widest font-medium rounded-full mb-1 py-0 w-20 sm:w-24 mx-1 sm:mx-2 hover:bg-rose-500 hover:text-white hover:shadow-md transition-all duration-300 ease-in-out";

  // Fetch movies or series based on genre
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(
          `https://feed.entertainment.tv.theplatform.eu/f/jGxigC/bb-all-pas?form=json&byTags=genre:${genre}&byProgramType=${type}`
        );
        const data = await response.json();
        setItems(data);
        setDisplayedItems(data.entries.slice(0, items_per_page));
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, [genre, type]);

  // Update displayed items when currentPage changes
  useEffect(() => {
    if (items) {
      const startIndex = (currentPage - 1) * items_per_page;
      const endIndex = startIndex + items_per_page;
      const newItems = items.entries.slice(startIndex, endIndex);
      setDisplayedItems(newItems);
    }
  }, [currentPage, items]);

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  // Conditional rendering based on whether movies have been fetched yet
  function conditionalRender() {
    if (!items) {
      return <div className="text-center text-lg pt-4">Loading...</div>;
    } else {
      totalPages = Math.ceil(items.entries.length / items_per_page);

      return (
        <div className="h-full flex flex-col items-center justify-between text-center py-2 px-6">
          <Link to={`/genres/${genre}`}>
            <button className="text-xs border-2 border-rose-500 text-rose-500 rounded-full pt-1 px-4 my-2 flex flex-col shadow-md hover:bg-rose-500 hover:text-white transition-all">
              See all {items.entries.length}{" "}
              {type == "movie" ? "movies" : "series"} in {genre}
            </button>
          </Link>
          <ul className="flex flex-col justify-start h-full">
            {displayedItems.map((item) => (
              <li className="my-3" key={item.id}>
                <SingleMovieSample movie={item} />
              </li>
            ))}
          </ul>
          <div>
            <div>
              <button
                className={buttonStyle}
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <button
                className={buttonStyle}
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
            <p className="mt-2">
              {currentPage} of {totalPages}
            </p>
          </div>
        </div>
      );
    }
  }

  // Hide the genre sampler if there are no movies or series in the genre
  let hiddenIfEmpty = "";
  if (items) {
    if (items.entries.length == 0) {
      hiddenIfEmpty = "hidden";
    }
  }
  //Capitalize the first letter of the genre
  genre = genre.charAt(0).toUpperCase() + genre.slice(1);

  return (
    <div className={"shadow-md bg-white rounded-b-md pb-8 " + hiddenIfEmpty}>
      <Link to={`/genres/${genre}`}>
        <h5 className="text-xl font-dosis font-thin tracking-widest text-center text-white rounded-t-md bg-gradient-to-b from-rose-400 to-rose-500">
          {genre.toUpperCase()}
        </h5>
      </Link>
      {conditionalRender()}
    </div>
  );
}
