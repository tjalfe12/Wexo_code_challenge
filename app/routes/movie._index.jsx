import { redirect } from "@remix-run/node";

//Sole purpose is to catch /movie requests and redirect to the root route
export const loader = () => {
  // Redirect to the root route
  return redirect("/");
};

export default function MovieIndex() {
  return <div>movie._index</div>;
}
