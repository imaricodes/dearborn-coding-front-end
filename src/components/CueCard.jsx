import { useEffect, useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import ControlsBar from "@/components/ControlsBar";
import { useApplicationContext } from "@/context/ApplicationContext";
import AudioVisualizer from "@/components/P5Visualizer";


const CueCard = () => {
  //make cue this a stage state?
  const { cueObject } = useApplicationContext();
  const [cue, setCue] = useState(cueObject?.cue);

  useEffect(() => {
    setCue(cueObject?.cue);
  }, [cueObject]);

  return (
    <div>
      <Card className="w-full h-[400px] flex items-center justify-center relative">
        <CardContent>
          <div className="w-full absolute inset-x-0 top-0 h-14 ">
            <ControlsBar />
          </div>
          <div className=" mt-16 flex justify-center flex-col items-center w-fit">
            <p className="mb-5 text-2xl">{cue}</p>
          </div>
            <div className="w-full absolute inset-x-0 bottom-0 h-20 overflow-y-visible overflow-x-clip">
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                <AudioVisualizer barColor={'#00FF00'} />
              </div>
            </div>

        </CardContent>
      </Card>
    </div>
  );
};

export default CueCard;
