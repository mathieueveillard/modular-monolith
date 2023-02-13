export type Event<Type, Payload> = {
  type: Type;
  payload: Payload;
};

export type Subscriber<AnyEvent> = (event: AnyEvent) => void;

export type EventBus<AnyEvent> = {
  subscribe: (subscriber: Subscriber<AnyEvent>) => void;
  publish: (event: AnyEvent) => void;
};

const createEventBus = <AnyEvent>(): EventBus<AnyEvent> => {
  const subscribers: Subscriber<AnyEvent>[] = [];

  const subscribe = (subscriber: Subscriber<AnyEvent>) => {
    subscribers.push(subscriber);
  };

  const publish = (event: AnyEvent) => {
    subscribers.forEach((subscriber) => subscriber(event));
  };

  return {
    subscribe,
    publish,
  };
};

export default createEventBus;
