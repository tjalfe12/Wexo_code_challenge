import { Outlet } from "@remix-run/react";

export default function Single_Movie() {
  return (
    <div className="text-center">
      <Outlet />
    </div>
  );
}
