import { Hono } from "hono";
import * as controllers from "./controllers";
import { verifyAuth } from "@hono/auth-js";

export const accountsApp = new Hono();

accountsApp.get("profile/", verifyAuth(), controllers.getUserProfile);
