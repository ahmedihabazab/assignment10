import { UnAuthorizeException } from "../common/exeption/app.exception.js";
import { authMechanesim, tokenTypeEnum } from "../common/enum/token.enum.js";
import { checkToken } from "../common/security/token.js";
import { isExists, getJwtIdPattern } from "../common/cashe.service.js";

function auth(tokenType = tokenTypeEnum.ACCESS) {
  return async function auth(req, res, next) {
    const authorization = req.headers.authorization;

    if (!authorization) {
      throw UnAuthorizeException("Token not found");
    }

    const [key, crenditial] = authorization.split(" ");

    switch (key) {
      case authMechanesim.BASIC:
        break;

      case authMechanesim.BEARER:
        const { userData, payloadData } = await checkToken({
          token: crenditial,
          tokenType,
        });

        if (await isExists(getJwtIdPattern(payloadData.sub, payloadData.jti))) {
          UnAuthorizeException({ errMsg: "loged-out , login again" });
        }

        if (payloadData.iat < userData.changeCredentialTime / 1000) {
          UnAuthorizeException({ errMsg: "loged-out , login again" });
        }
        req.user = userData;
        req.payload = payloadData;
        break;

      default:
        break;
    }

    next();
  };
}

export default auth;
