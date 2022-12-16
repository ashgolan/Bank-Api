import { createUser, loadFromDb, findObj } from "../utils.js";
import { user } from "../models/User.model.js";

export const getAllUsers = async (req, res) => {
  const data = await loadFromDb(user);
  res.status(200).send(data);
};

export const addUser = async (req, res) => {
  const newUser = await createUser(req.body);
  newUser !== -1
    ? res.status(200).send(newUser)
    : res.status(401).send(`user with id provided already exist`);
};

export const getUser = async (req, res) => {
  const foundUser = await findObj(user, req.params.uid);
  foundUser != -1
    ? res.status(201).send(foundUser)
    : res.status(401).send("user not found");
};
