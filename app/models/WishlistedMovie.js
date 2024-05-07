// app/models/WishlistedMovie.js
import mongoose from "mongoose";

const wishlistedMovieSchema = new mongoose.Schema({
  movieId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

const WishlistedMovie =
  mongoose.models.WishlistedMovie ||
  mongoose.model("WishlistedMovie", wishlistedMovieSchema);

export default WishlistedMovie;
