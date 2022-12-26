import {compare, hash} from "bcryptjs";

export async function hashPassword(password) {
  // the second argument represents the amount of salting rounds performed to generate the hash, 12 is considered safe
  return await hash(password, 12);
}

export async function verifyPassword(password, hashedPassword) {
  return await compare(password, hashedPassword);
}
