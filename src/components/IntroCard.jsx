import { useState } from "react";
import { CircleHelp, CirclePlay } from "lucide-react";

import { useApplicationContext } from "@/context/ApplicationContext";
import InstructionSlides from "@/components/InstructionSlides";
import ActivityContainerCard from "@/components/ui/custom/ActivityContainerCard";

const IntroCard = () => {
  const { sessionStateSetter } = useApplicationContext();
  const [showInstructions, setShowInstructions] = useState(false);
  const closeInstructions = () => {
    setShowInstructions(false);
  };

  const handleSetSessionState = () => {
    sessionStateSetter("cue");
  };
  return (
    <div>
      <ActivityContainerCard>
        <div className="flex flex-row gap-10 ">
          {showInstructions && (
            <InstructionSlides onClose={closeInstructions} />
          )}
          <div className="flex flex-col items-center justify-center">
            <CircleHelp
              className="cursor-pointer"
              onClick={() => setShowInstructions(true)}
            />

            <div>Instructions</div>
          </div>
          <div className=" flex flex-col items-center justify-center">
            <CirclePlay
              className="cursor-pointer"
              onClick={() => handleSetSessionState()}
            />

            <div>play</div>
          </div>
        </div>
      </ActivityContainerCard>
    </div>
  );
};

export default IntroCard;
