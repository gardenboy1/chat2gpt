import { useState, useEffect } from 'react';

const Home = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('');
  const [recognition, setRecognition] = useState(null);
  const [synth, setSynth] = useState(null);

  // Initialize SpeechRecognition and SpeechSynthesis when the component mounts
  useEffect(() => {
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    setRecognition(recognition);
    const synth = window.speechSynthesis;
    setSynth(synth);
  }, []);

  // Handle starting and stopping speech recognition
  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const startRecording = () => {
    setIsRecording(true);
    recognition.interimResults = true;
    recognition.maxAlternatives = 10;
    recognition.continuous = true;
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setUserInput(transcript);
    };
    recognition.start();
  };

  const stopRecording = () => {
    setIsRecording(false);
    recognition.stop();
  };

  // Call the API and synthesize the response
  const callApi = async () => {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    });
    const data = await response.json();
    const { output } = data;
    setApiOutput(output.text);
    speakOutput(output.text);
  };

  const speakOutput = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
  };

  return (
    <div className="container">
      <h1>Click the red button and say hello</h1>
      <button className="red-button" onClick={toggleRecording}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
      <div className="speech-display">
        <p>You said: {userInput}</p>
        <p>Assistant said: {apiOutput}</p>
      </div>
    </div>
  );
};

export default Home;