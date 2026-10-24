import jwt from "jsonwebtoken";
import {
  ACCESS_TOKEN_EXPIRES,
  ADMIN_ACCESS_TOKEN_SIGNATURE,
  ADMIN_REFRESH_TOKEN_SIGNATURE,
  REFRESH_TOKEN_EXPIRES,
  USER_ACCESS_TOKEN_SIGNATURE,
  USER_REFRESH_TOKEN_SIGNATURE,
} from "../../config/config.js";
import { tokenTypeEnum } from "../enum/token.enum.js";
import { UnAuthorizeException } from "../exeption/app.exception.js";
import { findById } from "../../DB/repo/db.repo.js";
import { usersRolesEnumObj } from "../enum/user.enum.js";
import usersModel from "../../models/users.model.js";
import { randomUUID } from "node:crypto";
import { getJwtIdPattern, setValueCashed } from "../cashe.service.js";

export function signToken({ payload = {}, signature, options } = {}) {
  return jwt.sign(payload, signature, options);
}

export function verifyToken({ token, signature } = {}) {
  return jwt.verify(token, signature);
}

export function decodeToken({ token } = {}) {
  return jwt.decode(token);
}

export function getSignatureByRole(userRole = usersRolesEnumObj.USER) {
  let signature = {};

  switch (userRole) {
    case usersRolesEnumObj.USER:
      signature.access_signature = USER_ACCESS_TOKEN_SIGNATURE;
      signature.refresh_signature = USER_REFRESH_TOKEN_SIGNATURE;
      break;

    case usersRolesEnumObj.ADMIN:
      signature.access_signature = ADMIN_ACCESS_TOKEN_SIGNATURE;
      signature.refresh_signature = ADMIN_REFRESH_TOKEN_SIGNATURE;
      break;

    default:
      break;
  }

  return signature;
}

export function create_Acc_REF_Tokens({
  user,
  options,
  refresh_token_expiresIn = REFRESH_TOKEN_EXPIRES,
} = {}) {
  const { access_signature, refresh_signature } = getSignatureByRole(user.role);

  const jwtid = randomUUID();

  const access_token = signToken({
    signature: access_signature,
    options: {
      ...options,
      expiresIn: ACCESS_TOKEN_EXPIRES,
      subject: user.id,
      audience: [user.role],
      jwtid,
    },
  });

  const refresh_token = signToken({
    signature: refresh_signature,
    options: {
      ...options,
      expiresIn: refresh_token_expiresIn,
      subject: user.id,
      audience: [user.role],
      jwtid,
    },
  });

  return { access_token, refresh_token };
}

export async function checkToken({ token, tokenType } = {}) {
  const payloadData = decodeToken({ token });

  if (!payloadData.aud.length) {
    throw BadRequestException("old token");
  }

  if (!payloadData) {
    throw UnAuthorizeException("token is invalid");
  }

  if (!payloadData.sub) {
    throw UnAuthorizeException("Id not Found");
  }

  const { access_signature, refresh_signature } = getSignatureByRole(
    payloadData.aud[0],
  );

  jwt.verify(
    token,
    tokenType == tokenTypeEnum.ACCESS ? access_signature : refresh_signature,
  );

  const userData = await findById({ model: usersModel, id: payloadData.sub });
  if (!userData) {
    throw UnAuthorizeException("User not Found");
  }

  return { userData, payloadData };
}

export async function revokeToken(payload) {
  const total_time_until_expire = payload.iat + REFRESH_TOKEN_EXPIRES;
  const time_consumed = Date.now() / 1000 - payload.iat;

  await setValueCashed({
    key: getJwtIdPattern(payload.sub, payload.jti),
    value: payload.jti,
    options: {
      expiration: {
        value: Math.ceil(total_time_until_expire - time_consumed),
      },
    },
  });
}
