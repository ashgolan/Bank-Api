import { Router } from "express";

import {
  getAllUsers,
  addUser,
  getUser,
} from "../controllers/users.controllers.js";

export const usersRouter = Router();

usersRouter.get("", getAllUsers);

usersRouter.get("/:id", getUser);

usersRouter.post("", addUser);
