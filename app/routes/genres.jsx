import { Link, Outlet } from "@remix-run/react";

export default function Genres() {
  const linkStyle =
    "text-sm sm:text-md text-rose-600 border-2 border-rose-600 rounded-md px-2 pt-1 hover:bg-rose-600 hover:text-white transition-all duration-300 ease-in-out";

  return (
    <div>
      <h1 className="text-center text-2xl">GENRES</h1>
      <p className="text-center text-md sm:text-lg mt-2 sm:mt-4 px-4">
        Here are some of the genres available on FlickerHub:
      </p>
      <section className="flex flex-row flex-wrap justify-center items-center gap-y-3 gap-x-6 mt-6 mb-10 px-2">
        <Link className={linkStyle} to="/genres/action">
          Action
        </Link>
        <Link className={linkStyle} to="/genres/comedy">
          Comedy
        </Link>
        <Link className={linkStyle} to="/genres/thriller">
          Thriller
        </Link>
        <Link className={linkStyle} to="/genres/war">
          War
        </Link>
        <Link className={linkStyle} to="/genres/romance">
          Romance
        </Link>
        <Link className={linkStyle} to="/genres/drama">
          Drama
        </Link>
        <Link className={linkStyle} to="/genres/crime">
          Crime
        </Link>
        <Link className={linkStyle} to="/genres/documentary">
          Documentary
        </Link>
        <Link className={linkStyle} to="/genres/horror">
          Horror
        </Link>
      </section>
      <Outlet />
    </div>
  );
}
