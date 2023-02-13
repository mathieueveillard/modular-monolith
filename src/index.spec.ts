import { AnyDomainEvent } from "./events";
import bootstrapSalesApi from "./Sales";
import bootstrapStorageApi from "./Storage";
import createEventBus from "./utils/EventBus";

describe("Integration test", () => {
  test("Contexts should be able to communicate through business events", () => {
    // GIVEN
    const eventBus = createEventBus<AnyDomainEvent>();
    const { sell } = bootstrapSalesApi({ eventBus });
    const { incrementStock, computeStock } = bootstrapStorageApi({ eventBus });
    const productId = "a9a05737-0a30-424c-b3bf-b4445cddd418";
    incrementStock(productId)(10);

    // WHEN
    sell(productId);

    // THEN
    expect(computeStock(productId)).toEqual(9);
  });
});
