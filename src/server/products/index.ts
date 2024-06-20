import { Hono } from "hono";
import * as controllers from "./controllers";

export const productsApp = new Hono();
productsApp.get("", controllers.getAllProductsController);
