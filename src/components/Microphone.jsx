import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { MousePointerClick } from "lucide-react";
import { MicrophoneIcon } from "@heroicons/react/24/solid";
import { useRecorder } from "@/hooks/useRecorder";

const Microphone = ({ cue }) => {
  const [showPointer, setShowPointer] = useState(false);
  const { isRecording, startListening } = useRecorder();

  const handleMicClick = () => {
    startListening();
  };

  useEffect(() => {
    //TODO: When cue dependency updates, restart timer
    setShowPointer(false);
    const timerId = setTimeout(() => {
      console.log("timer done");
      setShowPointer(true);
    }, 4000);

    return () => {
      console.log("timer cleanup");
      clearTimeout(timerId);
    };
  }, [cue]);

  return (
    <div
      className={cn("flex justify-center items-center relative", {
        "bg-blue-500": isRecording,
        "bg-white": !isRecording,
      })}
    >
      {/* <button className="z-50" onClick={onIsListenting}> */}
      <button className="z-50" onClick={handleMicClick} disabled={isRecording}>
        <MicrophoneIcon className="h-6 w-6 text-white" />
        {/* <Mic/> */}
      </button>

      <div
        className={cn("rounded-full h-20 w-20 bg-red-900 ", {
          "absolute animate-radiate-fade": isRecording,
          hidden: !isRecording,
        })}
      />
      <div
        className={cn("rounded-full h-9 w-9 bg-red-500 animate-radiate-fade", {
          "absolute animate-radiate-fade": isRecording,
          hidden: !isRecording,
        })}
      />
      <div
        className={cn("rounded-full h-9 w-9 bg-red-600 absolute z-10", {
          "bg-red-600": isRecording,
          "bg-slate-600": !isRecording,
        })}
      />

      {!isRecording && (
        <div
          className={cn({
            "absolute top-2 left-7 animate-bounce-x z-50": showPointer,
            hidden: !showPointer,
          })}
        >
          <MousePointerClick size={40} strokeWidth={1} />
        </div>
      )}
    </div>
  );
};

export default Microphone;
