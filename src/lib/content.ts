const API_URL = "http://localhost:5174/content";

/**
 * Fetch the content from the api
 */
const fetchContent = async () => {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data?.content;
};

/**
 * Parse the content into sentences, and return an array of sentences. Look at the Readme for sample input and expected output.
 * Avoid using DOMParser for implementing this function.
 */
const parseContentIntoSentences = (content: string) => {
  let truncedByStartTag = content
    .split(">")
    .filter((str) => !str.startsWith("<"))
    .filter(Boolean);

  let output = truncedByStartTag.map((strWithEndTag) => {
    let splt = strWithEndTag.split("<");
    let res = splt.filter((s) => !s.startsWith("/")).join("");
    return res;
  });

  return output;
};

export { fetchContent, parseContentIntoSentences };
