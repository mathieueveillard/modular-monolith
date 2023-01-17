import { Event } from "../../utils/EventBus";

type ProductId = string;

type Money<Currency> = {
  value: number;
  currency: Currency;
};

export type Product = {
  id: ProductId;
  price: Money<"EUR">;
};

export type SalesClosedEvent = Event<"SALES_CLOSED", Product>;
