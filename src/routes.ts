import { Router } from "express";
import { verifySignature } from "./controllers/verify";

export const router = Router();

router.post("/verify-signature", verifySignature);
