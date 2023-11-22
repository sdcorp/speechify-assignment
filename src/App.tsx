import { useEffect, useState } from "react";
import "./App.css";

import { Controls } from "./components/Controls";
import { CurrentlyReading } from "./components/CurrentlyReading";
import { fetchContent, parseContentIntoSentences } from "./lib/content";
import { useSpeech } from "./lib/useSpeech";

function App() {
  const [sentences, setSentences] = useState<Array<string>>([]);
  const [counter, setCounter] = useState(-1);
  const { currentWord, currentSentence, controls, audioState } =
    useSpeech(sentences);

  useEffect(() => {
    fetchContent()
      .then((content) => {
        const parsedSentences = parseContentIntoSentences(content);
        setSentences(parsedSentences);
      })
      .catch(console.error);
  }, [counter]);

  return (
    <div className="App">
      <h1>Text to speech</h1>
      <div>
        <CurrentlyReading
          word={currentWord}
          sentence={currentSentence}
          sentences={sentences}
        />
      </div>
      <hr />
      <br />
      <div>
        <Controls
          refetch={() => setCounter((c) => c + 1)}
          controls={controls}
          audioState={audioState}
        />
      </div>
    </div>
  );
}

export default App;
