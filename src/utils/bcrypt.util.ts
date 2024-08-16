import * as bcrypt from "bcrypt";
const saltOrRounds = 10;
export const bcryptHashUtil = (param: string) =>
  bcrypt.hashSync(param, saltOrRounds);

export const bcryptCompareSyncUtil = (plainText: string, hashedText: string) =>
  bcrypt.compareSync(plainText, hashedText);
