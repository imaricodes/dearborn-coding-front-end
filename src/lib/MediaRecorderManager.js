import RecordRTC from "recordrtc";

class MediaRecorderManager {
  static instance = null;

  static  () {
    if (MediaRecorderManager.instance) {
      MediaRecorderManager.destroyInstance();
      console.log("Instance of MediaRecorderManager destroyed");
    } else {
      console.log("No instance of MediaRecorderManager to destroy");
    }
  }

  static destroyInstance() {
    if (MediaRecorderManager.instance) {
      MediaRecorderManager.instance.destroyRecorder();
      MediaRecorderManager.instance = null;
    }
  }

  static getInstance(stream, socket) {
    if (!MediaRecorderManager.instance) {
      MediaRecorderManager.instance = new MediaRecorderManager(stream, socket);
      // Assuming init needs to be called to setup
      MediaRecorderManager.instance.init();
    }
    return MediaRecorderManager.instance;
  }

  constructor(stream, socket) {
    // Constructor is now private; cannot be called from outside
    if (MediaRecorderManager.instance) {
      throw new Error("Use MediaRecorderManager.getInstance() instead.");
    }

    this.stream = stream;
    this.socket = socket; // Store the WebSocket connection
    this.recorder = null;
    this.initialized = false;
  }

  init() {
    //check for initialization
    if (this.initialized) {
      return;
    }
    // Check for MediaRecorder support
    if (!window.MediaRecorder) {
      throw new Error("MediaRecorder is not supported by this browser.");
    }

    const recorderOptions = {
      type: "audio",
      mimeType: "audio/webm;codecs=pcm",
      recorderType: RecordRTC.StereoAudioRecorder,
      timeSlice: 250,
      desiredSampRate: 16000,
      numberOfAudioChannels: 1,
      bufferSize: 4096,
      audioBitsPerSecond: 128000,
      ondataavailable: (blob) => {
        if (!this.recorder) {
          return;
        }

        const reader = new FileReader();
        reader.onload = () => {
          const base64data = reader.result;

          if (this.socket) {
            this.socket.send(
              JSON.stringify({
                audio_data: base64data.split("base64,")[1],
              })
            );
          }
        };

        reader.readAsDataURL(blob);
      },
    };

    this.recorder = new RecordRTC(this.stream, recorderOptions);

    // Optional: Handle errors and other events
    this.recorder.onerror = (event) => {
      console.error("MediaRecorder error:", event);
    };
  }

  // The rest of the class remains unchanged...
  /**
   * Start recording the stream
   * @function
   * @memberof MediaRecorderManager
   */
  start() {
    if (!this.recorder) {
      throw new Error("MediaRecorder has not been initialized.");
    }

    this.recorder.startRecording();
  }

  /**
   * Stop recording the stream
   * @function
   * @memberof MediaRecorderManager
   */
  stop() {
    this.recorder.stopRecording();
  }

  /**
   * Pause recording the stream
   * @function
   * @memberof MediaRecorderManager
   */
  pause() {
    if (!this.recorder || this.recorder.state !== "recording") {
      return;
    }

    this.recorder.pauseRecording();
  }

  /**
   * Resume recording the stream
   * @function
   * @memberof MediaRecorderManager
   */
  resume() {
    if (!this.recorder || this.recorder.state !== "paused") {
      return;
    }

    this.recorder.resumeRecording();
  }

  /**
   * Destroy the recorder
   * @function
   * @memberof MediaRecorderManager
   */
  destroyRecorder() {
    if (!this.recorder) {
      return;
    }
    this.recorder.stopRecording();
    this.recorder.destroy();
  }
}

export default MediaRecorderManager;
