/* eslint-disable react/prop-types */
export default function NavButton({ to, children }) {
  return (
    <a
      href={to}
      className="text-sm sm:text-lg font-dosis border-gray-200 border-2 rounded-full py-0 px-2 sm:px-6 bg-white drop-shadow-md shadow-inner hover:shadow-lg hover: hover:border-rose-300 hover:brightness-105 hover:bg-gradient-to-r hover:from-rose-300 hover:to-white transition-all duration-300 ease-in-out"
    >
      {children}
    </a>
  );
}
