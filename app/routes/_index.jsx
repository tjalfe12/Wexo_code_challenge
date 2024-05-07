import { useState } from "react";
import GenreSampler from "../components/GenreSampler";

export const meta = () => {
  return [
    { title: "FlickerHub" },
    { name: "description", content: "Best movie hub around!" },
  ];
};

export default function Index() {
  const [genre, setGenre] = useState("movie");

  const buttonStyleInactive =
    "text-xl sm:text-2xl md:text-3xl font-thin font-dosis border-gray-200  rounded-full w-full py-0 sm:px-6 bg-white drop-shadow-md shadow-inner hover:shadow-lg hover: hover:border-rose-300 hover:brightness-105 hover:bg-gradient-to-r hover:from-rose-300 hover:to-white transition-all duration-300 ease-in-out tracking-widest";
  const buttonStyleActive =
    "text-xl sm:text-2xl md:text-3xl px-8 pb-1 w-full text-white font-dosis font-thin rounded-full bg-gradient-to-b from-rose-400 to-rose-500 shadow-md drop-shadow-md tracking-widest";

  return (
    <div className="w-full lg:w-3/4 m-auto pt-12 pb-20">
      <img
        src="/FlickerHubLogo.png"
        alt="Remix Logo"
        className="h-14 w-14 m-auto sm:h-24 sm:w-24"
      />
      <h1 className="text-center text-3xl mt-4">FlickerHub</h1>
      <p className="text-center text-xl mt-2 mb-16">
        Welcome to the best place to find your favorite movies and series!
      </p>

      <div className="flex flex-col justify-start items-center m-auto mt-6 p-5">
        <div className="flex flex-row justify-center mb-4 gap-4 w-full mb-6">
          <button
            className={
              genre == "movie" ? buttonStyleActive : buttonStyleInactive
            }
            onClick={() => setGenre("movie")}
          >
            Movies
          </button>
          <button
            className={
              genre == "series" ? buttonStyleActive : buttonStyleInactive
            }
            onClick={() => setGenre("series")}
          >
            Series
          </button>
        </div>
        <p className="mb-6 text-lg text-center">
          {genre == "movie"
            ? "Here are some of the latest movies available on FlickerHub:"
            : "Here are some of the latest series available on FlickerHub:"}
        </p>
        <section className="w-3/4 grid grid-flow-row grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 w-full">
          <GenreSampler genre={"action"} type={genre} />
          <GenreSampler genre={"comedy"} type={genre} />
          <GenreSampler genre={"thriller"} type={genre} />
          <GenreSampler genre={"war"} type={genre} />
          <GenreSampler genre={"romance"} type={genre} />
          <GenreSampler genre={"drama"} type={genre} />
          <GenreSampler genre={"crime"} type={genre} />
          <GenreSampler genre={"documentary"} type={genre} />
          <GenreSampler genre={"horror"} type={genre} />
        </section>
      </div>
    </div>
  );
}
