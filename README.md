# modular-monolith

This repository demonstrates the communication of bounded contexts via business events within a modular monolith. This pattern enforces reactive implementations.

The business case is simple, if not standard:

- Sales call the `sell(productId)` API when they close a deal;
- Anytime, the Supply is informed of the current stock by calling the `computeStock(productId)` API.

Please refer to `src/index.spec.ts` as an entry point.
