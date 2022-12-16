import { Router } from "express";
import {
  getAllAccounts,
  addNewAccount,
  getAccount,
} from "../controllers/accounts.controllers.js";

export const accountsRouter = Router();

accountsRouter.get("", getAllAccounts);

accountsRouter.get("/:uid", getAccount);

accountsRouter.post("", addNewAccount);
