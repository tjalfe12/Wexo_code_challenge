// app/components/LoginForm.js
import { Form, Link, useNavigate } from "@remix-run/react";

export default function LoginForm({ isLoggedIn }) {
  const navigate = useNavigate();
  const inputStyle =
    "block text-xs m-1 w-20 lg:w-32 py-1 px-2 border rounded-md";
  const buttonStyle =
    "text-sm font-dosis border-gray-200 border-2 rounded-full h-6 py-0 px-4 sm:px-6 bg-white drop-shadow-md shadow-inner hover:shadow-lg hover: hover:border-rose-300 hover:brightness-105 hover:bg-gradient-to-r hover:from-rose-300 hover:to-white transition-all duration-300 ease-in-out";

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const response = await fetch("/", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      navigate(window.location.pathname, { replace: true });
    }
  };

  if (isLoggedIn) {
    return (
      <Form method="post" onSubmit={handleSubmit}>
        <input type="hidden" name="action" value="logout" />
        <button type="submit" className={buttonStyle}>
          Log Out
        </button>
      </Form>
    );
  }

  return (
    <>
      <Form method="post" onSubmit={handleSubmit}>
        <div className="hidden lg:flex justify-end flex-wrap items-center gap-x-2">
          <input type="hidden" name="action" value="login" />
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
          <button className={buttonStyle} type="submit">
            Login
          </button>
        </div>
        <Link className="block lg:hidden" to="/login">
          <button className={buttonStyle}>Login</button>
        </Link>
      </Form>
    </>
  );
}
