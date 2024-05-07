/* eslint-disable react/prop-types */
import React from "react";

const MovieContext = React.createContext();

export const MovieProvider = ({ children, wishlistData, isLoggedIn }) => {
  const contextValue = {
    wishlistData: wishlistData,
    isLoggedIn: isLoggedIn,
  };

  return (
    <MovieContext.Provider value={contextValue}>
      {children}
    </MovieContext.Provider>
  );
};

export default MovieContext;
