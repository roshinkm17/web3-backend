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

4. Run tests (optional):

```bash
npm test
```

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
- Jest (Testing Framework)
- ts-jest (TypeScript support for Jest)

## Testing

This project includes comprehensive test coverage using Jest and TypeScript.

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode (for development)
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run tests for CI/CD
npm run test:ci
```

### Test Coverage

The project maintains **100% test coverage** for all controllers:

```
-----------------|---------|----------|---------|---------|-------------------
File             | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
-----------------|---------|----------|---------|---------|-------------------
All files        |   36.95 |       75 |      50 |   35.55 |
 src             |       0 |        0 |       0 |       0 |
  index.ts       |       0 |        0 |       0 |       0 | 1-20
  routes.ts      |       0 |      100 |     100 |       0 | 1-6
  sign.ts        |       0 |      100 |       0 |       0 | 1-20
  swagger.ts     |       0 |      100 |     100 |       0 | 3
 src/controllers |     100 |      100 |     100 |     100 |
  verify.ts      |     100 |      100 |     100 |     100 |
-----------------|---------|----------|---------|---------|-------------------
```

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
