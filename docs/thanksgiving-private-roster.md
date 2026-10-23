# Thanksgiving private roster and later operations

## Read-only release gate

The roster at `/admin/thanksgiving` reads the existing private `thanksgiving-2026/reservations.json` ledger through the website managed identity. The API is disabled until `THANKSGIVING_ROSTER_ENABLED=true` and three exact settings are present: `THANKSGIVING_ROSTER_TENANT_ID`, `THANKSGIVING_ROSTER_CLIENT_ID`, and `THANKSGIVING_ROSTER_REVIEWER_OID`. Only the approved Jackie administrator object ID is accepted. The API independently verifies the Microsoft ID-token signature, audience, tenant, issuer, expiry, and object ID. It does not trust a caller-supplied identity header alone. No new blob grant is needed for the website or Jackie.

Production needs a **Foundation-specific single-tenant Microsoft Entra web app registration** with callback `https://jmerrill.foundation/.auth/login/aad/callback`, no Graph/API permissions, and App Service Authentication enabled with Microsoft Entra as the provider, anonymous access retained for the public site, token store enabled, and the sign-in credential held in the approved platform secret store (or a supported managed-identity federation). The registration and host settings must be approved and verified before enabling the roster flag. Do not reuse another brand's registration. An anonymous request and an authenticated non-reviewer must receive no household data; Jackie must complete the sign-in and view the live ledger. Keep the roster out of navigation and search indexing. The response is private and no-store.

## Future write workflow: separate authorization required

The current ledger records acceptance only. There is no pickup state, so the roster must not label any household collected. If check-in and cancellation are approved later, add an append-only operations log with actor object ID, timestamp, reservation reference, action, prior/new state, reason for reversal, and request id. Keep household contact/address out of routine logs. Require Jackie or a separately approved Foundation operator role; do not give the public website or generic tenant users write access.

Minimum operations:

1. `check_in(reference, requestId)`: accept only an active reservation; repeated same request is idempotent, different duplicate attempts report already checked in; record actual pickup timestamp and operator.
2. `undo_check_in(reference, requestId, reason)`: require reason and an existing check-in; append a compensating event rather than deleting history.
3. `cancel(reference, requestId, reason)`: require an active, not-collected reservation and reason; append cancellation and restore one available box exactly once. A collected reservation needs an approved exception path, not automatic capacity restoration.

Use a single versioned ledger or transaction boundary with conditional ETag writes and bounded retry/re-read, so two operators cannot check in/cancel the same reservation twice or oversell a restored slot. Keep the household-key uniqueness rule for active reservations and define whether a cancelled household may re-register before enabling cancellation. Expose no mutation route under the read-only approval. Verify concurrent and replay behavior with fixtures, then human-review the operational list before any production grant.

## Failed-reservation recovery gap

The enabled Foundation App Service HTTP 5xx alert routes through `ag-jm1-web-infra006-ops` to `jm1-admin@jmerrill.one`. This is a host-level failure signal, not a durable per-attempt reservation exception queue; it does not by itself identify a failed household or prove operator receipt/follow-through. A future privacy-safe exception signal should include timestamp, route, error category, and a random correlation ID only, with a private, access-controlled reconciliation path if a household needs contact. Authorize a recipient and notification mechanism separately before transmitting any household details. Jackie remains the sole reviewer; no backup assignment is implied.
