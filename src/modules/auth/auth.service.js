import { ConflictException } from "../../common/exeption/app.exception.js";
import { create, findOne } from "../../DB/repo/db.repo.js";
import usersModel from "../../models/users.model.js";
import { compareHash, hashValue } from "../../common/security/hash.js";
import { hashToolEnumObj } from "../../common/enum/security.enum.js";
import { decryptValue, encryptValue } from "../../common/security/encrypt.js";
import { create_Acc_REF_Tokens } from "../../common/security/token.js";

export async function signup(reqBody) {
  const emailMatched = await findOne({
    model: usersModel,
    filter: { email: reqBody.email },
  });
  if (emailMatched) {
    throw ConflictException({ errMsg: "Email Already Exist" });
  }
  reqBody.password = await hashValue({
    tool: hashToolEnumObj.ARGON,
    value: reqBody.password,
  });
  reqBody.phone = await encryptValue({ value: reqBody.phone });
  const createResult = await create({ model: usersModel, data: reqBody });
  return createResult;
}

export async function login(reqBody) {
  const userMatched = await findOne({
    model: usersModel,
    filter: { email: reqBody.email },
  });
  if (!userMatched) {
    throw ConflictException({ errMsg: "invalid email " });
  }
  const compareResult = await compareHash({
    tool: hashToolEnumObj.ARGON,
    value: reqBody.password,
    hash: userMatched.password,
  });
  if (!compareResult) {
    throw ConflictException({ errMsg: "invalid password" });
  }
  userMatched.phone = await decryptValue({ ciphertext: userMatched.phone });

 return create_Acc_REF_Tokens({user : userMatched})
}
