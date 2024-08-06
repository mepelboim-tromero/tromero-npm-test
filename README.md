# Test-NPM

This repository contains a simple Express server that is used to test the Tromero package.

## Endpoints

- `/`: This endpoint provides an introduction to the application.

- `POST /tailor`: To use this endpoint, you need to pass a prompt as the 'input' parameter.

## Installation

To install all the dependencies, run the following command:

```bash
npm i
```

## Configuration

Make sure to have a Tromero key and/or an OpenAI API key and add them to a `.env` file. You can follow the example provided in the `.env.example` file.
