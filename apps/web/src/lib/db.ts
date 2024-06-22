// import { PrismaClient } from "@prisma/client";
// import { PrismaLibSQL } from "@prisma/adapter-libsql";
// import { createClient } from "@libsql/client";
import { prisma } from "db";

// const libsql = createClient({
//   url: `${process.env.TURSO_DATABASE_URL}`,
//   authToken: `${process.env.TURSO_AUTH_TOKEN}`,
// });

// const adapter = new PrismaLibSQL(libsql);
// const turso = new PrismaClient({ adapter });

// const local = new PrismaClient();
// let instance: PrismaClient;
// if (process.env.NODE_ENV == "production") {
//   instance = turso;
// } else {
//   instance = local;
// }
export const db = prisma;
