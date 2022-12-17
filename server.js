import express from "express";
import { usersRouter } from "./server/routes/users.route.js";
import { accountsRouter } from "./server/routes/accounts.routes.js";
import { transactionsRouter } from "./server/routes/transactions.router.js";
import { bankRouter } from "./server/routes/bank.routes.js";
// import { appRouter } from "./routes/app.routes.js";
import { index } from "./server/utils/index.js";
import "./server/db/mongoose.js";
import cors from "cors";
const PORT = process.env.PORT || 5001;
// changed
const app = express();

app.use(express.json());
// app.use(cors({ credentials: true }));
app.use(cors());

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).send({ status: 404, message: err.message }); // Bad request
  }
  next();
});
app.get("", (req, res) => {
  res.write(index);
});

app.use("/api/bank", bankRouter);
app.use("/api/users", usersRouter);
app.use("/api/accounts", accountsRouter);
app.use("/api/transactions", transactionsRouter);

app.listen(PORT, () => {
  console.log("server is up on port " + PORT);
});
