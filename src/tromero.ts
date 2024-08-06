import Tromero from 'tromero';

type Keys = {
  tromeroKey?: string;
  apiKey?: string;
};

const tromeroKey = process.env.TROMERO_API_KEY;
const apiKey = process.env.OPENAI_API_KEY;

// use only the keys that are defined and not empty
const keys: Keys = {};
if (tromeroKey) keys.tromeroKey = tromeroKey;
if (apiKey) keys.apiKey = apiKey;

export const client = new Tromero(keys);
