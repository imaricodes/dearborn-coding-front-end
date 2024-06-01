import { useEffect, useState } from "react";
import { useApplicationContext } from "@/context/ApplicationContext";
import MediaRecorderManager from "@/lib/MediaRecorderManager";
import HomeCard from "@/components/HomeCard";
import { useNavigate } from "react-router-dom";
import {
  isBrowser,
  isMobile,
  browserName,
  browserVersion,
} from "react-device-detect";
import { cn } from "@/lib/utils";

const Home = () => {
  console.log(
    `The user is browsing with ${browserName} version ${browserVersion}`
  );
  const { handleStartGame } = useApplicationContext();
  const [content, setContent] = useState(contentA);
  const [isUserDeviceBrowserSupported, setIsUserDeviceBrowserSupported] =
    useState(false);
  const navigate = useNavigate();

  const startGame = () => {
    ``;
    console.log("game start");
    handleStartGame();
    navigate("/activity");
  };

  const handleContent = (data) => {
    console.log(data);

    if ((browserName !== "Chrome" && browserName !== "Firefox") || isMobile) {
      setIsUserDeviceBrowserSupported(false);
      setContent(contentC);
      return;
    }

    if (content === contentA) {
      setContent(contentB);
    } else {
      startGame();
    }
  };

  useEffect(() => {
    // setContent(contentA);
    MediaRecorderManager.destroyInstance();
  }, []);

  return (
    <HomeCard>
      <div className="flex flex-col gap-10 items-center">
        <span className="text-3xl lg:text-5xl">{content}</span>

        <button
          onClick={() => handleContent("contentB")}
          className={cn(
            `font-semibold rounded-full lg:h-40 lg:w-40 bg-green-700 text-white flex justify-center items-center  lg:text-5xl shrink-0`,
            contentC ? `${content === contentC && "hidden"}` : undefined,
            "h-20 w-20 text-3xl"
          )}
        >
          {content === contentA || content === contentC ? "Start" : "Go"}
        </button>
      </div>
    </HomeCard>
  );
};

export default Home;

const contentA = (
  <div className="">
    <p className="font-semibold leading-tight">Start your Reading</p>
    <p className="font-semibold leading-tight">Journey Here With </p>
    <p className="font-semibold leading-tight"> Tishliddlebudu</p>
  </div>
);

const contentB = (
  <div className="">
    <p className="font-semibold leading-tight">Your job is to read</p>
    <p className="font-semibold leading-tight">a sentence out loud. </p>
  </div>
);
const contentC = (
  <div className="">
    <p className="text-2xl font-semibold leading-tight text-red-400">
      Pleae use Chrome or Firefox on a laptop or desktop computer for the best
      experience. Mobile devices are not supported.
    </p>
  </div>
);
