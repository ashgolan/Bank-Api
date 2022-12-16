import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const URL = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.nf3dtgt.mongodb.net/?retryWrites=true&w=majority`;
mongoose.set("strictQuery", false);
mongoose.connect(URL, (err, mongoDbInstance) => {
  if (err) throw Error("MongooDb connection Error ! -- " + err);

  // const { host, port, name } = mongoDbInstance;
  // console.log({ host, port, name });
});
