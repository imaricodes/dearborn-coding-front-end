//The stage will load cards conditionally depending on the stage of gameplay.
import { useEffect } from "react";

import CueCard from "@/components/CueCard";
import IntroCard from "@/components/IntroCard";
import ResultCard from "@/components/ResultCard";
import { useApplicationContext } from "@/context/ApplicationContext";
import socketInstance from "@/scripts/socketIO/socket";

const Stage = () => {
  const { sessionState, sessionResultSetter, sessionStateSetter } = useApplicationContext();

  // Application Context states are passed to the socket instance on initialization
  // This is so that the socket instance can update the application context states
  useEffect(() => {
    socketInstance.init({
      sessionResultSetter: sessionResultSetter,
      sessionStateSetter: sessionStateSetter,
    }
    );

  }, []);


  return (
    <div className="min-w-[800px] px-20">
      {getStageState(sessionState)}
    </div>
  );
};

const getStageState = (sessionState) => {
  switch (sessionState) {
    case "inactive":
    case "intro":
      return <IntroCard />;
    case "cue":
      return <CueCard />;
    case "result":
      return <ResultCard />;
    default:
      return null;
  }
};

export default Stage;
