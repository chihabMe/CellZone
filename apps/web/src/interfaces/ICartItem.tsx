import { Product } from "db";

export default interface ICartItem extends Product {
  liked: boolean;
  inCart: boolean;
  quantity: number;
}
