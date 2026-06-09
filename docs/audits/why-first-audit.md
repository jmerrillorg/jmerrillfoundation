# Why-First Website Audit — jmerrill.org

Repository: `jmerrillorg/jmerrillfoundation`  
Branch: `codex/why-first-audit-jmerrill-org`  
Audit phase: Phase 1 — audit only  
Date: 2026-06-09  

## 1. Executive Summary

J Merrill Foundation already has a strong Why-First foundation. The site clearly centers literacy as a broad human mission, gives visitors concrete proof points, and repeatedly ties programs back to dignity, authorship, community, and access. The strongest pages are the homepage, Impact, Classroom Author Project, Story Hour Library, and Volunteer because they answer why the organization exists before asking the visitor to act.

The main cleanup opportunity is not a lack of mission. It is sequencing. Several pages move too quickly from visitor-facing purpose into internal JM1 architecture, enterprise technology, Microsoft stack language, Dataverse, governance dashboards, or operating-layer phrasing. Those details may be useful for grants, board recruitment, or internal credibility, but on public pages they can make a donor, parent, educator, volunteer, or community member decode the organization before feeling invited into the mission.

The second issue is date and goal consistency. The same program milestones appear with conflicting years across pages: Community Table goals reference 2025 in some places and 2026 in others; Story Hour is described as launching in 2025 while other pages describe a 2026 relaunch; the homepage references Thanksgiving 2025 and 2026 while Programs references 2024 and 2025. Before Phase 2 copy cleanup, Jackie should decide the canonical public timeline.

The third issue is CTA precision. Many different intents route to `/volunteer` or the same Microsoft Forms intake: volunteering, board application, school partnership inquiry, station request, youth author interest, ESL instructor interest, and Story Hour reader signup. That is acceptable for a simple operational setup, but helper text should make the next step feel intentional rather than generic.

Recommended Phase 2 scope: keep the visual identity and layout intact; update metadata, hero/supporting copy, internal-system phrasing, CTA helper text, and timeline consistency. Do not change payment, forms, integrations, navigation structure, pricing/giving tiers, or claims without approval.

## 2. Page Inventory

| Page | Route | Source | Primary Visitor Intent |
| --- | --- | --- | --- |
| Home | `/` | `src/app/page.tsx` | Understand mission, proof, programs, and next steps |
| About | `/about` | `src/app/about/page.tsx` | Learn origin, leadership, trust posture, and organizational context |
| Programs | `/programs` | `src/app/programs/page.tsx` | Compare active, reactivating, and planned programs |
| Impact | `/impact` | `src/app/impact/page.tsx` | See evidence that the Foundation has done real work |
| Board | `/board` | `src/app/board/page.tsx` | Consider joining governance |
| Volunteer | `/volunteer` | `src/app/volunteer/page.tsx` | Find a role and submit interest |
| Donate | `/donate` | `src/app/donate/page.tsx` | Understand why to give, where gifts go, and donate |
| Story Hour Library | `/story-hour` | `src/app/story-hour/page.tsx` | Understand free digital reading access and reader participation |
| Classroom Author Project | `/classroom-author` | `src/app/classroom-author/page.tsx` | Understand the school/student publishing program |
| Reading Stations | `/our-libraries` | `src/app/our-libraries/page.tsx` | Find and support Little Free Library stations |
| Navigation | global | `src/components/Navigation.tsx` | Move across programs, impact, about, board, and donation |
| Footer | global | `src/components/Footer.tsx` | Confirm identity, contact, program links, and JM1 ecosystem links |
| Root metadata | global | `src/app/layout.tsx` | Site-level title, description, Open Graph, and search posture |

## 3. Page-by-Page Doctrine Review

### Home — `/`

Scores:

| Metric | Score |
| --- | ---: |
| Why-First Alignment | 9 |
| Primary Audience Clarity | 8 |
| Trust / Credibility | 8 |
| CTA Clarity | 8 |

What aligns well:

- The hero leads with a human literacy philosophy, not a service list.
- The mission strip clearly states why the Foundation exists.
- Impact stats, the Chillicothe proof point, and Reading Station details establish trust without requiring the visitor to know JM1.
- CTAs give two understandable paths: get involved or see impact.

Doctrine gaps:

- Program cards include phrases such as "enterprise nonprofit technology stack" and "Microsoft-powered" before the visitor necessarily knows why that matters.
- "Signature Proof of Model" is credible for internal strategy but slightly system-first for public visitors.
- Homepage dates should be reconciled with Programs and Impact. The homepage says Thanksgiving 2025 is 75 families and 2026 goal is 150; Programs says 2024 served 75 and 2025 goal is 150.

Recommended cleanup:

- Keep the hero and mission language mostly intact.
- Reframe technology details as access, support, and reliability unless the section is specifically for board/grant credibility.
- Normalize the public program timeline.

### About — `/about`

Scores:

| Metric | Score |
| --- | ---: |
| Why-First Alignment | 7 |
| Primary Audience Clarity | 6 |
| Trust / Credibility | 8 |
| CTA Clarity | 7 |

What aligns well:

- Mission Statement is prominent and clear.
- Founding Story gives continuity through early programs, pause, and relaunch.
- Leadership section is transparent about board rebuilding.

Doctrine gaps:

- "Community impact layer of J Merrill One," "multi-brand enterprise," "Community Impact Operating Layer," and "sole systems architect across five enterprise divisions" are internally focused.
- Microsoft nonprofit grant, Dynamics 365, Power Platform, Azure, and Microsoft 365 language may be too technical for the main About narrative.
- "This is not a small nonprofit scraping for technology access" creates contrast but may feel defensive to donors or community partners.
- Parent Enterprise in the fact cards may raise structural questions before the visitor has enough context.

Recommended cleanup:

- Lead About with the community problem and mission, then explain JM1 context later in a simpler "How we are supported" frame.
- Keep 501(c)(3), Columbus, contact, Little Free Library charter, and leadership transparency.
- Move deeper technology-stack details to board/grant-specific copy or soften them into "professional systems for tracking programs and reporting impact."

### Programs — `/programs`

Scores:

| Metric | Score |
| --- | ---: |
| Why-First Alignment | 7 |
| Primary Audience Clarity | 7 |
| Trust / Credibility | 7 |
| CTA Clarity | 7 |

What aligns well:

- The page organizes programs clearly and makes status visible.
- Community Table and Literacy Bridge explain who is served.
- Program details blocks help visitors quickly scan practical facts.

Doctrine gaps:

- The page is partly service-first: it jumps into program cards/details before a concise explanation of the community need each program answers.
- DigiReady is technology-first: "Microsoft-powered," "Microsoft 365," "Copilot-assisted," and "enterprise nonprofit technology stack" dominate the promise.
- "Only program of its kind in Columbus" is a strong market claim that should be verified or softened unless documented.
- Timeline inconsistency: Community Table says 75 families in 2024 and 150 goal in 2025; other pages use 75 in 2025 and 150 in 2026.
- "Our multilingual congregation at Agape International Cathedral is our primary constituent pipeline" is internally precise but may feel pipeline/system-oriented on a public page.

Recommended cleanup:

- Add or revise a short intro explaining why the program mix exists: reading, writing, digital access, language access, and family support are connected forms of literacy.
- Reframe DigiReady around visitor outcomes: confidence using common tools, job readiness, and everyday digital independence.
- Replace "pipeline" with relationship language.

### Impact — `/impact`

Scores:

| Metric | Score |
| --- | ---: |
| Why-First Alignment | 8 |
| Primary Audience Clarity | 8 |
| Trust / Credibility | 9 |
| CTA Clarity | 8 |

What aligns well:

- Strong proof-first page with concrete milestones.
- Chillicothe story is emotionally clear and supported by a visible book cover.
- The page answers "why can I trust this?" better than any other page.

Doctrine gaps:

- "Physical Infrastructure" and "Proof of Model" are credible but slightly internal/strategic.
- "Every program is powered by our enterprise Microsoft technology stack" shifts the closing from mission to systems.
- The page contains the clearest 2023/2024/2025/2026 sequence, but it conflicts with Programs and Donate.

Recommended cleanup:

- Preserve the overall structure.
- Make the "What's Next" section more visitor-first: what the relaunch means for children, families, schools, and volunteers.
- Keep technology as an assurance of stewardship/reporting, not the emotional close.

### Board — `/board`

Scores:

| Metric | Score |
| --- | ---: |
| Why-First Alignment | 7 |
| Primary Audience Clarity | 9 |
| Trust / Credibility | 8 |
| CTA Clarity | 9 |

What aligns well:

- Audience is very clear: prospective board members.
- The "literacy is infrastructure" framing is strong and board-appropriate.
- Open seats, skill needs, and application CTA are practical.

Doctrine gaps:

- This page can tolerate more operational language than other pages, but "same technology powering J Merrill One," "governance dashboards," and "impact metrics" still lead with systems before governance purpose.
- "Mission that connects publishing, faith, financial empowerment, and community service" is valuable but may need a little more plain-language grounding for new visitors.

Recommended cleanup:

- Keep the board-specific specificity.
- Reframe infrastructure as board stewardship: reliable records, program visibility, and responsible reporting.
- Consider adding one sentence about who board decisions ultimately serve.

### Volunteer — `/volunteer`

Scores:

| Metric | Score |
| --- | ---: |
| Why-First Alignment | 8 |
| Primary Audience Clarity | 8 |
| Trust / Credibility | 7 |
| CTA Clarity | 7 |

What aligns well:

- Hero is excellent: "Your Time Is Someone's First Chapter" is human and mission-first.
- Opportunity cards are clear, approachable, and specific.
- Commitment labels reduce friction.

Doctrine gaps:

- Several distinct intents all lead into the same embedded intake form without role-specific reassurance.
- The Microsoft Forms title says "JM1 Foundation Constituent Intake Form," which may feel internal or clinical.
- "Constituent intake" is system-first language for a volunteer page.
- Current response-time promise should be confirmed operationally before cleanup keeps it.

Recommended cleanup:

- Change helper copy around the form to explain that the same form routes readers, volunteers, board candidates, school partners, and station requests.
- Use warmer microcopy such as "interest form" or "start here" instead of "constituent intake."
- Do not change the form embed itself in Phase 2 unless approved.

### Donate — `/donate`

Scores:

| Metric | Score |
| --- | ---: |
| Why-First Alignment | 8 |
| Primary Audience Clarity | 8 |
| Trust / Credibility | 8 |
| CTA Clarity | 8 |

What aligns well:

- The hero ties giving directly to readers and community programs.
- Donation microcopy includes 501(c)(3) and tax-deductibility language.
- "Where Your Gift Goes" is clear and concrete.

Doctrine gaps:

- "Every dollar funds a reader" and "Every donation funds books, not overhead" may be too absolute unless the Foundation can operationally support those claims.
- Named giving descriptions include strong recognition and permanence language that should be approved before edits.
- "Estate planning consultations available" may imply legal/financial service availability and should be reviewed carefully.
- Community Table description says 150 Columbus families in 2025, conflicting with home/impact.

Recommended cleanup:

- Preserve the giving structure and external payment link.
- Soften absolute funding language unless Jackie confirms exact restricted-fund handling.
- Confirm named giving, endowment, recognition, and estate-planning wording before Phase 2.

### Story Hour Library — `/story-hour`

Scores:

| Metric | Score |
| --- | ---: |
| Why-First Alignment | 8 |
| Primary Audience Clarity | 8 |
| Trust / Credibility | 8 |
| CTA Clarity | 8 |

What aligns well:

- The hero is public-facing and simple: free access, no account, community voices.
- The "How Story Hour Works" cards are understandable and trust-building.
- Copyright model gives responsible guardrails without overselling.

Doctrine gaps:

- "Author consent contracts (tracked in Dataverse)" is unnecessarily internal for this page.
- AIC congregation member language is okay but should stay relationship-centered.
- "Launching 2025" should be reconciled with the sitewide relaunch timeline.

Recommended cleanup:

- Keep the page structure.
- Remove or soften Dataverse reference.
- Make launch status consistent and visitor-understandable.

### Classroom Author Project — `/classroom-author`

Scores:

| Metric | Score |
| --- | ---: |
| Why-First Alignment | 9 |
| Primary Audience Clarity | 8 |
| Trust / Credibility | 9 |
| CTA Clarity | 8 |

What aligns well:

- Strong Why-First framing: students become authors, not just students completing an assignment.
- The Chillicothe proof point gives the program emotional credibility.
- "How the Program Works" is practical without losing mission.

Doctrine gaps:

- Public sale and proceeds split language should be confirmed for legal/operational accuracy before cleanup.
- Youth Author Pipeline and inaugural 2025 Youth Anthology timing should be confirmed.
- CTA routes a school partnership inquiry to `/volunteer`, which may feel mismatched without helper text.

Recommended cleanup:

- Keep the page mostly intact.
- Clarify the school CTA and volunteer-form routing.
- Confirm proceeds, youth anthology, and public sale claims before any language changes.

### Reading Stations — `/our-libraries`

Scores:

| Metric | Score |
| --- | ---: |
| Why-First Alignment | 8 |
| Primary Audience Clarity | 8 |
| Trust / Credibility | 8 |
| CTA Clarity | 7 |

What aligns well:

- "Free Books, Always" is simple and strong.
- Parsons Avenue details and charter number create credibility.
- QR bridge connects physical and digital literacy in a visitor-friendly way.

Doctrine gaps:

- "Physical Community Infrastructure" is internally strategic and less human than "Free books in the neighborhood."
- Expansion section shifts into system language: "charter-registered, QR-enabled, tracked in our Dataverse system," "board governance dashboard," and "grant reporting."
- "Every donation funds books, not overhead" should be confirmed before being preserved.
- "Request a Station for Your Community" routes to `/volunteer`; this may need helper text or a clearer intake path.

Recommended cleanup:

- Keep the Parsons Avenue proof and QR explanation.
- Reframe expansion around neighborhoods, stewardship, and access.
- Move Dataverse/dashboard/grant reporting details out of the public narrative or soften them.

### Navigation and Footer

Scores:

| Area | Why-First | Audience Clarity | Trust | CTA Clarity |
| --- | ---: | ---: | ---: | ---: |
| Navigation | 8 | 8 | 7 | 8 |
| Footer | 6 | 7 | 8 | 7 |

What aligns well:

- Navigation labels are plain and useful.
- Donate CTA is visible.
- Footer provides contact, 501(c)(3), program links, and JM1 ecosystem links.

Doctrine gaps:

- Footer leads with "A J Merrill One Company" and "Community Impact Operating Layer," which is internally focused for a trust/footer moment.
- Global Open Graph URL references `https://www.jmerrill.foundation`, while the task identifies `jmerrill.org`. Canonical domain should be confirmed.
- README refers to repository `jmerrillorg/jmerrill-foundation`, while the task references `jmerrillorg/jmerrillfoundation`; the fetched remote for this workspace is `jmerrillorg/jmerrillfoundation`.

Recommended cleanup:

- Keep navigation structure unless approved otherwise.
- Make footer brand copy mission-first, then mention JM1 ecosystem as supporting context.
- Confirm canonical domain before metadata cleanup.

## 4. Top Doctrine Gaps

1. Internal architecture appears before visitor clarity.
   Terms like "Community Impact Operating Layer," "multi-brand enterprise," "enterprise nonprofit technology stack," "Dataverse system," and "governance dashboard" are accurate-sounding but require visitors to decode JM1 systems before understanding the human value.

2. Technology sometimes becomes the trust argument.
   Technology should support trust through stewardship, reliability, accessibility, and reporting. It should not replace the human reason to care.

3. Timeline and goal inconsistencies reduce confidence.
   Community Table and relaunch dates conflict across pages. Visitors may not notice every inconsistency, but donors, board candidates, and partners often will.

4. CTAs share one intake path without enough explanation.
   `/volunteer` currently handles many intents. The site needs clearer helper text so every visitor knows the form is still the right next step.

5. Some claims need approval or substantiation.
   Examples include "only program of its kind in Columbus," "every donation funds books, not overhead," "estate planning consultations available," and proceeds-split language.

6. Metadata needs domain and description refinement.
   Page metadata exists, but titles/descriptions can be more Why-First, and the Open Graph domain should match the canonical public domain.

## 5. Quick Wins

- Replace public-facing "constituent intake" language with "interest form" or "start here."
- Reframe "enterprise Microsoft technology stack" as "reliable tools for coordinating programs and reporting impact."
- Change "pipeline" language to "relationship," "pathway," or "community connection."
- Make all Community Table numbers and goal years consistent across Home, Programs, Impact, Donate, and Volunteer.
- Make Story Hour and Foundation relaunch timing consistent across pages.
- Add CTA helper text where `/volunteer` receives non-volunteer intents: board application, school partnership, station request, youth author interest, ESL instructor interest, and Story Hour reader signup.
- Soften or verify absolute donation language.
- Make footer mission-first before JM1 ecosystem language.
- Confirm canonical domain for metadata: `jmerrill.org`, `jmerrill.foundation`, or another primary domain.

## 6. Recommended Implementation Scope

Phase 2 should be a small copy and metadata cleanup only.

Recommended files:

- `src/app/layout.tsx` — site metadata, Open Graph URL/description, global description.
- `src/app/page.tsx` — program card language, technology phrasing, timeline consistency.
- `src/app/about/page.tsx` — mission-first About sequencing, simpler JM1/technology explanation.
- `src/app/programs/page.tsx` — program intro, DigiReady language, Literacy Bridge relationship language, dates.
- `src/app/impact/page.tsx` — "What's Next" close, internal phrase softening, dates.
- `src/app/board/page.tsx` — board stewardship language, keep board specificity.
- `src/app/volunteer/page.tsx` — form helper text and less clinical microcopy.
- `src/app/donate/page.tsx` — confirm/soften absolute donation and named giving language, dates.
- `src/app/story-hour/page.tsx` — remove Dataverse reference, timeline consistency.
- `src/app/classroom-author/page.tsx` — clarify CTA routing, confirm claims.
- `src/app/our-libraries/page.tsx` — humanize expansion language, soften Dataverse/dashboard language, clarify station-request CTA.
- `src/components/Footer.tsx` — mission-first footer copy.

Out of scope unless explicitly approved:

- Pricing or named giving tier amounts.
- Legal/policy language beyond approved copy softening.
- Forms or Microsoft Forms embed.
- Payment link or payment logic.
- API routes, Power Automate, Dataverse, analytics, authentication, or integrations.
- Major layout or navigation structure.
- Brand colors or visual identity.
- New testimonials, statistics, program claims, guarantees, donation impact numbers, or ministry claims.

## 7. Items Requiring Jackie Decision

1. Canonical public domain:
   Should metadata and Open Graph use `jmerrill.org`, `www.jmerrill.org`, `jmerrill.foundation`, or `www.jmerrill.foundation`?

2. Community Table timeline:
   Which public sequence is correct?
   - 25 families in 2023, 50 in 2024, 75 in 2025, 150 goal in 2026.
   - 75 families in 2024, 150 goal in 2025.
   - Another sequence.

3. Relaunch and launch years:
   Should public copy say Foundation relaunching in 2025, relaunching in 2026, or currently relaunched? Should Story Hour be "Launching 2025," "Launching 2026," or "In development"?

4. Donation language:
   Can the site truthfully say "Every dollar funds a reader" and "Every donation funds books, not overhead," or should language be softened?

5. Named giving and endowment claims:
   Should the site keep "Endowment Seat," "permanent named fund," "sustains Foundation programs in perpetuity," and "estate planning consultations available" as currently written?

6. DigiReady market claim:
   Can the site substantiate "the only program of its kind in Columbus," or should that become a softer aspiration?

7. Classroom Author proceeds:
   Is "Proceeds are split between the Foundation and the student authors" approved and operationally true for public copy?

8. Youth Author Pipeline:
   Are "students ages 8-18," "annual anthology," "top manuscript receives a full J Merrill Publishing review," and "inaugural 2025 Youth Anthology" approved as public promises?

9. JM1 ecosystem posture:
   How prominently should J Merrill One, J Merrill Publishing, J Merrill Financial, J Merrill Productions, and Agape International Cathedral appear on public Foundation pages?

10. Technology posture:
    Should Microsoft grant, Power Platform, Azure, Microsoft 365, Dataverse, governance dashboard, and grant reporting details remain public-page language, move to board/grant contexts, or be translated into simpler stewardship language?

11. Intake path:
    Is one Microsoft Forms intake meant to serve all visitor intents, or should future cleanup recommend separate routing for volunteers, board candidates, school partners, station requests, and donors?

12. Agape International Cathedral:
    Should AIC be framed publicly as a partner, congregation relationship, volunteer source, program site, or only mentioned where directly applicable?

## Validation Notes

This Phase 1 PR is audit-only and does not modify website runtime code.

Requested validation:

| Command | Result | Notes |
| --- | --- | --- |
| `npm ci` | Not run | `npm` is not available on the shell PATH in this Codex desktop runtime. The bundled Node runtime includes `node` only. |
| `npm run type-check` | Not run | `package.json` does not define a `type-check` script. |
| `npm run lint` | Not run | Blocked because `npm` is unavailable and dependencies are not installed. |
| `npm run build` | Not run | Blocked because `npm` is unavailable and dependencies are not installed. |
| `git diff --check` | Passed | No whitespace or conflict-marker issues found. |

Repository command notes:

- `package.json` defines `dev`, `build`, `start`, and `lint`.
- The repository contains `pnpm-lock.yaml` and no `package-lock.json`; in a normal development environment, the lockfile-consistent setup command is likely `pnpm install --frozen-lockfile`, followed by `pnpm lint` and `pnpm build`.
- If the project wants to keep npm validation as the standard, add and maintain a `package-lock.json` or update the validation contract to use pnpm.
