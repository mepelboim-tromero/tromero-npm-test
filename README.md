# Test-NPM

This repository contains a simple Express server that is used to test the Tromero package.

## Endpoints

- `/`: This endpoint provides an introduction to the application.

- `POST /test`: To use this endpoint, you need to pass a prompt as the 'messages' parameter in the body of the request.

- `POST /test-zod`: To test responses from openAI using zod for JSON schema validation. You need to pass a prompt as the 'question' parameter in the body of the request.

- `GET /models`: This endpoint returns a list of the available models.

- `GET /models/:model`: This endpoint returns the details of a specific model.

- `GET /datasets`: This endpoint returns a list of the available datasets.

- `POST /deploy`: This endpoint is used to deploy a model. You need to pass the model name as the 'model' parameter in the body of the request.

- `POST /undeploy`: This endpoint is used to undeploy a model. You need to pass the model name as the 'model' parameter in the body of the request.

## Installation

To install all the dependencies, run the following command:

```bash
npm i
```

## Configuration

Make sure to have a Tromero key and/or an OpenAI API key and add them to a `.env` file. You can follow the example provided in the `.env.example` file.

## To run the server

```bash
npm run dev
```

The server will be running on `http://localhost:3000`.

## How to test the Tromero NPM package locally with this server

1. Go to the package directory and run the following command:

```bash
npm link
```

2. Go to the server directory and run the following command:

```bash
npm link tromero
```

3. Now you can use the package in the server code.
