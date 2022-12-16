import { Router } from "express";

import {
  getAllUsers,
  addUser,
  getUser,
} from "../controllers/users.controllers.js";

export const usersRouter = Router();

usersRouter.get("", getAllUsers);

usersRouter.get("/:uid", getUser);

usersRouter.post("", addUser);
