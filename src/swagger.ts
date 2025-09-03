import { OpenAPIV3 } from "openapi-types";

export const swaggerSpec: OpenAPIV3.Document = {
  openapi: "3.0.0",
  info: {
    title: "Web3 Signature Verifier API",
    version: "1.0.0",
    description: "API to verify Ethereum signatures",
  },
  servers: [{ url: "http://localhost:3000/api" }],
  paths: {
    "/verify-signature": {
      post: {
        summary: "Verify a signed message",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: { type: "string" },
                  signature: { type: "string" },
                },
                required: ["message", "signature"],
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Verification result",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    isValid: { type: "boolean" },
                    signer: { type: "string" },
                    originalMessage: { type: "string" },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
