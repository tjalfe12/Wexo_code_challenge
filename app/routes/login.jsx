import { Form, Link, useNavigate } from "@remix-run/react";

export default function Login() {
  const inputStyle = "block text-md m-1  lg:w-40 py-1 px-2 border rounded-md";
  const buttonStyle =
    "text-sm font-dosis border-gray-200 border-2 rounded-full h-6 py-0 px-4 sm:px-6 bg-white drop-shadow-md shadow-inner hover:shadow-lg hover: hover:border-rose-300 hover:brightness-105 hover:bg-gradient-to-r hover:from-rose-300 hover:to-white transition-all duration-300 ease-in-out";

  return (
    <div>
      <h1 className="text-2xl text-center">Login</h1>
      <p className="text-center mb-6">
        Please log in to gain access to wishlisting.
      </p>
      <Form
        method="post"
        className="flex flex-col flex-wrap items-center gap-x-2"
        action="/"
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
    </div>
  );
}
