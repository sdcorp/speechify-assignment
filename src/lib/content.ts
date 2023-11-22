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
  // extract substring from string that matches pattern: <s></s>
  return (
    content.match(/<s>(.*?)<\/s>/g)?.map((s) => s.replace(/<\/?s>/g, "")) ?? []
  );
};

export { fetchContent, parseContentIntoSentences };
