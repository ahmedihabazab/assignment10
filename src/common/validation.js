import z from "zod";
import { usersGenderEnumObj, usersRolesEnumObj } from "./enum/user.enum.js";
import { SystemLangEnum } from "./enum/system.enum.js";

export const commonValidationFields = (lang = SystemLangEnum.EN) => {
  return {
    email: z.email({
      error:
        lang == SystemLangEnum.EN 
          ? "Email must follow this Pattern email@domain.com"
          : " يجب أن يتبع البريد الإلكتروني هذا النمط: email@domain.com",
    }),
    password: z.string().regex(/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&* ]).{8,16}$/g),
    username: z.string().regex(/[A-Z]{1}[a-z]{1,24}\s[A-Z]{1}[a-z]{1,24}$/g),
    confirmPassword: z.string(),
    phone: z.e164(),
    DOB: z.date(),
    role: z.literal(Object.values(usersRolesEnumObj), {
      error:
        lang == SystemLangEnum.EN
          ? "Invalid option: expected one of 0|1"
          : "خيار غير صالح: يُتوقع أحد القيمتين 0 أو 1",
    }),
    gender: z.literal(Object.values(usersGenderEnumObj)),
  };
};
