# SWA Retirement Readback

## Repository workflow

The legacy Azure Static Web Apps workflow remains manual, rollback-only, and references AZURE_STATIC_WEB_APPS_API_TOKEN. It uses Node 18 and older action versions. It is not the canonical production deployment path.

## Observable resources

Azure readback identified org-to-foundation-redirect in resource group jm1-core-services, backed by the separate jmerrillorg/org-to-foundation-redirect repository. It provides intentional jmerrill.org redirect authority and is not a retirement candidate.

No Foundation-named Static Web App resource was established by the available subscription readback. The token-to-resource binding and actual rollback value remain unresolved.

App Service replacement proof is complete: app-jm1-foundation-prod-v2 is running on Node 24 LTS and production release SHA matches main.

SWA_RETIREMENT_READINESS = READY_FOR_ENTERPRISE_REVIEW / NOT_AUTHORIZED_FOR_RETIREMENT

Actual workflow, token, or resource retirement remains under JM1-INFRA-RETIRE-001.
