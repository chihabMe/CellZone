import { hash, compare } from "bcrypt";

export const hashPassword = (password: string) => hash(password, 14);
export const compareHash = (password: string, hash: string) =>
  compare(password, hash);
