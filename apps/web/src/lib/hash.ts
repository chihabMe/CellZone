import { hash, verify } from "argon2";

export const hashPassword = (password: string) => hash(password );
export const compareHash = (password: string, hash: string) =>
  verify(hash, password);
