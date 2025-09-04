import { Request, Response } from "express";
import { ethers } from "ethers";

const verifyMessage = (message: string, signature: string) => {
  const recoveredAddress = ethers.verifyMessage(message, signature);
  console.log("recoveredAddress", recoveredAddress);
  return ethers.getAddress(recoveredAddress);
};

export const verifySignature = async (req: Request, res: Response) => {
  try {
    console.log("req.body", req);
    const { message, signature } = req.body;

    if (!message || !signature) {
      return res.status(400).json({
        isValid: false,
        message: "Missing required fields",
      });
    }

    const signer = verifyMessage(message, signature);

    if (!ethers.isAddress(signer)) {
      return res.status(400).json({
        isValid: false,
        message: "Invalid signature or address",
      });
    }

    const signerAddress = ethers.getAddress(signer);

    res.json({
      isValid: true,
      signer: signerAddress,
      originalMessage: message,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      isValid: false,
      message: "Invalid signature",
    });
  }
};
