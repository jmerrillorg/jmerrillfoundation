# J Merrill Foundation, Inc.: Thanksgiving 2026

Approved allocation: 60. Pickup: Friday, November 20, 2026, 4–7 p.m. Eastern, 434 Hillpine Dr., Columbus, OH 43207.
One box per household; no other eligibility restrictions. Separate local registration; no second BSF form.

## Launch gate
Registration defaults closed. Provision an organization-owned private Azure Blob container `thanksgiving-2026`, initialize `reservations.json` once with event `foundation-thanksgiving-2026`, capacity 60, and an empty reservations array. Grant only the owning website managed identity data access to this container. No public blob access. Never reset a live ledger. Configure THANKSGIVING_LEDGER_URL and enable THANKSGIVING_REGISTRATION_ENABLED only after private read/write, concurrent final-slot, duplicate, replay, and rendered live form checks pass.

Reservation and capacity are committed together using an ETag conditional write. Missing, invalid, inaccessible storage fails closed. Success shows a printable reference; no email delivery is promised by this implementation. Household matching normalizes case and punctuation, includes unit and ZIP, and cannot detect all alternate spellings; operator review remains necessary. Each organization maintains its own roster; no cross-entity personal information sharing is introduced.

No announcement should invite registrations before the live reservation flow passes acceptance.
