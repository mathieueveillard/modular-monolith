import { AnyDomainEvent } from "./events";
import bootstrapSalesContext from "./Sales";
import bootstrapStorageContext from "./Storage";
import EventBus from "./utils/EventBus";

describe("Integration test", () => {
  test("Contexts should be able to communicate through business events", () => {
    // GIVEN
    const eventBus = new EventBus<AnyDomainEvent>();
    const { sell } = bootstrapSalesContext({ eventBus });
    const { incrementStock, computeStock } = bootstrapStorageContext({ eventBus });
    const productId = "a9a05737-0a30-424c-b3bf-b4445cddd418";
    incrementStock(productId)(10);

    // WHEN
    sell(productId);

    // THEN
    expect(computeStock(productId)).toEqual(9);
  });
});
