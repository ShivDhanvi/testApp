import AxiosSession from "./pages/AxiosSession";
import DummyComp from "./pages/DummyComp";
import FinalProject from "./pages/finalProject/FinalProject";
import GeminiApp from "./gemini/GeminiApp";
import StoryBook from "./pages/StoryBook";
// 1. npm install react-router-dom
// 2. import necessary components
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StateContext } from "./store/StateProvider";
import { useContext } from "react";

export default function App() {
  // fetching theme and toggleTheme function from context
  const { theme, toggleTheme } = useContext(StateContext);

  // JS object for dynamic styling
  const containerStyle = {
    backgroundColor: theme === "light" ? "#f0f0f0" : "#333333",
    color: "#333333",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    transition: "background-color 0.3s ease, color 0.3s ease",
    width: "100%",
  };

  return (
    <div style={containerStyle}>
      {/* dark or light theme color from state provider */}
      <button
        className="d-flex justify-end w-auto h-auto rounded-2xl bg-amber-400 text-2xl p-2 m-2"
        onClick={toggleTheme}
      >
        {theme} mode
      </button>

      {/* react router dom => routing concept */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AxiosSession />} />
          <Route path="/storyBook" element={<StoryBook />} />
          {/* how can I restrict this id type? */}
          <Route path="/dummyComp/:id" element={<DummyComp />} />
          <Route path="/finalProject" element={<FinalProject />} />
          {/* AI explorer */}
          <Route path="/gemini" element={<GeminiApp />} />
          {/* handling unknown pages */}
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
