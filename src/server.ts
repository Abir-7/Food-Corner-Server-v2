/* eslint-disable no-console */
import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";
import seedSuperAdmin from "./app/DB/superAdmin";

main().catch((err) => console.log(err, "gg"));

async function main() {
  await mongoose.connect(config.MONGO_DB_URI as string);
  await seedSuperAdmin();

  app.listen(config.PORT, () => {
    console.log(`Example app listening on port ${3000} & connected to mongoDb`);
  });
}
