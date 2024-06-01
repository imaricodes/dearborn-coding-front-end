import { useEffect, useState } from "react";
import { useRecorder } from "@/hooks/useRecorder";
import { useSelectCue } from "@/hooks/useSelectCue";
import { RefreshCcw, CircleHelp } from "lucide-react";
import Microphone from "@/components/Microphone";
import InstructionSlides from "@/components/InstructionSlides";
const ControlsBar = () => {
  const [showInstructions, setShowInstructions] = useState(false);
  const { isRecording } = useRecorder();
  const { cueSelector, cue } = useSelectCue();

  const closeInstructions = () => {
    setShowInstructions(false);
  };
  useEffect(() => {
    cueSelector();
  }, []);

  useEffect(() => {
    console.log("is recording in ControlsBar", isRecording);
  }, [isRecording]);

  return (
    <div className="w-full flex gap-8  py-8 px-4">
      <div className="grid grid-cols-3 w-full">
        <div className="flex items-center justify-start pl-4">
          <CircleHelp
            size={36}
            className="cursor-pointer"
            onClick={() => setShowInstructions(true)}
          />
        </div>
        <div className="flex justify-center items-center w-full">
          <Microphone
            cue={cue}
          />
        </div>
        <div className="flex items-center justify-end pr-4">
          <button onClick={!isRecording ? () => cueSelector() : null}>
            <RefreshCcw color="orange" size={24} />
          </button>
        </div>
      </div>

      {showInstructions && (
        <div className="h-screen fixed top-0 left-0 bg-blue-400 z-50 w-screen">
          screen
          <InstructionSlides className="" onClose={closeInstructions} />
        </div>
      )}
    </div>
  );
};

export default ControlsBar;
