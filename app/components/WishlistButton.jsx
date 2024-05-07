/* eslint-disable react/prop-types */
import { Form, useNavigate } from "@remix-run/react";
import MovieContext from "../movieContext.jsx";
import { useContext, useState, useEffect } from "react";

export default function WishlistButton({ movie_id }) {
  const { wishlistData, isLoggedIn } = useContext(MovieContext);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if movie_id is in the wishlist and update the state accordingly
    setIsWishlisted(wishlistData.includes(movie_id));
  }, [wishlistData, movie_id]);

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
        <button type="submit" className="text-xs border-teal-100 border-2">
          {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
        </button>
      </Form>
    </div>
  );
}
