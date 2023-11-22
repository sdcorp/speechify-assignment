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
      <h2>{word}</h2>
      <br />
      <p>
        {sentence.split("").map((w, idx) => {
          return <span key={idx}>{w}</span>;
        })}
      </p>
      <br />
      <br />
      <p>Full text: {sentences.join("")} </p>
      <br />
      <br />
    </div>
  );
};
