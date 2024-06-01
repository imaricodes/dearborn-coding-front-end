import { useState, useEffect, useRef } from 'react';
import { EyeIcon } from 'lucide-react';

const AudioVisualizer = () => {


  const [audioData, setAudioData] = useState(new Uint8Array(128));
  const [isInitialized, setIsInitialized] = useState(false);
  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);


  const startVisualization = async () => {
    if (!isInitialized) {
      try {
        const audioContext = new AudioContext();
        audioContextRef.current = audioContext;

        if (audioContext.state === 'suspended') {
          await audioContext.resume();
          console.log('AudioContext resumed after user interaction');
        }

        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 2048;
        analyser.minDecibels = -90;
        analyser.maxDecibels = -10;
        analyser.smoothingTimeConstant = 0.85;

        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const audioInput = audioContext.createMediaStreamSource(stream);
        audioInput.connect(analyser);

        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        const updateAudioData = () => {
          analyser.getByteFrequencyData(dataArray);
          setAudioData([...dataArray]); // Spread into a new array to trigger update
          requestAnimationFrame(updateAudioData); // Use requestAnimationFrame for smoother updates
        };
        updateAudioData();

        setIsInitialized(true); // Mark as initialized

        return () => {
          stream.getTracks().forEach(track => track.stop());
          audioContext.close();
        };
      } catch (error) {
        console.error('Error accessing microphone:', error);
      }
    } else {
      // Resume AudioContext if already initialized but suspended
      audioContextRef.current.resume();
    }
  };

  useEffect(() => {
    if (!isInitialized) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const draw = () => {
      ctx.fillStyle = '#FEFEFE';  // Canvas background color
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = '#00FF00';  // Bar color for the audio data
    //   ctx.fillStyle = '#00FF00';  // Bar color for the audio data

      let barWidth = (width / audioData.length) * 2.5;
      let barHeight;
      let x = 0;

      for (let i = 0; i < audioData.length; i++) {
        barHeight = audioData[i] * (height / 300);

        ctx.fillRect(x, height - barHeight, barWidth, barHeight);
        x += barWidth + 1;  // Give some space between the bars
      }
    };

    draw();
  }, [audioData]); // Redraw when audioData changes

  return (
    <div>

      {!isInitialized && <button onClick={startVisualization} disabled={isInitialized}><EyeIcon/></button>}
      {isInitialized && <canvas ref={canvasRef} width="645" height="125" />}
    </div>
  );
};

export default AudioVisualizer;
