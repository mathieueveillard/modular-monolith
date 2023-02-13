import createEventBus, { Event } from ".";

describe("Test of EventBus", () => {
  test("One single subscriber", () => {
    // GIVEN
    const bus = createEventBus();
    const subscriber = jest.fn();
    bus.subscribe(subscriber);

    // WHEN
    const event: Event<"SOMETHING_HAPPEND", {}> = {
      type: "SOMETHING_HAPPEND",
      payload: {},
    };
    bus.publish(event);

    // THEN
    expect(subscriber).toHaveBeenCalledWith(event);
  });

  test("Many subscribers", () => {
    // GIVEN
    const bus = createEventBus();

    const subscriber1 = jest.fn();
    bus.subscribe(subscriber1);

    const subscriber2 = jest.fn();
    bus.subscribe(subscriber2);

    // WHEN
    const event: Event<"SOMETHING_HAPPEND", {}> = {
      type: "SOMETHING_HAPPEND",
      payload: {},
    };
    bus.publish(event);

    // THEN
    expect(subscriber1).toHaveBeenCalledWith(event);
    expect(subscriber2).toHaveBeenCalledWith(event);
  });
});
