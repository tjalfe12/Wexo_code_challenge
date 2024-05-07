/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

const MovieImage = ({ movieId, imageClasses }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieImage = async () => {
      setLoading(true); // Start loading when the fetch starts
      try {
        const response = await fetch(
          `https://feed.entertainment.tv.theplatform.eu/f/jGxigC/bb-all-pas/${movieId}?form=json`
        );
        const data = await response.json();

        // Filter thumbnails that have a URL from "voduzi" as they seem to work still
        const voduziThumbnails = Object.values(
          data["plprogram$thumbnails"]
        ).filter((thumbnail) => thumbnail["plprogram$url"].includes("voduzi"));

        if (voduziThumbnails.length > 0) {
          // Sort thumbnails by size (width * height) in ascending order
          const sortedThumbnails = voduziThumbnails.sort((a, b) => {
            const sizeA = a["plprogram$width"] * a["plprogram$height"];
            const sizeB = b["plprogram$width"] * b["plprogram$height"];
            return sizeA - sizeB;
          });

          // Set the smallest thumbnail URL
          setImageUrl(sortedThumbnails[0]["plprogram$url"]);
        } else {
          // Set a placeholder image if no "voduzi" thumbnails are found

          setImageUrl("/placeholder.jpg");
        }
      } catch (error) {
        console.error("Error fetching movie image:", error);
        setImageUrl("/placeholder.jpg");
      }
      setLoading(false); // Stop loading when the fetch is complete or fails
    };

    fetchMovieImage();
  }, [movieId]);

  return loading ? (
    <div className={imageClasses + "flex justify-center items-center"}>
      <div
        className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
        role="status"
      >
        <span className="visually-hidden"></span>
      </div>
    </div>
  ) : (
    <img className={imageClasses} src={imageUrl} alt="Movie Thumbnail" />
  );
};

export default MovieImage;
