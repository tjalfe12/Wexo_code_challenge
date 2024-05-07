import User from "../models/User.js";

// Example route handler for user registration
export async function action({ request }) {
  const form = await request.formData();
  const username = form.get("username");
  const email = form.get("email");
  const password = form.get("password");

  const newUser = new User({
    username,
    email,
    password,
  });

  await newUser.save();

  // Rest of your route handler logic
  return new Response("User registered successfully");
}

export default function Register() {
  const inputStyle = "block text-xs w-52 py-1 px-2 border rounded-md";
  const buttonStyle =
    "text-sm font-dosis border-gray-200 border-2 rounded-full h-6 py-0 px-4 sm:px-6 bg-white drop-shadow-md shadow-inner hover:shadow-lg hover: hover:border-rose-300 hover:brightness-105 hover:bg-gradient-to-r hover:from-rose-300 hover:to-white transition-all duration-300 ease-in-out";

  return (
    <div className="flex flex-col items-center gap-8 text-center">
      <h1 className="text-xl uppercase">Sign up</h1>
      <p>Sign up for free to gain access to a personal wishlist!</p>
      <form
        action="/register"
        method="post"
        className="flex flex-col items-center gap-4"
      >
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
      </form>
    </div>
  );
}
