# jmerrill.org — Site Deployment Guide

**Project:** J Merrill Foundation Inc. Website
**Canonical Domain:** www.jmerrill.org
**Secondary Domain:** jmerrill.foundation may remain redirected or secondary
**Stack:** Next.js 14 App Router · TypeScript · Tailwind CSS
**Hosting:** Azure Static Web Apps (JM1 Foundation Azure credit)
**Repository:** github.com/jmerrillorg/jmerrill-foundation

---

## Site Structure

```
src/app/
├── page.tsx              → / (Homepage)
├── about/page.tsx        → /about
├── programs/page.tsx     → /programs
├── impact/page.tsx       → /impact
├── board/page.tsx        → /board
├── volunteer/page.tsx    → /volunteer (embeds MS Forms intake)
├── donate/page.tsx       → /donate (Stripe placeholder)
├── story-hour/page.tsx   → /story-hour
├── classroom-author/page.tsx → /classroom-author
├── our-libraries/page.tsx    → /our-libraries
└── layout.tsx            → Root layout (Navigation + Footer)

src/components/
├── Navigation.tsx        → Fixed nav, scroll-aware, mobile hamburger
└── Footer.tsx            → Full footer with links and contact
```

---

## Deployment Steps

### Step 1 — Clone and Install

```bash
git clone https://github.com/jmerrillorg/jmerrill-foundation.git
cd jmerrill-foundation
npm install
```

### Step 2 — Local Dev

```bash
npm run dev
# → http://localhost:3000
```

### Step 3 — Build Test

```bash
npm run build
# Produces /out directory (static export)
```

### Step 4 — Azure Static Web Apps Setup

1. Go to **portal.azure.com** → Create Resource → Static Web App
2. Name: `jmf-foundation-site`
3. Resource Group: `rg-jm1-communications` (existing)
4. Plan: **Free** (covered under Foundation Azure nonprofit credit)
5. Region: **East US 2**
6. Source: GitHub → `jmerrillorg/jmerrill-foundation` → branch: `main`
7. Build preset: **Custom**
8. App location: `/`
9. Output location: `out`
10. Click **Review + Create**

Azure will auto-generate the GitHub Actions workflow token and add it to the repo as `AZURE_STATIC_WEB_APPS_API_TOKEN`.

### Step 5 — Custom Domain

1. In Azure Static Web Apps → Custom domains → Add
2. Enter: `www.jmerrill.org`
3. Add the CNAME record to DNS at your domain registrar pointing to the Azure-provided hostname
4. Keep `jmerrill.foundation` as a secondary redirected domain if needed

### Step 6 — Microsoft Forms Embed

The volunteer page already embeds the Foundation intake form via iframe:

```
Form ID: XgctNReOaUGfjiLmlGzmbWLYUJckILxClwf4SzJd-xlUQktYVVZWRjg0SFc0RjNSWVVJOUMzNVZCNi4u
```

The iframe src in `/volunteer/page.tsx` uses the ResponsePage URL. Verify the form is set to **Anyone can respond** in Forms settings.

### Step 7 — Stripe Integration (Next Phase)

When Stripe is ready:
1. Install: `npm install @stripe/stripe-js @stripe/react-stripe-js`
2. Replace the placeholder in `/donate/page.tsx` with the Stripe Payment Element
3. Add `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` to Azure Static Web App environment variables
4. Wire Stripe webhook → Power Automate → `jm1fnd_donation` Dataverse table

---

## Design System

**Fonts (Google Fonts — loaded in globals.css)**
- Display: Cormorant Garamond (headings, pull quotes)
- Body: DM Sans (all body copy, nav, UI)
- Mono: DM Mono (labels, code, stats)

**Foundation Brand Colors**
```css
--primary:    #93329E   /* Foundation purple */
--secondary:  #CBAACB   /* Lavender */
--accent:     #A3C4DC   /* Soft blue */
--dark:       #1A1022   /* Near-black purple */
--surface:    #F3EBF5   /* Light lavender surface */
--gold:       #F4B400   /* Accent gold */
```

---

## Pages — Content Summary

| Route | Purpose | Key Content |
|---|---|---|
| / | Homepage | Hero, impact stats, program cards, Chillicothe story, Reading Station, board CTA, donate strip |
| /about | Foundation story | Mission statement, founding narrative, Jackie bio, board recruitment |
| /programs | Program hub | Community Table, Literacy Bridge, DigiReady detail sections |
| /impact | Proof points | Stats banner, Chillicothe feature, full program history timeline |
| /board | Board recruitment | 7 open seats with priority tags, why join, application CTA |
| /volunteer | Get involved | 6 opportunity cards + embedded MS Forms intake |
| /donate | Giving | Stripe placeholder, where it goes breakdown, 4 named giving tiers |
| /story-hour | Digital library | How it works, QR bridge, copyright tiers, reader CTA |
| /classroom-author | Signature program | Chillicothe proof, 5-step process, planned youth author opportunities, school partnership CTA |
| /our-libraries | Reading Stations | Parsons Ave station details, charter info, expansion plan |

---

## To-Do After Deployment

- [ ] Replace Stripe placeholder in /donate with live Stripe Payment Element
- [ ] Add real photography (Thanksgiving meals, Reading Station, Chillicothe project)
- [ ] Wire /our-libraries to Azure Maps API for interactive station map
- [ ] Add Power BI public impact dashboard embed to /impact
- [ ] Add Story Hour video grid to /story-hour once library is built
- [ ] Verify MS Forms iframe displays correctly in production (may need allowfullscreen)
- [ ] Set up Google Analytics or Microsoft Clarity for traffic tracking
- [ ] Submit sitemap.xml to Google Search Console
- [ ] Add og:image meta images for social sharing

---

## Canonical References

- Master Plan: `JMF-MASTER-PLAN-v1.0.docx`
- Canon Certification: `JM1-CANON-CERT-001`
- Constituent Intake Form ID: `XgctNReOaUGfjiLmlGzmbWLYUJckILxClwf4SzJd-xlUQktYVVZWRjg0SFc0RjNSWVVJOUMzNVZCNi4u`
- Little Free Library Charter: `#154418`
- Reading Station Address: `3901 Parsons Ave, Columbus OH 43207`
- Foundation Email: `foundation@jmerrill.one`
