import { MOCK_CONTENT } from "./mock";

const API_URL = "http://localhost:5174/content";

const sleep = (ms = 1000) => new Promise((resolve) => setTimeout(resolve, ms));

const getRandomElement = <T>(arr: Array<T>): T =>
  arr[(Math.random() * arr.length) | 0];

/**
 * Fetch the content from the api
 */
const fetchContent = async () => {
  if (import.meta.env.VITE_VERCEL_URL) {
    await sleep(500);
    const data = getRandomElement(MOCK_CONTENT);
    return data?.content;
  }

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
    content
      .match(/<s>(.*?)<\/s>/g)
      ?.map((s) =>
        s.replace(/<\/?s>/g, "").concat(s.includes(".") ? "" : ".")
      ) ?? []
  );
};

export { fetchContent, parseContentIntoSentences };
