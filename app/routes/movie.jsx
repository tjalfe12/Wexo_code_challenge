import { Outlet } from "@remix-run/react";

// This is a parent route for all single movie routes and serves just as a wrapper
export default function Single_Movie() {
  return (
    <div className="text-center">
      <Outlet />
    </div>
  );
}
