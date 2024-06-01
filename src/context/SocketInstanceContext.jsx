import { createContext, useContext, useEffect } from "react";
import socketInstance from "@/scripts/socketIO/socket";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  useEffect(() => {
   

    // Return a cleanup function that disconnects the socket when the component unmounts
    return () => {

      //TODO: Is this clean up necessary?
      // socketInstance.disconnect();
   
    };
  }, []);

  return (
    <SocketContext.Provider value={socketInstance}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};
