import { useEffect, useState } from "react";
import { createSpeechEngine } from "./speech";

const useSpeech = (sentences: Array<string>) => {
  const [currentWord, setCurrentWord] = useState("");
  const [currentSentence, setCurrentSentence] = useState("");
  const [audioState, setAudioState] = useState("");

  const [speechEngine] = useState(() =>
    createSpeechEngine({
      onBoundary: (event) => {
        const wordsFromSentence = event.utterance.text.split(" ");
        const idx = event.charIndex;
        const foundWord = wordsFromSentence.find((word) =>
          word.startsWith(event.utterance.text.at(idx) ?? "")
        );
        setCurrentWord(foundWord ?? "");
      },
      onEnd: (event) => {
        console.log(
          `Utterance has finished being spoken after ${event.elapsedTime} seconds.`
        );
      },
      onStateUpdate: setAudioState,
    })
  );

  /*
  Implement a custom useSpeech hook that uses a speech engine defined in 'speech.ts'
  to play the sentences that have been fetched and parsed previously.
  
  This hook should return react friendly controls for playing, and pausing audio as well as provide information about
  the currently read word and sentence
  */

  useEffect(() => {
    if (sentences.length > 0) {
      console.log("loading engine...", sentences);
      speechEngine.load(sentences[0]);
      setCurrentSentence(sentences[0]);
    }
  }, [sentences]);

  return {
    currentWord,
    currentSentence,
    controls: speechEngine,
  };
};

export { useSpeech };
