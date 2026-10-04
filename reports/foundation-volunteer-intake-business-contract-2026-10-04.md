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

Customer Voice review governance and iATS donation receipts/reconciliation remain separate workstreams. No synthetic inquiry should be treated as a real constituent follow-up or program impact.
