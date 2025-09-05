// Test setup file
// This file runs before all tests

global.console = {
  ...console,
  error: jest.fn(),
  warn: jest.fn(),
  info: jest.fn(),
  debug: jest.fn(),
};

jest.setTimeout(10000);

export {};
