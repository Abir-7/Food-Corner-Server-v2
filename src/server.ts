/* eslint-disable no-console */
import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(config.MONGO_DB_URI as string);

  app.listen(config.PORT, () => {
    console.log(`Example app listening on port ${3000}`);
  });
}
