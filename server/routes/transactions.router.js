import { Router } from "express";
import { addNewTransaction } from "../controllers/transactions.cotrollers.js";

export const transactionsRouter = Router();

transactionsRouter.post("", addNewTransaction);
