import { AnyDomainEvent } from "../events";
import { ProductId } from "../Storage/domain";
import { EventBus } from "../utils/EventBus";
import { Product } from "./domain";

const CATALOG: Record<ProductId, Product> = {
  "a9a05737-0a30-424c-b3bf-b4445cddd418": {
    id: "a9a05737-0a30-424c-b3bf-b4445cddd418",
    price: {
      value: 1900,
      currency: "EUR",
    },
  },
};

type Dependencies = {
  eventBus: EventBus<AnyDomainEvent>;
};

const bootstrapSalesApi = ({ eventBus }: Dependencies) => {
  const sell = (productId: ProductId): void => {
    // Do something
    eventBus.publish({
      type: "SALES_CLOSED",
      payload: CATALOG[productId],
    });
  };

  return {
    sell,
  };
};

export default bootstrapSalesApi;
