# Web3 Signature Verifier API

A simple Express.js API for verifying Ethereum signatures using ethers.js.

## Features

- Verify Ethereum message signatures
- RESTful API with Swagger documentation
- CORS enabled for frontend integration

## Quick Start

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open Swagger UI at `http://localhost:3000/swagger`

## API Endpoints

### POST /api/verify-signature

Verify an Ethereum signature.

**Request Body:**

```json
{
  "message": "Hello World",
  "signature": "0x..."
}
```

**Response:**

```json
{
  "isValid": true,
  "signer": "0x...",
  "originalMessage": "Hello World"
}
```

## Tech Stack

- Node.js + Express
- TypeScript
- ethers.js
- Swagger UI

## Areas for Improvement

### Swagger Configuration

As the API grows, consider splitting the Swagger config:

- **Current**: Single `swagger.ts` file with all endpoints
- **Suggested**: Separate config files per API module (e.g., `swagger/auth.ts`, `swagger/verification.ts`)
- **Benefits**: Better maintainability, team collaboration, modular documentation

### Additional Improvements

- **Error Handling**: Add global error middleware for consistent error responses
- **Validation**: Implement request validation middleware (e.g., Joi, Zod)
- **Logging**: Structured logging with Winston or similar
