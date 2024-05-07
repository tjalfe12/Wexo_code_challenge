import User from "../models/User.js";
import { redirect } from "@remix-run/node";
import { getSession } from "../sessions.server";
import { useState } from "react";
import { json } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";

export const loader = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const userId = session.get("userId");

  // Check if the user is logged in and redirect to the root route if they are
  if (userId) {
    return redirect("/");
  }
  // If the user is not logged in, proceed with rendering the Register page
  return null;
};

export async function action({ request }) {
  const form = await request.formData();
  const username = form.get("username");
  const email = form.get("email");
  const password = form.get("password");

  // Check if a user with the same username already exists
  const existingUsername = await User.findOne({ username });

  // Check if a user with the same email already exists
  const existingEmail = await User.findOne({ email });

  if (existingUsername) {
    // Return an error response if username already exists
    return json(
      { error: "A user with this username already exists." },
      { status: 400 }
    );
  } else if (existingEmail) {
    // Return an error response if email already exists
    return json(
      { error: "A user with this email already exists." },
      { status: 400 }
    );
  }

  // Create a new user with the submitted username, email, and password
  const newUser = new User({
    username,
    email,
    password,
  });

  // Save the new user to the database
  await newUser.save();

  return redirect("/login");
}

// Error boundary component to display uncaught error messages
export function errorBoundary({ error }) {
  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-2xl text-red-600">{error.message}</h1>
    </div>
  );
}

export default function Register() {
  const data = useActionData();
  // Extract the error message from the action data
  const errorMsg = data?.error;

  const inputStyle = "block text-xs w-52 py-1 px-2 border rounded-md";
  const buttonStyle =
    "text-sm font-dosis border-gray-200 border-2 rounded-full h-6 py-0 px-4 sm:px-6 bg-white drop-shadow-md shadow-inner hover:shadow-lg hover: hover:border-rose-300 hover:brightness-105 hover:bg-gradient-to-r hover:from-rose-300 hover:to-white transition-all duration-300 ease-in-out";

  return (
    <div className="flex flex-col items-center gap-8 text-center pt-12 px-2">
      <h1 className="font-dosis tracking-widest text-2xl uppercase">Sign up</h1>
      <p>Sign up for free to gain access to a personal wishlist!</p>
      {errorMsg && <p className="error text-red-500">{errorMsg}</p>}

      <Form method="post" className="flex flex-col items-center gap-4">
        <label>
          Username:
          <input type="text" name="username" required className={inputStyle} />
        </label>
        <label>
          Email:
          <input type="email" name="email" required className={inputStyle} />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            required
            className={inputStyle}
          />
        </label>
        <button type="submit" className={buttonStyle}>
          Register
        </button>
      </Form>
    </div>
  );
}
