import { useState, useEffect } from "react";
import Stage from "@/components/Stage";
import StageDialog from "@/components/archive/StageDialog";
import { useApplicationContext } from "@/context/ApplicationContext";
import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@/hooks/useStorage";

const Activity = () => {
  const [
    resumedSessionLocalStorage,
    setResumedSessionLocalStorage,
    removeSessionIsActiveLocalStorage,
  ] = useLocalStorage("resumed_session");
  const { sessionIsActive, resumedSession, resumedSessionSetter } =
    useApplicationContext();
  const [resumeSession, setResumeSession] = useState(false);
  const handleYes = () => {
    setResumeSession(true);
  };
  console.log("resumedSession: ", resumedSession);

  useEffect(() => {
    console.log("resumedSessionLocalStorage: ", resumedSessionLocalStorage);
    if (
      resumedSessionLocalStorage === undefined ||
      resumedSessionLocalStorage === "false"
    ) {
      setResumedSessionLocalStorage("true");
    }
  }, []);

  if (resumedSession === true && resumeSession === false) {
    return (
      <>
        <h1>Would you like to continue your session?</h1>
        <Button
          onClick={() => {
            handleYes();
          }}
        >
          Yes
        </Button>
        <Button>No</Button>
      </>
    );
  }

  if (sessionIsActive && resumeSession === false) {
    return (
      <>
        <StageDialog>
          <Stage />
        </StageDialog>
      </>
    );
  }

  if (sessionIsActive && resumeSession === true) {
    return (
      <>
        <StageDialog>
          <Stage />
        </StageDialog>
      </>
    );
  }

};

export default Activity;
