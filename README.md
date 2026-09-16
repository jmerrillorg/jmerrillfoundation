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
| `/volunteer` | Microsoft Forms volunteer and constituent interest entry |
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

`/volunteer` embeds the current Microsoft Forms interest form. This remains a business-continuity path and is not migrated by this repository authority package.

## Donation Boundary

`/donate` links to the current external secure payment portal. Direct Stripe, Business Central, Dataverse donation posting, and financial migration work are outside this repository authority package.

## Legacy SWA Boundary

`.github/workflows/azure-static-web-apps.yml` is rollback-only legacy infrastructure. Do not use it for normal production deployment. Static Web Apps resource/token review belongs to the enterprise `JM1-INFRA-RETIRE-001` retirement inventory.

The `org-to-foundation-redirect` Static Web App is a separate intentional alternate-domain redirect resource for `jmerrill.org`; it is not a Foundation-domain retirement candidate merely because it redirects to `jmerrill.foundation`.

## Brand Notes

Current visual tokens live in application CSS/source. Approved enterprise email brand-token authority is not established by this README and remains governed by `JM1-COMMS-001`.
