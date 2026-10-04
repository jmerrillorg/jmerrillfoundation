# Foundation volunteer intake business contract

Status: business routing decided; public form and automated intake not commissioned.

## Accountable review

- Route Foundation volunteer and other Foundation branch inquiries to `foundation@jmerrill.one`.
- Jackie Smith Jr. (he/him) is accountable for Foundation follow-up until another employee is named. This does not require Jackie to restart a flow or manually relay every submission between systems.
- A newly accepted submission requires one Foundation-owned review action visible to the appropriately scoped operator. The initial state means **pending review**, not that the person was contacted, accepted, placed, assessed, or counted as a program participant.
- The reviewer may accept an inquiry for follow-up and record its intended Foundation disposition. Client contact, volunteer placement, assessment, and closure are separate actions with their own evidence.

## Submission and communication boundary

- Capture submitted name and email to respond to the specific inquiry. Use the submitted email, not the Microsoft Forms anonymous responder field, as the contact identity.
- State the response-only purpose beside a new public form and link the Foundation volunteer-inquiry notice at `https://jmerrill.foundation/privacy/volunteer-inquiries`. This is a narrow inquiry notice, not a sitewide privacy policy.
- Marketing permission, if offered, must be separate, optional, and unchecked. No welcome message promising future updates or a fixed response time is authorized by submission alone.
- A reference-only notice may go to the Foundation mailbox. Do not place private inquiry bodies in alert or notification subject lines or operational failure messages.
- Intake is not a program impact event, a donation, a sales Lead by default, or proof of volunteer placement.

## Platform acceptance before public replacement

The enterprise Power Platform owner must prove a durable, idempotent receipt keyed to the form response or submission ID; exactly one Foundation-owned review action; scoped Jackie read/action access and unrelated-domain denial; reference-only mailbox delivery; safe retry, failure alert, and recovery; and rollback preserving accepted records. Use synthetic submissions for this proof. Keep the live email fallback until every gate passes. The stopped `JM1FND - Constituent Intake` flow must not be restarted unchanged, and the unowned `submit-volunteer` Function must not be republished by assumption.

Initial JM1-Core schema readback on 2026-10-04 found `jm1fnd_jm1fndconstituents` for relationship identity and `jm1fnd_volunteers` for volunteer records. Neither was an inquiry receipt. The constituent table has an `jm1fnd_externalid` field but no alternate key; a person may also submit more than one inquiry. OPS subsequently provisioned the Foundation-scoped receipt and review-action tables in PR #286. The restricted reviewer runtime and negative-access proof remain outstanding. Do not grant broad `jm1_executionlog` read access as a substitute.

## Source-controlled adapter contract

The Foundation website adapter is default-off. It targets the OPS-selected `jm1fnd_volunteerinquiry` table (`jm1fnd_volunteerinquiries` entity set) in `JM1FoundationCore`. OPS provisioned the unique alternate key on `jm1fnd_submissionid` (GUID text) and the adapter columns in PR #286: `jm1fnd_name` (primary name), `jm1fnd_fullname`, `jm1fnd_email`, `jm1fnd_interest`, `jm1fnd_message`, `jm1fnd_responseconsent`, `jm1fnd_consenttextversion`, `jm1fnd_marketingoptin`, `jm1fnd_privacynoticeurl`, `jm1fnd_acceptedutc`, `jm1fnd_payloadhash`, `jm1fnd_reviewstate`, and `jm1fnd_source`. Records are owned by the Foundation review team. The server uses create-only POST with the unique submission key; on a 412 key conflict, it reads only the existing Foundation receipt hash to prove an exact replay. Its managed identity has table-scoped Create and Read, not Update/Delete, with negative proof against other brands. The review action and reference-only mailbox notice remain OPS-owned platform components, not website side effects.

Public enablement requires runtime settings `FOUNDATION_INTAKE_ENABLED=true`, `FOUNDATION_DATAVERSE_URL=https://jm1hq.crm.dynamics.com`, `FOUNDATION_REVIEW_TEAM_ID`, and `FOUNDATION_PRIVACY_NOTICE_URL`, plus an App Service system-assigned identity. The notice is live at `https://jmerrill.foundation/privacy/volunteer-inquiries`, and the production URL setting points there; the public feature flag remains false. The table/team/app identity and actual-adapter synthetic receipt/replay are proven in OPS PR #286 and Foundation PR #18. Do not enable until the restricted reviewer action, reference-only mailbox notice, negative access, and failure/recovery path are proven.

Customer Voice review governance and iATS donation receipts/reconciliation remain separate workstreams. No synthetic inquiry should be treated as a real constituent follow-up or program impact.
