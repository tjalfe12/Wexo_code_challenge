import mongoose from "mongoose";

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://movie_connector:fhosutb35Hsk@wexo-code-challenge.rwoau54.mongodb.net/"
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));
