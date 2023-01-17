export type Event<Type, Payload> = {
  type: Type;
  payload: Payload;
};

export type Subscriber<AnyEvent> = (event: AnyEvent) => void;

class EventBus<AnyEvent> {
  private subscribers: Subscriber<AnyEvent>[] = [];

  subscribe(subscriber: Subscriber<AnyEvent>): void {
    this.subscribers.push(subscriber);
  }

  publish(event: AnyEvent): void {
    this.subscribers.forEach((subscriber) => subscriber(event));
  }
}

export default EventBus;
