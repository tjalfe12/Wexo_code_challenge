/* eslint-disable react/prop-types */
import { Form, useNavigate } from "@remix-run/react";
import MovieContext from "../movieContext.jsx";
import { useContext, useState, useEffect } from "react";

export default function WishlistButton({ movie_id }) {
  const { wishlistData, isLoggedIn } = useContext(MovieContext);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const navigate = useNavigate();

  //If the id is in the form of a URL, extract the ID number
  if (movie_id.includes("/")) {
    movie_id = movie_id.split("/").pop();
  }

  useEffect(() => {
    // Check if movie_id is in the wishlist and update the state accordingly
    setIsWishlisted(wishlistData.includes(movie_id));
  }, [wishlistData, movie_id]);

  // Handle the form submission to add or remove the movie from the wishlist
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const response = await fetch("/", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      navigate(window.location.pathname, { replace: true });
    }
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div>
      <Form method="post" onSubmit={handleSubmit}>
        <input type="hidden" name="action" value="wishlist" />
        <input type="hidden" name="movieId" value={movie_id} />
        <button
          type="submit"
          className="text-xs text-rose-500 border-rose-500 border-2 rounded-full pt-[2px] px-2 my-2 flex flex-col shadow-md hover:bg-rose-500 hover:text-white transition-all duration-300 ease-in-out"
        >
          {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
        </button>
      </Form>
    </div>
  );
}
