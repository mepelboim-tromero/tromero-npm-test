import 'dotenv/config';
import express, { Request, Response } from 'express';
import { client } from './tromero';
import { z } from 'zod';
import { zodResponseFormat } from 'openai/helpers/zod';

const app = express();
app.use(express.json());

const port = 3000;

app.get('/', (_, res: Response) => {
  res.send(
    'APP to test the tromero NPM package. Check the code to see the available routes.'
  );
});

app.get('/models', async (_, res: Response) => {
  const models = await client.tromeroModels.list();
  res.json(models);
});

app.get('/model/:name', async (req: Request, res: Response) => {
  const { name } = req.params;
  const model = await client.tromeroModels.getInfo(name);
  res.json(model);
});

app.get('/datasets', async (_, res: Response) => {
  try {
    const datasets = await client.tromeroDatasets.list();
    res.json(datasets);
  } catch (error) {
    console.log('error from app: ', error);
    res.json(error);
  }
});

app.post('/deploy', async (req: Request, res: Response) => {
  const { model } = req.body;
  try {
    const deploy = await client.tromeroModels.deploy(model);
    console.log('deploy from app: ', deploy);
    res.json(deploy);
  } catch (error) {
    console.log('deploy error from app: ', error);
    res.json(error);
  }
});

app.post('/undeploy', async (req: Request, res: Response) => {
  const { model } = req.body;
  try {
    const undeploy = await client.tromeroModels.undeploy(model);
    console.log('from app: ', undeploy);
    res.json(undeploy);
  } catch (error) {
    console.log('error from app: ', error);
    res.json(error);
  }
});

app.post('/test-zod', async (req: Request, res: Response) => {
  const { question } = req.body; // What is the weather today?

  const responseSchema = z.object({
    greeting: z.string(),
    weather: z.string(),
  });

  const completion = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: 'You are a friendly chatbot that provides weather updates.',
      },
      { role: 'user', content: question },
    ],
    response_format: zodResponseFormat(responseSchema, 'weatherman'),
    // response_format: {
    //   type: 'json_schema',
    //   json_schema: {
    //     name: 'weatherman',
    //     description: 'A weatherman response',
    //     schema: {
    //       type: 'object',
    //       properties: {
    //         greeting: { type: 'string' },
    //         weather: { type: 'string' },
    //       },
    //       required: ['greeting', 'weather'],
    //     },
    //   },
    // },
    temperature: 0,
    max_tokens: 50,
  });

  const content = completion.choices[0];
  console.log(content);
  res.json(JSON.parse(completion.choices[0].message.content!));
});

app.post('/test', async (req: Request, res: Response) => {
  const { messages } = req.body;

  // messages: [
  //   {
  //     role: 'system';
  //     content: 'You are a highly intelligent and conversational AI assistant. You are here to help the user with their inquiries, offering detailed explanations, creative suggestions, and practical solutions. Be clear, concise, and provide well-reasoned responses.';
  //   },
  //   {
  //     role: 'user';
  //     content: 'How can i get from Rome to Berlin? a fun trip';
  //   }
  // ];

  const completion = await client.chat.completions.create({
    model: 'mistral-7b-instruct-v0.3',
    // model: 'gpt-4o-mini',
    messages,

    // tags: ['testing-tags4'],
    // fallbackModel: 'gpt-4o-mini',

    // saveData: true,

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
  const content = completion.choices[0];
  console.log(content);
  res.json(completion.choices[0].message.content);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
