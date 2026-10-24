import express from "express";
import { PORT } from "./config/config.js";
import { authController } from "./modules/auth/auth.controller.js";
import { dbConnection } from "./DB/connection.db.js";
import mongoose from "mongoose";
import { userController } from "./modules/user/user.controller.js";
import globalErrMiddleware from "./middlewares/error.middleware.js";
import { getetValueCashed, setValueCashed, updateValue } from "./common/cashe.service.js";
import { sendMail } from "./common/utils/email/email.config.js";

async function bootstrap() {
  const server = express();

  server.use(express.json());
  await dbConnection();
  await mongoose.syncIndexes();

  // console.log(await setValueCashed({ key: "username", value: "Ahmed" }));
  // console.log(
  //   await setValueCashed({
  //     key: "iphone",
  //     value: { price: 13000, name: "13 pro max" },
  //   }),
  // );
  //   console.log(await updateValue({ key: "username", value: "update" }));
    // console.log(await updateValue({ key: "ahmed", value: "update" }));
  //   console.log(await updateValue({ key: "iphone", value: {price : "update" , name : "update" , update : "test"} }));
  // console.log(await getetValueCashed("username"));
  // console.log(await getetValueCashed("iphone"));

  server.use("/auth", authController);
  server.use("/user", userController);
  server.use(globalErrMiddleware);

  await sendMail()

  server.listen(PORT, () => {
    console.log(`on PORT ${PORT}`);
  });
}

bootstrap();
