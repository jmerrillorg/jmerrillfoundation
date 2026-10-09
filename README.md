# jmerrill.foundation — Production Authority

**Project:** J Merrill Foundation Inc. Website
**Canonical public experience:** https://jmerrill.foundation
**Alternate nonprofit domain:** https://jmerrill.org
**Alternate-domain purpose:** intentional nonprofit-domain presence and defensive brand ownership
**Expected alternate behavior:** `jmerrill.org` resolves or redirects to the canonical Foundation experience
**Production host:** Azure App Service `app-jm1-foundation-prod-v2`
**Runtime:** Node 24 LTS · Next.js 16 · React 19
**Deployment authority:** GitHub Actions OIDC → Azure App Service production environment
**Repository:** github.com/jmerrillorg/jmerrillfoundation

This repository owns the Foundation public website application source, route implementation, static assets, and app-specific deployment workflow. Enterprise Microsoft platform authority remains outside this repository.

`jmerrill.org` is not stale, retired, or an authority conflict. Application metadata should identify `jmerrill.foundation` as the canonical public experience, while `jmerrill.org` remains a legitimate Foundation-owned alternate nonprofit domain.

## Current Public Routes

| Route | Purpose |
|---|---|
| `/` | Foundation homepage |
| `/about` | Foundation story and mission context |
| `/programs` | Program hub |
| `/impact` | Public impact narrative |
| `/board` | Board recruitment |
| `/volunteer` | Foundation volunteer opportunities and contact entry |
| `/share-your-experience` | Customer Voice feedback entry |
| `/donate` | Public donation information and external payment link |
| `/story-hour` | Story Hour program page |
| `/classroom-author` | Classroom Author Project page |
| `/our-libraries` | Reading Stations page |
| `/api/health` | Safe production readback |

## Local Development

Use Node 24. The repository declares the supported runtime in `package.json`.

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

Validate before release:

```bash
pnpm exec tsc --noEmit
pnpm lint
pnpm test:human-first
pnpm build
pnpm package:appservice
```

## Production Deployment

The canonical deployment path is `.github/workflows/azure-app-service-premium.yml`.

Production deploys from `main` through GitHub Actions using Azure OIDC. The workflow builds the Next.js standalone output, packages it for App Service, deploys to `app-jm1-foundation-prod-v2`, and probes `https://jmerrill.foundation/api/health`.

The production health response must expose only safe readback fields:

- `service`
- `environment`
- `health`
- `release_sha`
- `runtime`

`release_sha` is populated from `JM1_RELEASE_SHA` during deployment.

## Customer Voice Boundary

`/share-your-experience` is the Foundation-owned public entry point for feedback. Customer Voice platform configuration, response storage, Dataverse integration, access controls, privacy boundaries, and ALM are enterprise Microsoft platform responsibilities.

The Phase 1 program/volunteer survey uses `NEXT_PUBLIC_CUSTOMER_VOICE_FOUNDATION_PROGRAM_URL` when configured. The current source includes the commissioned public fallback URL so the entry point remains available if the app setting is absent.

## Volunteer Intake Boundary

`/volunteer` directs interest to the Foundation mailbox while the Microsoft Forms intake flow is stopped. Mailbox delivery is a continuity path, not a commissioned durable constituent receipt or follow-up workflow. Do not restore the embed until the enterprise Power Platform owner proves identity, consent, routing, failure handling, and an end-to-end synthetic submission.

The source-controlled volunteer form and `/api/volunteer-intake` adapter are off by default. They use an App Service managed identity to create a Foundation-only Dataverse receipt, not the retired Forms flow or orphan Function. The exact table fields and release gates are in `reports/foundation-volunteer-intake-business-contract-2026-10-04.md`. Both `FOUNDATION_INTAKE_ENABLED` and `FOUNDATION_RELAY_ENABLED` must be `true` for the form and API to operate. The second gate requires a fixed Foundation-only reference notice through the JM1 relay; a saved receipt with a failed notice is returned as a retryable failure with its reference. Keep both gates off until the privacy notice, Foundation receipt/table key, review team, scoped identity, relay caller grant, durable notice recovery, mailbox readback, replay, scoped reviewer journey, and synthetic end-to-end proof are all commissioned. The email fallback stays visible after activation.

The notice recovery worker runs only when `FOUNDATION_NOTICE_RECONCILE_ENABLED=true`, `FOUNDATION_RELAY_ENABLED=true`, and `FOUNDATION_NOTICE_RECONCILE_AFTER_UTC` is a valid ISO timestamp. It rescans Foundation-team `PENDING_REVIEW` receipts accepted since that cutoff and asks the JM1 relay for the exact same reference-keyed notice. Dataverse receipts and the relay's idempotent ledger are the durable work and send authorities; the worker's in-memory accepted-reference set only avoids repeated calls during one process lifetime. A failed or stale worker degrades `/api/health`, which is the existing App Service health-check path and 5xx alert input. This worker may run while public intake stays off.

The pending-review age signal is a separate, default-off internal monitor. It requires `FOUNDATION_REVIEW_AGE_SIGNAL_ENABLED=true`, an explicit `FOUNDATION_REVIEW_AGE_POLICY_ID`, its own `FOUNDATION_REVIEW_AGE_AFTER_UTC` cohort start, a positive `FOUNDATION_REVIEW_AGE_THRESHOLD_MINUTES`, and `FOUNDATION_REVIEW_AGE_EXCLUDE_SUBMISSIONS` (a comma-separated synthetic submission ID list, or `none` only when no matching synthetic receipt exists). It reads only Foundation-team volunteer receipt IDs, source, review state, and acceptance time after that start. Every sweep emits `FND_REVIEW_AGE_SIGNAL` with `status` and `agedCount` only; failure emits a bounded reason code. `/api/health.review_age_signal` reports disabled, starting, clear, aged, failed, or stale without making the public website unhealthy for a business wait. No respondent content or record reference belongs in the signal. A production alert is **not** commissioned by enabling this code alone: Azure log ingestion, an aged/failed rule, a missing-heartbeat rule, the available-human receiver, and delivered-alert/recovery proof must be validated separately. The threshold is internal routing telemetry, not a promised response time or authorization to contact or place a volunteer.

## Donation Boundary

`/donate` links to the current external secure payment portal. Direct Stripe, Business Central, Dataverse donation posting, and financial migration work are outside this repository authority package.

## Legacy SWA Boundary

The former Foundation Static Web Apps deployment workflow is retired. The production Next.js standalone build deploys only to App Service; no Foundation Static Web Apps resource exists in the accessible JM1 subscriptions. An App Service rollback procedure requires separate proof before it can be treated as commissioned.

The `org-to-foundation-redirect` Static Web App is a separate intentional alternate-domain redirect resource for `jmerrill.org`; it is not a Foundation-domain retirement candidate merely because it redirects to `jmerrill.foundation`.

## Brand Notes

Current visual tokens live in application CSS/source. Approved enterprise email brand-token authority is not established by this README and remains governed by `JM1-COMMS-001`.
