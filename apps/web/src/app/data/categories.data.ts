"import server";
import { cache } from "react";
import { db } from "@/lib/db";

export const getCategories = cache(() => db.category.findMany());
