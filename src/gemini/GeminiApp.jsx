import { useState } from "react";

// --- Main App Component ---
export default function GeminiApp() {
  // State variables for managing the UI and data.
  const [spokenText, setSpokenText] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState("");
  const [language, setLanguage] = useState("en-US"); // New state for language

  // Check for browser support for the Web Speech API.
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const browserSupportsSpeechRecognition = !!SpeechRecognition;

  let recognition = null;
  if (browserSupportsSpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.continuous = false; // Stop after a single utterance.
    recognition.lang = language; // Use the language state
  }

  // --- Speech Recognition Logic ---
  const handleRecordClick = () => {
    if (!browserSupportsSpeechRecognition) {
      setError(
        "Your browser does not support the Web Speech API. Try using Google Chrome."
      );
      return;
    }
    setError("");

    if (!isRecording) {
      setIsRecording(true);
      setSpokenText("");
      setAiResponse("");

      // Event handler for when speech is recognized.
      recognition.onresult = async (event) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0].transcript)
          .join("");
        setSpokenText(transcript);
        setIsRecording(false);
        setIsLoading(true);

        // Once the text is captured, send it to the Gemini API.
        try {
          const geminiResponse = await fetchGeminiResponse(transcript);
          setAiResponse(geminiResponse);
        } catch (err) {
          console.error("Failed to get AI response:", err);
          setAiResponse("Sorry, I couldn't get a response from the AI.");
        } finally {
          setIsLoading(false);
        }
      };

      // Event handler for when the recognition ends.
      recognition.onend = () => {
        setIsRecording(false);
      };

      // Start the speech recognition.
      recognition.start();
    } else {
      // If already recording, stop it.
      recognition.stop();
      setIsRecording(false);
    }
  };

  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === "en-US" ? "ta-IN" : "en-US"));
  };

  // --- Gemini API Call Logic ---
  const fetchGeminiResponse = async (query) => {
    if (!query) return "Please speak something for the AI to respond.";

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY || ""; // For Vite. For CRA use process.env.REACT_APP_GEMINI_API_KEY
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

    const payload = {
      contents: [
        {
          parts: [
            {
              text: query,
            },
          ],
        },
      ],
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      const text = result?.candidates?.[0]?.content?.parts?.[0]?.text;

      return text || "No response received from the AI.";
    } catch (error) {
      console.error("API call failed:", error);
      return "Something went wrong with the API call. Check the console for details.";
    }
  };

  // --- Render the UI ---
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 font-sans">
      <script src="https://cdn.tailwindcss.com"></script>
      <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-xl flex flex-col items-center space-y-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Gemini Voice Assistant
        </h1>
        <p className="text-gray-600 text-center">
          Click the button and speak your query. The app will send it to the
          Gemini AI and display the response below.
        </p>

        {/* Language Toggle Button */}
        <button
          onClick={toggleLanguage}
          className="px-4 py-2 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
        >
          {language === "en-US" ? "Switch to Tamil" : "Switch to English"}
        </button>

        {/* Record Button */}
        <button
          onClick={handleRecordClick}
          className={`
            flex items-center justify-center w-24 h-24 rounded-full
            ${
              isRecording
                ? "bg-red-500 hover:bg-red-600"
                : "bg-blue-500 hover:bg-blue-600"
            }
            text-white shadow-lg transition-all transform hover:scale-105
            focus:outline-none focus:ring-4 focus:ring-opacity-50
            ${isRecording ? "focus:ring-red-500" : "focus:ring-blue-500"}
          `}
        >
          {isRecording ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-10 h-10 animate-pulse"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.25 9.75v-4.5m0 4.5h2.25m-2.25 0l2.25 2.25m-4.5-4.5H9.75M9.75 9.75v-2.25m-2.25 2.25H4.5m4.5-2.25L6.75 4.5m2.25 2.25V4.5m0 0H6.75m2.25-2.25a6.75 6.75 0 0113.5 0v3.75m0 0v-2.25m-4.5-4.5h2.25m-2.25 0v-2.25m0 0h2.25m-4.5 4.5m-2.25-2.25a6.75 6.75 0 01-13.5 0v3.75m0 0v-2.25m4.5-4.5h-2.25m2.25 0v-2.25m0 0h-2.25m4.5 4.5"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-10 h-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75-3.75h7.5"
              />
            </svg>
          )}
        </button>

        {/* Status Messages */}
        {error && (
          <p className="text-red-500 text-sm font-semibold text-center">
            {error}
          </p>
        )}

        {isLoading && (
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-2 border-t-2 border-gray-900 border-solid rounded-full animate-spin"></div>
            <p className="text-gray-500">Thinking...</p>
          </div>
        )}

        {/* Spoken Text Display */}
        <div className="w-full p-4 border border-gray-300 rounded-lg bg-gray-50">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">
            Your Query ({language}):
          </h2>
          <p className="text-gray-800 italic">{spokenText}</p>
        </div>

        {/* AI Response Display */}
        <div className="w-full p-4 border border-gray-300 rounded-lg bg-white">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">
            AI Response:
          </h2>
          <p className="text-gray-800">{aiResponse}</p>
        </div>
      </div>
    </div>
  );
}
