import { Form, Link, json, redirect, useActionData } from "@remix-run/react";
import { commitSession, getSession } from "../sessions.server.js";
import User from "../models/User.js";

export async function action({ request }) {
  const form = await request.formData();
  const actionType = form.get("action");

  if (actionType === "login") {
    const username = form.get("username");
    const password = form.get("password");

    // Find the user in the database based on the submitted username
    const user = await User.findOne({ username });

    // If the user exists and the password matches, create a session
    if (user && user.password === password) {
      const session = await getSession(request.headers.get("Cookie"));

      session.set("userId", user._id.toString());
      return redirect("/", {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      });
    } else {
      return json({ message: "Invalid credentials" }, { status: 401 });
    }
  }
  return null;
}

export default function Login() {
  const actionData = useActionData();
  const inputStyle = "block text-md m-1  lg:w-40 py-1 px-2 border rounded-md";
  const buttonStyle =
    "text-sm font-dosis border-gray-200 border-2 rounded-full h-6 py-0 px-4 sm:px-6 bg-white drop-shadow-md shadow-inner hover:shadow-lg hover: hover:border-rose-300 hover:brightness-105 hover:bg-gradient-to-r hover:from-rose-300 hover:to-white transition-all duration-300 ease-in-out";

  // Login form with username and password fields which sends request to action function for validation and login if successful
  return (
    <div className="px-2 pt-12">
      <h1 className="text-2xl text-center">Login</h1>
      <p className="text-center mb-6">
        Please log in to gain access to wishlisting.
      </p>
      {actionData?.message && (
        <p className="text-center text-red-500">{actionData.message}</p>
      )}

      <Form
        method="post"
        className="flex flex-col flex-wrap items-center gap-x-2"
        action="/login"
      >
        <input type="hidden" name="action" value="login" />
        <div className="mb-1">
          <div className="flex flex-row gap-0 justify-center items-center">
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              className={inputStyle}
              required
            />
          </div>
          <div>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              className={inputStyle}
              required
            />
          </div>
        </div>
        <button className={buttonStyle} type="submit">
          Login
        </button>
      </Form>
      <p className="text-center font-light text-sm mt-8">
        If you don't have an account yet,{" "}
        <Link to="/register" className="underline text-rose-500">
          sign up for free!
        </Link>
      </p>
    </div>
  );
}
