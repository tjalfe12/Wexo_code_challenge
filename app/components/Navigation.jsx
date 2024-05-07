/* eslint-disable react/prop-types */
// app/components/Navigation.js
import NavButton from "./NavButton";
import { useContext } from "react";
import MovieContext from "../movieContext.jsx";

export default function Navigation({ children }) {
  const { isLoggedIn } = useContext(MovieContext);

  return (
    <nav className="">
      <ul className="flex flex-row flex-wrap justify-center gap-2 sm:gap-4">
        <li>
          <NavButton to="/">Home</NavButton>
        </li>
        <li>
          <NavButton to="/genres">Genres</NavButton>
        </li>
        <li>
          <NavButton to="/wishlist">Wishlist</NavButton>
        </li>
        {!isLoggedIn ? (
          <li>
            <NavButton to="/register">Sign up</NavButton>
          </li>
        ) : null}
      </ul>
      {children}
    </nav>
  );
}
