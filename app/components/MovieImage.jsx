/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

const MovieImage = ({ movieId, imageClasses }) => {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchMovieImage = async () => {
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
    };

    fetchMovieImage();
  }, [movieId]);

  return <img className={imageClasses} src={imageUrl} alt="Movie Thumbnail" />;
};

export default MovieImage;
