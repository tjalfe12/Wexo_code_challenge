import { Outlet } from "@remix-run/react";

export default function Single_Movie() {
  return (
    <div>
      Movie
      <Outlet />
    </div>
  );
}
