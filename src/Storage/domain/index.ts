import { Event } from "../../utils/EventBus";

export type ProductId = string;

export type Stock = Record<ProductId, number>;

export type LowStockEvent = Event<"STOCK_HAS_GONE_BELOW_DANGER_LEVEL", { productId: ProductId; stock: number }>;

export const DANGEROUSLY_LOW_STOCK_LEVEL = 5;

export const incrementStock =
  (productId: ProductId) =>
  (quantity: number) =>
  (stock: Stock): Stock => {
    // Would be better implemented with a lens
    return {
      ...stock,
      [productId]: stock[productId] + quantity,
    };
  };

export const decrementStock =
  (productId: ProductId) =>
  (quantity: number) =>
  (stock: Stock): Stock => {
    // Would be better implemented with a lens
    return {
      ...stock,
      [productId]: stock[productId] - quantity,
    };
  };
