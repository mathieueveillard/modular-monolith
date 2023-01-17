import { SalesClosedEvent } from "./Sales/domain";
import { LowStockEvent } from "./Storage/domain";

export type AnyDomainEvent = SalesClosedEvent | LowStockEvent;
