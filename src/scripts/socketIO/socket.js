import io from "socket.io-client";
import socketEvents from "@/scripts/socketIO/socketEventHandler"
class SocketSingleton {
 
  constructor() {
    if (!SocketSingleton.instance) {
      // Initialize the Socket.IO client with autoConnect: false
      this.socket = io(import.meta.env.VITE_REACT_APP_SOCKET_URL, {
        autoConnect: false,
      });
      SocketSingleton.instance = this;

    }
    return SocketSingleton.instance;
  }

  // Method to initialize socket events and potentially connect
  //in this case, setValue is "sessionResultSetter" from context api
  init(setValues) {
    // Setup the socket events
    socketEvents({ setValues, socket: this.socket });

    // Connect if not already connected
    if (!this.socket.connected) {
      this.socket.connect();
    }
  }

  // Method to listen for events from the server
  //removed this method because listeners are set in socketEventHandler.jsx
  // on(event, callback) {
  //   this.socket.on(event, callback);
  // }

  // Method to emit an event to the server
  emit(event, data) {
    if (this.socket) {
      this.socket.emit(event, data);
    }
  }

  // Method to disconnect the socket
  disconnect() {
    if (this.socket.connected) {
      this.socket.disconnect();
    }
  }
}

// Ensuring the singleton instance is created and exported
const socketInstance = new SocketSingleton();

// Prevent modification of the object to ensure true singleton pattern
Object.freeze(socketInstance);

// Export the frozen instance
export default socketInstance;
