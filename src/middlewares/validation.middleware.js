import { SystemLangEnum } from "../common/enum/system.enum.js";
import { BadRequestException } from "../common/exeption/app.exception.js";

function validation(schema) {
  return (req, res, next) => {
    const language = req.headers["accept-language"] || SystemLangEnum.EN
    
    const validaionResult = schema(language).safeParse({
      body: req.body,
      query: req.query,
    });

    if (!validaionResult.success) {
      throw BadRequestException({
        errMsg: "validationErr",
        cause: {
          issues: validaionResult.error.issues,
        },
      });
    }

    req.validationDataBody = validaionResult.data.body;
    next();
  };
}

export default validation;
