import { useEffect, useRef, useState } from "react";
import { PlayingState, createSpeechEngine } from "./speech";

const useSpeech = (sentences: Array<string>) => {
  const [activeIdx, setActiveIdx] = useState(-1);
  const [currentWord, setCurrentWord] = useState("");
  const [audioState, setAudioState] = useState<PlayingState>("initialized");

  // since speech instance created once, as a hack we use ref here to get an actual last sentence index
  // for more complex cases we have to re-create speech engine with actual config each time when we got new sentences
  const lastSentenceIdx = useRef(sentences.length - 1);

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
      onEnd: () => {
        setActiveIdx((prevIdx) => {
          const nextIdx = prevIdx + 1;
          if (nextIdx > lastSentenceIdx.current) return -1;
          return nextIdx;
        });
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
    if (sentences.length === 0) return;

    lastSentenceIdx.current = sentences.length - 1;

    if (activeIdx > 0) {
      speechEngine.load(sentences[activeIdx]);
      speechEngine.play();
    }
  }, [sentences, activeIdx]);

  return {
    currentWord,
    currentSentence: sentences[activeIdx],
    controls: {
      ...speechEngine,
      // Override default methods for adding some extra logic
      play: () => {
        //  Init sequence
        if (activeIdx === -1) {
          setActiveIdx(0);
          speechEngine.load(sentences[0]);
        }
        speechEngine.play();
      },
      cancel: () => {
        speechEngine.cancel();
        setActiveIdx(-1);
        setCurrentWord("");
      },
    },
    audioState,
  };
};

export { useSpeech };
