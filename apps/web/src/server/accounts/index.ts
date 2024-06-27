import { Hono } from "hono";
import * as controllers from "./controllers";

export const accountsApp = new Hono();

accountsApp.get("profile/",  controllers.getUserProfile);
