import { useState, useEffect, useRef } from "react";
import socketInstance from "@/scripts/socketIO/socket";
import MediaRecorderManager from "@/lib/MediaRecorderManager";
import { useApplicationContext } from "@/context/ApplicationContext";

export function useRecorder() {
  const {  cueObject, setIsListening } = useApplicationContext();
  const [isRecording, setIsRecording] = useState(false);
  const [token, setToken] = useState(null);
  const [displayTranscript, setDisplayTranscript] = useState("empty");
  const ws = useRef(null);
  let recorder = useRef(null);
  let transcript = useRef("");
  let transcriptFinal = useRef(false);

  const sendToServer = (payload) => {
    socketInstance.emit("message", { message: "transcript", payload: payload });
  };

  const updateTranscript = (text) => {
    setDisplayTranscript(text);
  };

  const fetchToken = async () => {
    const response = await fetch("/api/token");
    const data = await response.json();

    if(data) {
      // alert("Token fetched successfully")
    }
    setToken(data.token);
  };

  const checkForFinalTranscript = (text) => {
    if (transcript.current !== text) {
      transcript.current = text;
      return false;
    } else {
      ws.current.send(JSON.stringify({ terminate_session: true }));

      return true;
    }
  };

  const handleAssemblyAIResponse = (message) => {
    if (transcriptFinal.current === true) {
      return;
    }

    let text;
    const res = JSON.parse(message.data);

    if (res.message_type === "SessionBegins") {
      return;
    }

    if (res.message_type === "SessionTerminated") {
      console.log("session terminated");

      return;
    }

    if (res.text) {
      text = res.text;
    }

    //check for duplicate transcipt, this will indicate latest transcription
    if (text) {
      // checkForFinalTrascipt will return true if the current transcript is the "final" one
      let ready = checkForFinalTranscript(text);

      if (ready) {
        transcriptFinal.current = true;
        // setDisplayTranscript(text);
        updateTranscript(text);
        recorder.current.stop();
        let payload = {};

        //add current cueObject and result of transcription to payload
        payload = { ...cueObject, transcript: text };

        sendToServer(payload);
        // sessionStateSetter("result");
      }
    }
  };


// Fetch token
useEffect(() => {
  if (!token) {
    fetchToken();
  }
}, [token]);

  //fetch token from server// Setup WebSocket and handlers
useEffect(() => {
  if (token) {
    if (!ws.current) {
      ws.current = new WebSocket(`wss://api.assemblyai.com/v2/realtime/ws?sample_rate=16000&token=${token}`);
    }

    ws.current.onmessage = handleAssemblyAIResponse;

    ws.current.onerror = (event) => {
      console.error(event);
      ws.current.close();
    };

    ws.current.onclose = () => {
      console.log("WebSocket closed");
      ws.current = null;
    };

    ws.current.onopen = () => {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          recorder.current = MediaRecorderManager.getInstance(stream, ws.current);
        })
        .catch(err => console.error("Error accessing media devices:", err));
    };

    return () => {
      //TODO: This is causing error because web socket closing too soon
      // ws.current?.close();
    };
  }
}, [token]); // Ensure ws.current is cleaned up properly on component unmount or when token changes

  const startListening = () => {
    if (!recorder.current && ws.current) {
      //TODO: Initiate request for mic permission here, notify user if permission is not granted
      //maybe link to a page that explains how to enable mic permission
      console.log("recorder is not ready");
      return;
    } else {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          recorder.current = MediaRecorderManager.getInstance(
            stream,
            ws.current
          );
          recorder.current.start();
          setIsRecording(true);
          setIsListening(true);
        })
        .catch((err) => console.error(err));
    }
  };

  return { isRecording, startListening, displayTranscript };
}
