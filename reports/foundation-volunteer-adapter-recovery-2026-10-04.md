# Foundation volunteer adapter recovery readback

Observed: 2026-10-04. Status: **adapter recovered; public intake held**.

## Release authority

- Foundation PR #18 merged as `d790c4beca39bd6b46a4c1535cf48eb2cfd0f0a6`. The protected PR validation and production deployment passed typecheck, lint, human-first tests, seven focused receipt tests, build, packaging, and the release-SHA health probe.
- `https://jmerrill.foundation/api/health` returned `ready` and the same SHA. `https://jmerrill.foundation/privacy/volunteer-inquiries` returned 200. The approved response-only collection scope includes a separate unchecked optional updates choice. The production notice URL setting now points to that page; `FOUNDATION_INTAKE_ENABLED` remains `false` after setting readback and a fresh health probe.
- The production volunteer page still exposed the `Email the Foundation` fallback and no public form. Public `POST /api/volunteer-intake` returned 503. The stopped legacy Forms flow was not restarted.

## Bounded actual-adapter proof

The deployed App Service container ran a second Foundation server bound only to `127.0.0.1:18765`, with intake enabled in that process alone and the new notice URL supplied. This exercised the deployed `/api/volunteer-intake` route and the App Service managed identity without changing the public process or feature flag. The process was stopped after the test; localhost health no longer connected.

- A synthetic `example.invalid` volunteer inquiry using submission ID `73d47e87-5661-49b3-9f35-66f9e1bd40fb` returned 202, that reference, and `idempotentReplay: false`.
- An identical repeat returned 202, the same reference, and `idempotentReplay: true`. The unique key and exact stored-hash read prevented a second receipt.
- A changed-payload repeat returned 409, not a false acknowledgement.
- A request without an allowed Origin returned 403. After the private test, public POST still returned 503.

This proves deployed adapter create and replay behavior with the actual workload identity. It does not prove the reviewer action, a notice, an alert, or recovery from a downstream failure. No real volunteer, marketing message, donation, or impact count was created. The synthetic record must remain identifiable as certification evidence and follow governed disposition.

## Remaining commissioning gates

1. OPS must prove a restricted human reviewer can inspect the Foundation receipt and complete an append-only governed action without relying on Jackie's existing System Administrator role or reading another business domain.
2. OPS must prove a reference-only notice to `foundation@jmerrill.one`, bounded retry, a system-owned failure signal/alert, and recoverable failure state. The website adapter does not send notifications.
3. The full synthetic reviewer, notice, negative-access, and failure/recovery path must pass before `FOUNDATION_INTAKE_ENABLED` is set true. Keep the email fallback and old Forms flow stopped.

`FOUNDATION_ADAPTER_RECEIPT=PASS`

`FOUNDATION_ADAPTER_REPLAY=PASS`

`FOUNDATION_PUBLIC_INTAKE=OFF`

`FOUNDATION_REVIEW_ACTION_RUNTIME=NOT_COMMISSIONED`

`FOUNDATION_REFERENCE_NOTIFICATION=NOT_COMMISSIONED`

`FOUNDATION_FAILURE_RECOVERY=NOT_PROVEN`

`FOUNDATION_VOLUNTEER_COMMISSIONING=PARTIAL`
