import { Link } from "@remix-run/react";
import Navigation from "./Navigation.jsx";

export default function Header({ children }) {
  return (
    <>
      <div className="flex flex-row justify-around lg:justify-between items-center gap-10 fixed w-full p-2 font-poppins z-10 bg-gradient-to-b from-rose-400 to-rose-500 shadow-md drop-shadow-md">
        <div className="h-12 w-12 sm:h-14 sm:w-14">
          <Link to="/">
            <img
              src="/FlickerHubLogo.png"
              alt="Remix Logo"
              className="h-12 w-12 sm:h-14 sm:w-14"
            />
          </Link>
        </div>
        <div className="hidden md:block">
          <Navigation />
        </div>
        {children}
      </div>
      <div className="md:hidden flex flex-row justify-around items-center gap-10 fixed w-full p-2 font-poppins z-10 bg-gradient-to-b from-rose-400 to-rose-500 shadow-md bottom-0">
        <Navigation />
      </div>
    </>
  );
}
