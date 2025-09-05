import { Request, Response } from "express";
import { verifySignature } from "../verify";
import { ethers } from "ethers";

jest.mock("ethers", () => ({
  ethers: {
    verifyMessage: jest.fn(),
    getAddress: jest.fn(),
    isAddress: jest.fn(),
  },
}));

describe("verifySignature Controller", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockJson: jest.Mock;
  let mockStatus: jest.Mock;

  beforeEach(() => {
    mockJson = jest.fn();
    mockStatus = jest.fn().mockReturnValue({ json: mockJson });

    mockRequest = {
      body: {},
    };

    mockResponse = {
      json: mockJson,
      status: mockStatus,
    };

    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("Success Cases", () => {
    it("should verify a valid signature and return signer address", async () => {
      const message = "Hello, World!";
      const signature = "0x1234567890abcdef";
      const recoveredAddress = "0x742d35Cc6634C0532925a3b8D0C4e7c8C8C8C8C8";
      const normalizedAddress = "0x742d35Cc6634C0532925a3b8D0C4e7c8C8C8C8C8";

      mockRequest.body = { message, signature };

      (ethers.verifyMessage as any).mockReturnValue(recoveredAddress);
      (ethers.getAddress as any).mockReturnValue(normalizedAddress);
      (ethers.isAddress as any).mockReturnValue(true);

      await verifySignature(mockRequest as Request, mockResponse as Response);

      expect(ethers.verifyMessage as any).toHaveBeenCalledWith(
        message,
        signature
      );
      expect(ethers.getAddress as any).toHaveBeenCalledWith(recoveredAddress);
      expect(ethers.isAddress as any).toHaveBeenCalledWith(recoveredAddress);
      expect(mockJson).toHaveBeenCalledWith({
        isValid: true,
        signer: normalizedAddress,
        originalMessage: message,
      });
      expect(mockStatus).not.toHaveBeenCalled();
    });
  });

  describe("Error Cases - Missing Fields", () => {
    it("should return 400 when message is missing", async () => {
      mockRequest.body = { signature: "0x1234567890abcdef" };

      await verifySignature(mockRequest as Request, mockResponse as Response);

      expect(mockStatus).toHaveBeenCalledWith(400);
      expect(mockJson).toHaveBeenCalledWith({
        isValid: false,
        message: "Missing required fields",
      });
      expect(ethers.verifyMessage as any).not.toHaveBeenCalled();
    });

    it("should return 400 when signature is missing", async () => {
      mockRequest.body = { message: "Hello, World!" };

      await verifySignature(mockRequest as Request, mockResponse as Response);

      expect(mockStatus).toHaveBeenCalledWith(400);
      expect(mockJson).toHaveBeenCalledWith({
        isValid: false,
        message: "Missing required fields",
      });
      expect(ethers.verifyMessage as any).not.toHaveBeenCalled();
    });

    it("should return 400 when both message and signature are missing", async () => {
      mockRequest.body = {};

      await verifySignature(mockRequest as Request, mockResponse as Response);

      expect(mockStatus).toHaveBeenCalledWith(400);
      expect(mockJson).toHaveBeenCalledWith({
        isValid: false,
        message: "Missing required fields",
      });
      expect(ethers.verifyMessage as any).not.toHaveBeenCalled();
    });

    it("should return 400 when message is empty string", async () => {
      mockRequest.body = { message: "", signature: "0x1234567890abcdef" };

      await verifySignature(mockRequest as Request, mockResponse as Response);

      expect(mockStatus).toHaveBeenCalledWith(400);
      expect(mockJson).toHaveBeenCalledWith({
        isValid: false,
        message: "Missing required fields",
      });
    });

    it("should return 400 when signature is empty string", async () => {
      mockRequest.body = { message: "Hello, World!", signature: "" };

      await verifySignature(mockRequest as Request, mockResponse as Response);

      expect(mockStatus).toHaveBeenCalledWith(400);
      expect(mockJson).toHaveBeenCalledWith({
        isValid: false,
        message: "Missing required fields",
      });
    });
  });

  describe("Error Cases - Invalid Signature", () => {
    it("should return 400 when recovered address is not a valid address", async () => {
      const message = "Hello, World!";
      const signature = "0xinvalid";
      const recoveredAddress = "invalid-address";
      const normalizedAddress = "0x1234567890abcdef1234567890abcdef12345678";

      mockRequest.body = { message, signature };

      (ethers.verifyMessage as any).mockReturnValue(recoveredAddress);
      (ethers.getAddress as any).mockReturnValue(normalizedAddress);
      (ethers.isAddress as any).mockReturnValue(false);

      await verifySignature(mockRequest as Request, mockResponse as Response);

      expect(ethers.verifyMessage as any).toHaveBeenCalledWith(
        message,
        signature
      );
      expect(ethers.getAddress as any).toHaveBeenCalledWith(recoveredAddress);
      expect(ethers.isAddress as any).toHaveBeenCalledWith(normalizedAddress);
      expect(mockStatus).toHaveBeenCalledWith(400);
      expect(mockJson).toHaveBeenCalledWith({
        isValid: false,
        message: "Invalid signature or address",
      });
    });

    it("should return 500 when ethers.verifyMessage throws an error", async () => {
      const message = "Hello, World!";
      const signature = "0xinvalid";

      mockRequest.body = { message, signature };

      (ethers.verifyMessage as any).mockImplementation(() => {
        throw new Error("Invalid signature format");
      });

      await verifySignature(mockRequest as Request, mockResponse as Response);

      expect(ethers.verifyMessage as any).toHaveBeenCalledWith(
        message,
        signature
      );
      expect(mockStatus).toHaveBeenCalledWith(500);
      expect(mockJson).toHaveBeenCalledWith({
        isValid: false,
        message: "Invalid signature",
      });
    });

    it("should return 500 when ethers.getAddress throws an error", async () => {
      const message = "Hello, World!";
      const signature = "0x1234567890abcdef";
      const recoveredAddress = "0x742d35Cc6634C0532925a3b8D0C4e7c8C8C8C8C8";
      const normalizedAddress = "0x742d35Cc6634C0532925a3b8D0C4e7c8C8C8C8C8";

      mockRequest.body = { message, signature };

      (ethers.verifyMessage as any).mockReturnValue(recoveredAddress);
      (ethers.isAddress as any).mockReturnValue(true);

      // Mock getAddress to return normalizedAddress first, then throw error on second call
      (ethers.getAddress as any)
        .mockReturnValueOnce(normalizedAddress) // First call in verifyMessage function
        .mockImplementationOnce(() => {
          // Second call in main function
          throw new Error("Invalid address format");
        });

      await verifySignature(mockRequest as Request, mockResponse as Response);

      expect(ethers.verifyMessage as any).toHaveBeenCalledWith(
        message,
        signature
      );
      expect(ethers.getAddress as any).toHaveBeenCalledWith(recoveredAddress);
      expect(ethers.isAddress as any).toHaveBeenCalledWith(normalizedAddress);
      expect(mockStatus).toHaveBeenCalledWith(500);
      expect(mockJson).toHaveBeenCalledWith({
        isValid: false,
        message: "Invalid signature",
      });
    });
  });
});
