export default function socketEvents({ setValues, socket }) {

  //handle disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
  socket.on("connect", () => {
    // alert("Connected to server");
    console.log('connected to server')
  });

  //handle incoming messages from client
  socket.on("message", (data) => {
    switch (data.message) {
      case "session_results":
        setValues.sessionResultSetter(data.payload);
        setValues.sessionStateSetter("result");
        break;
      default:
        console.log("No case matched");
    }
  });
}
