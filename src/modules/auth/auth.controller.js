import { Router } from "express";
import { login, signup } from "./auth.service.js";
import { successResponse } from "../../common/response/success.response.js";
import validation from "../../middlewares/validation.middleware.js";
import { loginSchema, signupSchema } from "./auth.validation.js";
export const authController = Router();

authController.post("/signup", validation(signupSchema) , async (req, res) => {
  try {
    const result = await signup(req.body);
    successResponse({ res, statusCode: 201, msg: "created", data: result });
  } catch (error) {
    res.status(400).json(error.stack);
  }
});

authController.post("/login", validation(loginSchema) ,  async (req, res) => {
  

  const result = await login(req.validationDataBody);
  successResponse({ res, statusCode: 201, msg: "created", data: result });
});
