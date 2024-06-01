import Stage from "@/components/Stage";
import { Button } from "@/components/ui/button";
import { useApplicationContext } from "@/context/ApplicationContext";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";

const Activity = () => {
  const navigate = useNavigate();
  const { handleCloseGame, sessionIsActive } = useApplicationContext();

  // console.log('handle close in activity', handleCloseGame)

  const handleClose = () => {
    console.log("Closing game...");
    handleCloseGame();
    navigate("/");
  };

  return (
    <div className={`fixed inset-0 z-20 "overflow-hidden bg-black`}>
      <Button className="absolute top-10 right-0" onClick={() => handleClose()}>
        {/* <Button className="absolute top-10 right-0"> */}
        Close
      </Button>

      <div className={`h-screen ${sessionIsActive ? "overflow-hidden" : ""}`}>
        <div className="h-full w-full flex items-center justify-center">
          <Stage />
        </div>
      </div>
    </div>
  );
};

export default Activity;
