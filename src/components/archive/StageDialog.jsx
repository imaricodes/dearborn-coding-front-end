//This is a wapper for the Stage Component. It behaves like a modal and pops up over everything. It contains the current chosen 'game'.

import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { useStageContext } from "@/context/StageContext";

import { useApplicationContext } from "@/context/ApplicationContext";
import { useNavigate } from "react-router-dom";

import { useLocalStorage } from "@/hooks/useStorage";

export default function StageDialog({ children }) {
  const navigate = useNavigate();
  const {
    hideStageDialog,
    sessionIsActive,
    triggerRender,
    setResumedSession,
    resumedSessionSetter,
  } = useApplicationContext();
  const { sessionResultSetter, sessionStateSetter } = useStageContext();
  const [, setResumedSessionLocalStorage, removeResumedSessionLocalStorage] =
    useLocalStorage("resumed_session");

  const handleClose = () => {
    console.log("handle close");
    // setResumedSessionLocalStorage("false");
    resumedSessionSetter(false);
    setResumedSession(false);
    sessionResultSetter(null);
    sessionStateSetter("inactive");
    hideStageDialog();
    navigate("/");
  };

  return (
    <div>
      {sessionIsActive ? (
        <Dialog
          open={sessionIsActive}
          onClose={hideStageDialog}
          className=" h-screen w-screen"
        >
          <DialogContent className="h-full w-full max-w-screen-xl">
            <div className="relative mt-10 h-full w-full">
              <div className="absolute top-0"></div>
              {children({handleClose})}
            </div>

            <DialogClose
              onClick={() => handleClose()}
              className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
            >
              closed
            </DialogClose>
          </DialogContent>
        </Dialog>
      ) : null}
    </div>
  );
}
