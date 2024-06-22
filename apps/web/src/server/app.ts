import { Context, Hono } from "hono";
import { authHandler, initAuthConfig, verifyAuth } from "@hono/auth-js";
import { db } from "@/lib/db";
import { authOptions } from "@/lib/auth";
import { User } from "@prisma/client";
import { categoriesApp } from "./categories";
import { productsApp } from "./products";

declare module "hono" {
  interface ContextVariableMap {
    db: typeof db;
  }
}
type Env = {
  Variables: {
    db: typeof db;
    user?: User;
  };
};
const app = new Hono<Env>().basePath("/");

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

// app.use("/api/*", verifyAuth());

app.get("/api/protected", async (c) => {
  const auth = c.get("authUser");
  return c.json(auth);
});
app.get("/api/users", async (c) => {
  const db = c.get("db");
  const users = await db.user.findMany();
  return c.json(users);
});

app.route("/api/categories", categoriesApp);
app.route("/api/products", productsApp);

export default app;
