import { Hono } from "hono";
import * as controllers from "./controllers";

export const categoriesApp = new Hono();
categoriesApp.get("", controllers.getAllCategoriesController);
