import { redirect } from "@remix-run/node";

export const loader = () => {
  // Redirect to the root route
  return redirect("/");
};

export default function MovieIndex() {
  return <div>movie._index</div>;
}
