import { useEffect, useState } from "react";
import { PlayingState, createSpeechEngine } from "./speech";

const useSpeech = (sentences: Array<string>) => {
  const [activeSentenceIdx, setActiveSentenceIdx] = useState(-1);
  const [currentWord, setCurrentWord] = useState("");
  const [audioState, setAudioState] = useState<PlayingState>("initialized");

  // define inside useState to get a stable instance of speech engine between re-renders
  const [speechEngine] = useState(() =>
    createSpeechEngine({
      onBoundary: (event) => {
        const txt = event.utterance.text;
        const idx = event.charIndex;
        const wordLength = event.charLength;
        const word = txt.slice(idx, idx + wordLength);
        setCurrentWord(word);
      },
      onEnd: () => setActiveSentenceIdx((prevIdx) => prevIdx + 1),
      onStateUpdate: setAudioState,
    })
  );

  const currentSentence = sentences[activeSentenceIdx];
  const lastSentenceIdxNew = sentences.length - 1;
  const reachedToEnd = activeSentenceIdx > lastSentenceIdxNew;

  /*
  Implement a custom useSpeech hook that uses a speech engine defined in 'speech.ts'
  to play the sentences that have been fetched and parsed previously.
  
  This hook should return react friendly controls for playing, and pausing audio as well as provide information about
  the currently read word and sentence
  */

  useEffect(() => {
    if (activeSentenceIdx >= -1 && currentSentence) {
      speechEngine.load(currentSentence);
      speechEngine.play();
    }
  }, [currentSentence, activeSentenceIdx]);

  useEffect(() => {
    if (reachedToEnd) {
      setActiveSentenceIdx(-1);
    }
  }, [reachedToEnd]);

  return {
    currentWord,
    currentSentence,
    controls: {
      ...speechEngine,
      // Override default methods for adding some extra logic
      play: () => {
        //  Init sequence
        if (activeSentenceIdx === -1) {
          setActiveSentenceIdx(0);
        } else {
          speechEngine.play();
        }
      },
      cancel: () => {
        speechEngine.cancel();
        setActiveSentenceIdx(-1);
        setCurrentWord("");
      },
    },
    audioState,
  };
};

export { useSpeech };
