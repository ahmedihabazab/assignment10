import * as z from "zod";
import { commonValidationFields } from "../../common/validation.js";
import { SystemLangEnum } from "../../common/enum/system.enum.js";

const commonEmailPasswordValidation = (lang) =>
  z.object({
    email: commonValidationFields(lang).email,
    password: commonValidationFields().password,
  });

export const loginSchema = (lang) =>
  z.object({
    body: commonEmailPasswordValidation(lang),
    // query: z.object({
    //   id: z.number().optional(),
    // }),
  });

export const signupSchema = (lang) => {
  return z.object({
    body: commonEmailPasswordValidation(lang)
      .extend({
        username: commonValidationFields().username,
        confirmPassword: commonValidationFields().confirmPassword,
        phone: commonValidationFields().phone.optional(),
        DOB: commonValidationFields().DOB.optional(),
        role: commonValidationFields(lang).role.optional(),
        gender: commonValidationFields().gender.optional(),
      })
      .refine(
        (value) => {
          return value.password === value.confirmPassword;
        },
        {
          error:
            lang == SystemLangEnum.EN
              ? "Password not confirm"
              : "خطأ في confirmPassword",
        },
      ),
  });
};
