import { AnyDomainEvent } from "../events";
import { EventBus } from "../utils/EventBus";
import {
  DANGEROUSLY_LOW_STOCK_LEVEL,
  incrementStock as incrementStockFromDomain,
  decrementStock as decrementStockFromDomain,
  ProductId,
  Stock,
} from "./domain";

type Dependencies = {
  eventBus: EventBus<AnyDomainEvent>;
};

const bootstrapStorageApi = ({ eventBus }: Dependencies) => {
  let stock: Stock = {
    "a9a05737-0a30-424c-b3bf-b4445cddd418": 0,
  };

  eventBus.subscribe((event) => {
    if (event.type === "SALES_CLOSED") {
      const productId = event.payload.id;

      stock = decrementStockFromDomain(productId)(1)(stock);

      if (stock[productId] < DANGEROUSLY_LOW_STOCK_LEVEL) {
        eventBus.publish({
          type: "STOCK_HAS_GONE_BELOW_DANGER_LEVEL",
          payload: {
            productId,
            stock: stock[productId],
          },
        });
      }
    }
  });

  const incrementStock =
    (productId: ProductId) =>
    (quantity: number): void => {
      stock = incrementStockFromDomain(productId)(quantity)(stock);
    };

  const computeStock = (productId: ProductId): number => {
    return stock[productId];
  };

  return {
    incrementStock,
    computeStock,
  };
};

export default bootstrapStorageApi;
