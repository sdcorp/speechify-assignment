type CurrentlyReadingProps = {
  word: string;
  sentence: string;
  sentences: string[];
};

// Implement a component that displays the currently read word and sentence
export const CurrentlyReading = ({
  word,
  sentence,
  sentences,
}: CurrentlyReadingProps) => {
  return (
    <div className="currently-reading">
      <br />
      <p>
        Current sentence:{" "}
        {sentence?.split(" ").map((w, idx) => {
          const highlighted = w === word;
          return (
            <span
              key={idx}
              style={{
                color: highlighted ? "red" : "black",
                fontWeight: highlighted ? "bolder" : "normal",
              }}
            >
              {w}{" "}
            </span>
          );
        })}
      </p>
      <br />
      <br />
      <p>Full sentence: {sentences.join(" ")} </p>
      <br />
      <br />
    </div>
  );
};
