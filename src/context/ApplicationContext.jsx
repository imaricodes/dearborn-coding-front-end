// DialogContext.js

/*
The purpose of this context and provider is to track whether the stage dialog (modal) is open.
The 'Stage' is where a 'game' takes place after user clicks the game button
When the app loads, this checks if the last state of the stage modal is open or closed
*/
import { createContext, useContext, useState, useCallback } from "react";
import { useLocalStorage } from "@/hooks/useStorage";
import MediaRecorderManager from "@/lib/MediaRecorderManager";


const ApplicationContext = createContext();

export default function ApplicationContextProvider({ children }) {
  //here check local storage, if none, do nothing


  /* LOCAL STORAGE */


  const getInitialSessionIsActiveLocalStorage = (key) => {
    let currentItem = window.localStorage.getItem(key);
    if (!currentItem) {
      return;
    } else {
      return "false";
    }
  };


//check if local storage has a value, if not, set it to default value
  const [
    sessionIsActiveLocalStorage,
    setSessionIsActiveLocalStorage,
    removeSessionIsActiveLocalStorage,
  ] = useLocalStorage(
    "session_is_active",
    getInitialSessionIsActiveLocalStorage("session_is_active")
  );

  const [
    sessionStateLocalStorage,
    setSessionStateLocalStorage,
    removeSessionStateLocalStorage,
  ] = useLocalStorage("session_state", "inactive");

  const [
    sessionResultLocalStorage,
    setSessionResultLocalStorage,
    removeSessionResultLocalStorage,
  ] = useLocalStorage("session_result", null);

  const [cueObjectLocalStorage, setCueObjectLocalStorage, removeCueObjectLocalStorage] = useLocalStorage("cue_object", null);



  /* STATES */

  //On load, if value exists in local storage, set it to the state
  const [sessionState, setSessionState] = useState(() => {
    let currentItem = window.localStorage.getItem("session_state");
    if (currentItem) {
      let state = JSON.parse(currentItem);

      switch (state) {
        case "intro":
          return "intro";
        case "cue":
          return "cue";
        case "result":
          return "result";

        default:
          return "inactive";
      }
    } else {
      return "inactive";
    }
  });

  const [sessionResult, setSessionResult] = useState(() => {
    let currentItem = window.localStorage.getItem("session_result");
    let currentItemParsed = JSON.parse(currentItem);
    if (currentItem) {
      return currentItemParsed;
    } else {
      return null;
    }
  });

  const [sessionIsActive, setSessionIsActive] = useState(
    localStorage.getItem("sessionIsActive") === "true"
  );

const [isListening, setIsListening] = useState(false);


  const [cueObject, setCueObject] = useState( () => {
    let currentItem = window.localStorage.getItem("cue_object");
    let currentItemParsed = JSON.parse(currentItem);
    if (currentItem) {
      return currentItemParsed;
    } else {
      return null;
    }
  }
  );



  /* STATE SETTERS */

  //Wrapper functions that sets context state and updates local storage

  const sessionStateSetter = useCallback((data) => {
    setSessionStateLocalStorage(data);
    setSessionState(data);
  }, []);

  const sessionResultSetter = useCallback((data) => {
    setSessionResultLocalStorage(data);
    setSessionResult(data);
  }, []);

  const cueObjectSetter = useCallback((data) => {
    setCueObjectLocalStorage(data);
    setCueObject(data);
  }, []);




  /* UTILITY FUNCTIONS */
  const handleCloseGame = useCallback(() => {
    console.log('handle close game in context')
    MediaRecorderManager.destroyInstance();
    setSessionIsActiveLocalStorage("false");
    setSessionIsActive(false);

    setSessionStateLocalStorage("inactive");
    setSessionState("inactive");

    setSessionResultLocalStorage(null);
    setSessionResult(null);

    setCueObjectLocalStorage(null);
    setCueObject(null);
  }, []);

  const handleStartGame = useCallback(() => {
    setSessionStateLocalStorage("cue");
    setSessionState("cue");
    setSessionIsActiveLocalStorage("true");
    setSessionIsActive(true);
  }, []);

  return (
    <ApplicationContext.Provider
      value={{
        setSessionIsActive: setSessionIsActive,
        sessionIsActive: sessionIsActive,
        sessionStateSetter: sessionStateSetter,
        sessionState: sessionState,
        sessionResultSetter: sessionResultSetter,
        sessionResult: sessionResult,
        handleCloseGame: handleCloseGame,
        handleStartGame: handleStartGame,
        cueObject: cueObject,
        cueObjectSetter: cueObjectSetter,
        isListening: isListening,
        setIsListening: setIsListening
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
}

export function useApplicationContext() {
  const context = useContext(ApplicationContext);

  if (!context) {
    throw new Error("UseDialog must be used within a DialogProvider");
  }
  return context;
}
