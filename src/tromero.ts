import Tromero from 'tromero';

const tromeroKey = process.env.TROMERO_API_KEY;
const apiKey = process.env.OPENAI_API_KEY;

// the type of keys is the same as the type of the object that needs to be passed to the Tromero constructor
export const client = new Tromero({
  apiKey,
  tromeroKey,
  locationPreference: 'uk',
});
