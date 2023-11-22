// Implement a component that provides basic UI options such as playing, pausing and loading new content
type ControlProps = {
  play: () => void;
  cancel: () => void;
};

export const Controls = ({ play, cancel }: ControlProps) => {
  return (
    <div>
      <h2>Controls</h2>
      <div>
        <button onClick={play} type="button">
          Play
        </button>
        <br />
        <br />
        <button onClick={cancel} type="button">
          Cancel
        </button>
      </div>
    </div>
  );
};
