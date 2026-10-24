import { Router } from "express";
import { successResponse } from "../../common/response/success.response.js";
import auth from "../../middlewares/auth.middleware.js";
import { logout, rotateToken } from "./user.service.js";
import { USER_REFRESH_TOKEN_SIGNATURE } from "../../config/config.js";

export const userController = Router();

// userController.get("/get-profile", auth(), async (req, res) => {
//   try {
//     successResponse({
//       res,
//       statusCode: 201,
//       msg: "created",
//       data: { userData: req.user, payload: req.payload },
//     });
//   } catch (error) {
//     res.status(400).json(error.stack);
//   }
// });

userController.post(
  "/rotate-token",
  auth(USER_REFRESH_TOKEN_SIGNATURE),
  async (req, res) => {
    try {
      const rotateTokenResult = await rotateToken(req.payload);
      successResponse({
        res,
        statusCode: 201,
        msg: "created",
        data: rotateTokenResult,
      });
    } catch (error) {
      res.status(400).json(error.stack);
    }
  },
);

userController.post("/logout", auth(), async (req, res) => {
    const result = await logout(req.payload , req.user , req.body.action )
    successResponse({
      res,
      statusCode: 201,
      msg: "done",
      data: result ,
    });
});