import { PrismaClient } from "@prisma/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";
import { createClient } from "@libsql/client";

declare global {
  var prisma: PrismaClient;
}

let db: PrismaClient;
if (process.env.NODE_ENV !== "production") {
  db = global.prisma || new PrismaClient();
  global.prisma = db;
} else {
  const libsql = createClient({
    url: `${process.env.TURSO_DATABASE_URL}`,
    authToken: `${process.env.TURSO_AUTH_TOKEN}`,
  });
  const adapter = new PrismaLibSQL(libsql);
  db = new PrismaClient({ adapter });
}
export const prisma = db;

export * from "@prisma/client";
