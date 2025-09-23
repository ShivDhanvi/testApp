import React, { createContext, useState } from "react";

// --- 1. Create the Context ---
// We create a new Context object. This is like creating a "channel" or "radio station"
// that components can tune into to get a specific value.
const StateContext = createContext();

// --- 2. Create the Provider Component ---
// This component holds the state (the theme) and provides it to all of its children.
// The value prop is an object containing the current theme and the function to toggle it.
const StateProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const contextValue = { theme, toggleTheme };

  return (
    <StateContext.Provider value={contextValue}>
      {children}
    </StateContext.Provider>
  );
};

// --- 3. Export the Context and Provider ---
export { StateContext, StateProvider };
