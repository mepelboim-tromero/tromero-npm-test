import 'dotenv/config';
import express, { Request, Response } from 'express';
import { tromero, openai } from './tromero';

const app = express();
app.use(express.json());

const port = 3000;

app.get('/', (_, res: Response) => {
  res.send(
    'APP to test the tromero NPM package, use POST: "/tailor" with a chat request as "input"'
  );
});

app.post('/tailor', async (req: Request, res: Response) => {
  const { input } = req.body;

  const completion = await tromero.chat.completions.create({
    model: 'july22-michael4',
    // model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: 'You are a friendly chatbot.' },
      { role: 'user', content: input },
    ],
    temperature: 0,
    max_tokens: 100,
    tags: ['testing-tags'],
    fallbackModel: 'gpt-4o-mini',
    saveData: true,

    // for streaming
    // stream: true,
  });

  // for streaming
  // res.setHeader('Content-Type', 'text/event-stream');
  // res.setHeader('Cache-Control', 'no-cache');
  // res.setHeader('Connection', 'keep-alive');

  // for await (const chunk of completion) {
  //   console.log(chunk.choices[0].delta.content);
  //   res.write(`data: ${chunk.choices[0].delta.content}\n\n`);
  // }

  // res.end();

  // for normal response

  res.send(completion.choices[0]);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
