import { PlayingState, SpeechEngineState } from "../lib/speech";

// Implement a component that provides basic UI options such as playing, pausing and loading new content
type ControlProps = {
  audioState: PlayingState;
  refetch: () => void;
  controls: {
    state: SpeechEngineState;
    play: () => void;
    pause: () => void;
    cancel: () => void;
    load: (text: string) => void;
  };
};

export const Controls = ({
  controls: { play, cancel, pause },
  refetch,
  audioState,
}: ControlProps) => {
  return (
    <div>
      <h2>Controls</h2>
      <br />
      <p>State: {audioState}</p>
      <br />
      <div>
        <button onClick={play} type="button">
          Play
        </button>
        <br />
        <br />
        <button onClick={pause} type="button">
          Pause
        </button>
        <br />
        <br />
        <button onClick={cancel} type="button">
          Cancel / Reset
        </button>
        <br />
        <br />
        <button
          onClick={() => {
            cancel();
            refetch();
          }}
          type="button"
        >
          Re-fetch new content
        </button>
      </div>
    </div>
  );
};
