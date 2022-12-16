import { Router } from "express";
import { getAlldata, getAccounts } from "../controllers/bank.controllers.js";

export const bankRouter = Router();

bankRouter.get("/all", getAlldata);

bankRouter.get("/accounts", getAccounts);
