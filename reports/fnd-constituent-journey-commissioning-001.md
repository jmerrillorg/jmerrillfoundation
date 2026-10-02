# Foundation Constituent Journey Commissioning 001

Readback date: 2026-10-02. Repository: `jmerrillorg/jmerrillfoundation`.
This is a production commissioning readback, not a transfer of Power Platform or
financial authority into this repository. Synthetic records are test evidence,
not constituents to contact, quote, publish, or count in impact reporting.

## Proven

- `jmerrill.foundation/share-your-experience` is the Foundation feedback entry.
  The Program/Volunteer path opens the published Customer Voice survey; the
  footer links to the entry page. Donor, participant, and sponsor surveys remain
  phased and separate.
- The production Customer Voice environment is `JM1-Core`
  (`https://jm1hq.crm.dynamics.com/`). Project
  `87409139-b99d-4d2a-a40c-de4ca108faaf` contains survey
  `0ae75320-cc96-f111-8076-7c1e525b15c2`.
- A synthetic Program/Volunteer response was accepted by the public survey on
  2026-10-02 and persisted as `msfp_surveyresponses` record
  `e0efcee8-5bbe-f111-aaaf-7c1e525b15c2`, correlated to the survey above,
  with nine `msfp_questionresponses` children. The public confirmation page
  showed successful submission. This proves receipt on screen and storage, not
  respondent email delivery or Foundation reviewer workflow.
- The live volunteer Microsoft Forms intake accepted a synthetic inquiry and
  displayed its thank-you message. Form ID:
  `XgctNReOaUGfjiLmlGzmbWLYUJckILxClwf4SzJd-xlUQktYVVZWRjg0SFc0RjNSWVVJOUMzNVZCNi4u`.
  The active `JM1FND - Constituent Intake` flow is
  `ef633948-a52e-f111-88b4-000d3a9eacee`. A matching constituent record or
  successful flow run was not found in the readback, so end-to-end intake is
  unproven. The public form also warns that its owner supplied no privacy
  statement.
- `/donate` links to the live iATS payment entry. No payment was submitted.
  iATS remains the current payment authority; receipt and reconciliation
  operations require provider/finance readback before certification.
- The consent question in the survey is independent of submission. A test
  response selected no testimonial permission. Feedback is not publication
  consent, including for donor identities or participant stories.
- Local Node 24 typecheck, lint (two existing image warnings, zero errors),
  human-first tests, and production build passed. Full dependency audit after
  compatible updates found zero advisories. GitHub Dependabot alerts and
  security-fix PRs were enabled without auto-merge.

## Platform gates

| Area | Current proof | Required owner/action |
| --- | --- | --- |
| Customer Voice reviewer | Current read access used an interactive System Administrator. No Foundation-scoped reviewer group/role or negative-access test is proven. | `jm1-ops`: least-privilege role, child-record read, unrelated-domain denial, nonproduction proof. |
| Customer Voice retention | Three years from response submission is the Foundation business contract; no enforced parent/child retention policy was proven. | `jm1-ops`: retention/hold/disposition mechanism and audit proof. |
| DLP | `pac admin dlp-policy list` returned no policy. | `jm1-ops`: tenant/environment DLP design and connector validation. |
| Customer Voice ALM | Live project/survey/Dataverse IDs are known; an owning solution and service identity were not established. | `jm1-ops`: exact solution, publisher, identity, and publication boundary. |
| Feedback failure handling | Public success screen and Dataverse storage are proven. A Foundation-owned exception signal, review state, and respondent delivery state are not. | `jm1-ops` and Foundation business owner: native Customer Voice/Power Automate handling, then failure test. |
| Volunteer intake | The public form accepted a test, but no matching Dataverse constituent or flow-run proof was found. The flow's error scope covers confirmation-email failure, not all preceding steps. | `jm1-ops`: trace Forms webhook, record creation, receipt, review/follow-up, and failures; Foundation owner supplies form privacy notice. |
| Donation operations | Provider handoff is reachable, but receipt, failed-payment handling, return state, accounting reconciliation, and system-of-record mapping are not proven. | Foundation finance owner and enterprise financial authority: provider/accounting readback without a test charge. |

Do not remove emergency administrator access until replacement reviewer access
passes both positive and negative tests. Do not treat the three-year business
requirement as an already enforced platform policy.

## Constituent execution map

| Audience | Entry | Current authority / mode | Follow-up and human gate | Failure signal |
| --- | --- | --- | --- | --- |
| Donor | `/donate` to iATS | iATS payment; accounting/CRM handoff unresolved | Stewardship and restricted-gift decisions require Foundation judgment | Provider/finance path unverified |
| Volunteer | `/volunteer` to Microsoft Forms | Forms intake and active Power Automate flow intended for Foundation Dataverse constituent | Staff review/placement is a human decision; automation completion unproven | Flow exception coverage incomplete/unproven |
| Program participant | Foundation program relationship | Separate program record/owner not certified by this website | Program care and safeguarding remain human-gated | Unresolved |
| Feedback respondent | `/share-your-experience` to Customer Voice | Program/Volunteer survey and Dataverse parent/child response records | Foundation-scoped review/disposition role not yet proven | Native exception/review signal unproven |
| Sponsor | Foundation partnership contact | Sponsor system of record not certified by this website; survey phased | Relationship, recognition, and publication need business approval | Unresolved |

No eligible current real case was safely identified for progression in this
pass. The synthetic submissions are not substitutes for a real outcome.

## Release and workspace boundary

This change adds PR validation, typecheck/lint/tests before deployment, and a
deployment health probe that compares `/api/health.release_sha` with the exact
GitHub release SHA. The disabled Foundation Static Web Apps workflow is retired;
no Foundation Static Web Apps resource appeared in the two accessible Azure
subscriptions. The `org-to-foundation-redirect` resource is separate and stays.

Canonical local `main` was fast-forwarded to remote before this work. The
`foundation-constituent-journey` worktree is active. `node24-foundation` is a
clean merged historical worktree; the two August Foundation human-first
worktrees are clean historical/superseded checkouts. The dirty Documents
checkout at `ed2af66` is historical evidence with FND-01 artifacts and must
remain untouched pending provenance-preserving archival. No worktree was
deleted.
