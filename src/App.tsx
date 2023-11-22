import { useEffect, useState } from "react";
import "./App.css";

import { Controls } from "./components/Controls";
import { CurrentlyReading } from "./components/CurrentlyReading";
import { fetchContent, parseContentIntoSentences } from "./lib/content";
import { useSpeech } from "./lib/useSpeech";

function App() {
  const [sentences, setSentences] = useState<Array<string>>([]);
  const { currentWord, currentSentence, controls } = useSpeech(sentences);

  useEffect(() => {
    fetchContent().then((str) => {
      const parsed = parseContentIntoSentences(str);
      setSentences(parsed);
    });
  }, []);

  return (
    <div className="App">
      <h1>Text to speech</h1>
      <div>
        <CurrentlyReading word={currentWord} sentence={currentSentence} />
      </div>
      <div>
        <Controls play={controls.play} cancel={controls.cancel} />
      </div>
    </div>
  );
}

export default App;
