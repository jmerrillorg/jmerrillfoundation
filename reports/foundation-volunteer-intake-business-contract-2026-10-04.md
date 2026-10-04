# Foundation volunteer intake business contract

Status: business routing decided; public form and automated intake not commissioned.

## Accountable review

- Route Foundation volunteer and other Foundation branch inquiries to `foundation@jmerrill.one`.
- Jackie Smith Jr. (he/him) is accountable for Foundation follow-up until another employee is named. This does not require Jackie to restart a flow or manually relay every submission between systems.
- A newly accepted submission requires one Foundation-owned review action visible to the appropriately scoped operator. The initial state means **pending review**, not that the person was contacted, accepted, placed, assessed, or counted as a program participant.
- The reviewer may accept an inquiry for follow-up and record its intended Foundation disposition. Client contact, volunteer placement, assessment, and closure are separate actions with their own evidence.

## Submission and communication boundary

- Capture submitted name and email to respond to the specific inquiry. Use the submitted email, not the Microsoft Forms anonymous responder field, as the contact identity.
- State the response-only purpose beside a new public form and link the approved Foundation privacy notice. The canonical website currently has no `/privacy` route; the approved notice location must be supplied and verified before form publication.
- Marketing permission, if offered, must be separate, optional, and unchecked. No welcome message promising future updates or a fixed response time is authorized by submission alone.
- A reference-only notice may go to the Foundation mailbox. Do not place private inquiry bodies in alert or notification subject lines or operational failure messages.
- Intake is not a program impact event, a donation, a sales Lead by default, or proof of volunteer placement.

## Platform acceptance before public replacement

The enterprise Power Platform owner must prove a durable, idempotent receipt keyed to the form response or submission ID; exactly one Foundation-owned review action; scoped Jackie read/action access and unrelated-domain denial; reference-only mailbox delivery; safe retry, failure alert, and recovery; and rollback preserving accepted records. Use synthetic submissions for this proof. Keep the live email fallback until every gate passes. The stopped `JM1FND - Constituent Intake` flow must not be restarted unchanged, and the unowned `submit-volunteer` Function must not be republished by assumption.

JM1-Core schema readback on 2026-10-04 found `jm1fnd_jm1fndconstituents` for relationship identity and `jm1fnd_volunteers` for volunteer records. Neither is a commissioned inquiry receipt. The constituent table has an `jm1fnd_externalid` field but no alternate key; a person may also submit more than one inquiry. No Foundation-specific receipt/reviewer app ID is established. OPS must select and provision a Foundation-scoped receipt and review surface inside the governed solution, then return their exact IDs for scoped role and negative-access proof. Do not grant broad `jm1_executionlog` read access as a substitute.

## Source-controlled adapter contract

The Foundation website adapter is default-off. It targets the OPS-selected `jm1fnd_volunteerinquiry` table (`jm1fnd_volunteerinquiries` entity set) in `JM1FoundationCore`. OPS must create a unique alternate key on `jm1fnd_submissionid` (GUID text) and the following columns before enabling the adapter: `jm1fnd_name` (primary name), `jm1fnd_fullname`, `jm1fnd_email`, `jm1fnd_interest`, `jm1fnd_message`, `jm1fnd_responseconsent`, `jm1fnd_consenttextversion`, `jm1fnd_marketingoptin`, `jm1fnd_privacynoticeurl`, `jm1fnd_acceptedutc`, `jm1fnd_payloadhash`, `jm1fnd_reviewstate`, and `jm1fnd_source`. Records are owned by the Foundation review team. The server uses create-only upsert and reads only the existing Foundation receipt hash on an alternate-key conflict to prove an exact replay. Its managed identity therefore needs table-scoped Create and Read, not Update/Delete, with negative proof against other brands. The review action and reference-only mailbox notice remain OPS-owned platform components, not website side effects.

Public enablement requires runtime settings `FOUNDATION_INTAKE_ENABLED=true`, `FOUNDATION_DATAVERSE_URL=https://jm1hq.crm.dynamics.com`, `FOUNDATION_REVIEW_TEAM_ID`, and `FOUNDATION_PRIVACY_NOTICE_URL`, plus an App Service system-assigned identity. The privacy notice must be publicly accessible and approved; no notice was found in the canonical website on 2026-10-04. Do not enable until OPS returns the table/team/app identity IDs and the full synthetic receipt, owner-action, mailbox, replay, and recovery proof.

Customer Voice review governance and iATS donation receipts/reconciliation remain separate workstreams. No synthetic inquiry should be treated as a real constituent follow-up or program impact.
