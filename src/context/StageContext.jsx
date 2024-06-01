/*
This provides state for the current game. That game is contained in the "Stage"
*/

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { useLocalStorage } from "@/hooks/useStorage";

const StageContext = createContext();

export default function StageProvider({ children }) {


  //set states and setters
const [nowRecording, setNowRecording] = useState(false);

  return (
    <StageContext.Provider
      value={
        {
          //expose states and setters here
          nowRecording: nowRecording, setNowRecording: setNowRecording
        }
      }
    >
      {children}
    </StageContext.Provider>
  );
}

export function useStageContext() {
  const context = useContext(StageContext);

  if (!context) {
    throw new Error("UseStageContext must be used withiin a StageProvider");
  }
  return context;
}
