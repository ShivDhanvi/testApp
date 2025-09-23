import { useState } from "react";

export default function FavMusic() {
  const [currentSong, setCurrentSong] = useState(null);
  let [audio, setAudio] = useState(null);

  const playSong = (index) => {
    // If a song is currently playing, pause it.
    if (audio) {
      audio.pause();
    }

    // If the same song is clicked again, we just want to stop it.
    if (currentSong === index) {
      audio.pause();
      setCurrentSong(null);
      return;
    }

    // Create a new audio object and play it.
    audio = new Audio("/music/nenje-nenje-song.mp3");
    setAudio(audio);
    audio.play().catch((error) => {
      console.error("Error playing audio:", error);
    });
    setCurrentSong(index);

    // Reset current song state when the song ends.
    audio.onended = () => {
      setCurrentSong(null);
    };
  };

  return (
    <div className="space-y-4">
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className="flex items-center justify-between bg-[#3c3c41] p-4 rounded-xl transition-colors duration-200 hover:bg-[#4a4a4f]"
        >
          <div className="flex items-center">
            <span className="mr-3 text-lg font-bold text-[#28a79a]">
              {index + 1}.
            </span>
            <span className="text-gray-200 font-medium">
              {index === 0
                ? "Nenje Nenje - Ayyan Song"
                : `Music Track ${index + 1}`}
            </span>
          </div>
          <button
            className="bg-[#28a79a] text-white p-2 rounded-full shadow-lg transform transition-transform duration-300 hover:scale-110"
            onClick={() => playSong(index)}
          >
            {currentSong === index ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v4a1 1 0 11-2 0V8z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
        </div>
      ))}
    </div>
  );
}
