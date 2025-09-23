import { useState } from "react";

// API endpoint for this storyBook: https://mp7ea7a9469fa39edb86.free.beeceptor.com/data

export default function StoryBook() {
  // --- 1. Story Data ---
  // This JSON object represents the entire story. Each key is a scene ID.
  // "text" is the narrative for that scene.
  // "choices" is an array of objects, where each object has "text" for the choice
  // and a "nextScene" property which is the ID of the next scene.
  const storyData = {
    start: {
      text: "Neenga thidirnu oru forest la irukeenga, appo east la irundhu oru light velicham varudhu, west la irundhu oru thanni odura satham kekkudhu. Neenga endha path choose pannuveenga?",
      choices: [
        { text: "Follow the light.", nextScene: "path_east" },
        { text: "Head towards the water.", nextScene: "path_west" },
      ],
    },
    path_east: {
      text: "Andha light oru china cabin la irundhu varudhu, adhu oru old abandoned cabin pola irukku. Neenga enna pannuveenga?",
      choices: [
        { text: "Enter the cabin.", nextScene: "cabin_inside" },
        { text: "Continue past the cabin.", nextScene: "continue_forest" },
      ],
    },
    path_west: {
      text: "Andha water sound oru river la irundhu varudhu, river romba wide ah irukku andha river cross panna oru bridge illa, but oru boat irukku. Neenga enna pannuveenga?",
      choices: [
        { text: "Take the boat across the river.", nextScene: "boat_trip" },
        { text: "Follow the riverbank downstream.", nextScene: "riverbank" },
      ],
    },
    cabin_inside: {
      text: "Andha cabin kulla enter aagureenga, anga oru old map table la kidaikudhu. Adhula dhaan gold irukka edam potruku, so jeichita maaraah!",
      choices: [{ text: "Play Again?", nextScene: "start" }],
    },
    continue_forest: {
      text: "Neenga forest la deep ah ulla poi tholanjiteenga! Neenga thirumbi varala. Maatikiteenga pangu, Game over!",
      choices: [{ text: "Try again?", nextScene: "start" }],
    },
    boat_trip: {
      text: "Andha boat la oru hole irukku, adhula water fill aagudhu, neenga drown aayitenga. So, Game over!",
      choices: [{ text: "Start over?", nextScene: "start" }],
    },
    riverbank: {
      text: "Neenga riverbank ah follow pannitu oru village ku reach aagiteenga, anga romba santhosham ah ellarum ungala welcome pandranga, neenga safe ah irukeenga! Congrats!",
      choices: [{ text: "Go on another adventure?", nextScene: "start" }],
    },
  };

  // --- 2. State Management ---
  // We use the useState hook to track the current scene ID.
  // The initial state is 'start', which is the first scene.
  const [currentScene, setCurrentScene] = useState("start");

  // --- 3. Component Rendering Logic ---
  // This function handles a user's choice. It takes the ID of the next scene
  // as an argument and updates the component's state.
  const handleChoiceClick = (nextScene) => {
    setCurrentScene(nextScene);
  };

  // Get the current scene data from the storyData object.
  const scene = storyData[currentScene];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <div className="w-full max-w-2xl bg-gray-800 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-200">
          Oraey Kaadu! Oraey Vali!
        </h1>

        {/* The main story text */}
        <div className="bg-gray-700 p-6 rounded-md mb-6 shadow-inner">
          <p className="text-lg font-mono leading-relaxed text-gray-300">
            {scene.text}
          </p>
        </div>

        {/* The choices for the current scene */}
        <div className="flex flex-col space-y-4">
          {scene.choices.map((choice, index) => (
            <button
              key={index}
              onClick={() => handleChoiceClick(choice.nextScene)}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105 shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
            >
              {choice.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
