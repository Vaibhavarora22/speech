import React from "react";
import "./App.css";
import SpeechRecognition, {
  useSpeechRecognition
} from "react-speech-recognition";
import { CopyToClipboard } from "react-copy-to-clipboard";

function App() {
  const [copied, setCopied] = React.useState(false);
  const onChange = React.useCallback(({ target: { value } }) => {
    setValue(value);
    setCopied(true);
  }, []);
  const onClick = React.useCallback(({ target: { innerText } }) => {
    console.log(`Clicked on "${innerText}"!`);
  }, []);
  const onCopy = React.useCallback(() => {
    setCopied(true);
  }, []);

  const startlistening = () =>
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
  const {
    transcript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  return (
    <>
      <div className="container">
        <h2> speech to text converter</h2>
        <br />
        <p>
          {" "}
          a react hook that converts speech from microphone to text and make it
          available to your react componenet
        </p>
        <div className="main-content">{transcript}</div>
        <div className="btn-style">
          <CopyToClipboard onCopy={onCopy} text={transcript}>
            <button>Copy</button>
          </CopyToClipboard>
          <button onClick={startlistening}>start listening</button>
          <button onClick={SpeechRecognition.stopListening}>
            stop listening
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
