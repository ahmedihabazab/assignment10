import * as bcrypt from "bcrypt";
import * as argon2 from "argon2";
import { hashToolEnumObj } from "../enum/security.enum.js";
import { SALT_ROUND } from "../../config/config.js";

// export async function hashValue({ value, saltRound = 12 } = {}) {
//   return await hash(value, saltRound);
// }

export async function hashValue({
  tool = hashToolEnumObj.BCRYPT | hashToolEnumObj.ARGON,
  value,
  saltRound = SALT_ROUND,
} = {}) {
  let hashedValue;
  switch (tool) {
    case hashToolEnumObj.BCRYPT:
      hashedValue = bcrypt.hash(value, saltRound);
      break;

    case hashToolEnumObj.ARGON:
      hashedValue = argon2.hash(value);
      break;
  }
  return hashedValue;
}

export async function compareHash({
  tool = hashToolEnumObj.BCRYPT | hashToolEnumObj.ARGON,
  value,
  hash,
} = {}) {
  let compareResult;
  switch (tool) {
    case hashToolEnumObj.BCRYPT:
      compareResult = bcrypt.compare(value, hash);
      break;

    case hashToolEnumObj.ARGON:
      compareResult = argon2.verify(hash, value);
      break;
  }
  return compareResult;
}
