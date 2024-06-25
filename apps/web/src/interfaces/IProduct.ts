import { Product } from "db";

export default interface IProduct extends Product {
  liked?: boolean;
}
