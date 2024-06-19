import { Hono } from "hono";
import { authHandler, initAuthConfig, verifyAuth } from "@hono/auth-js";
import { db } from "@/lib/db";
import { authOptions } from "@/lib/auth";
import { User } from "@prisma/client";

type Variables = {
  db: typeof db;
  user?: User;
};
const app = new Hono<{
  Variables: Variables;
}>().basePath("/");

// app.use(
//   "*",
//   cors({
//     origin: (origin) => origin,
//     allowHeaders: ["Content-Type"],
//     allowMethods: ["*"],
//     maxAge: 86400,
//     credentials: true,
//   })
// )

app.use(async (c, next) => {
  c.set("db", db);
  await next();
});

app.use(
  "*",
  initAuthConfig((c) => authOptions)
);

app.use("/api/auth/*", authHandler());

app.use("/api/*", verifyAuth());

app.get("/api/protected", async (c) => {
  const auth = c.get("authUser");
  return c.json(auth);
});
app.get("/api/users", async (c) => {
  const db = c.get("db");
  const users = await db.user.findMany();
  return c.json(users);
});

export default app;
