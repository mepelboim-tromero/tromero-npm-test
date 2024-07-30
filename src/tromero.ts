import Tromero from 'tromero';
import OpenAI from 'openai';

export const tromero = new Tromero({
  tromeroKey: process.env.TROMERO_API_KEY,
});

// export const tromero = new Tromero({
//   tromeroKey: process.env.TROMERO_API_KEY,
//   apiKey: process.env.OPENAI_API_KEY,
// });

const key = process.env.OPENAI_API_KEY;
export const openai = new OpenAI({ apiKey: key });
