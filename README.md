# BaseLine Okinawa

A mobile-first progressive web app built for US military families navigating arrival in Okinawa, Japan.

**Live:** [onisland.io](https://onisland.io)

---

## The Problem

Every week, new military families arrive in Okinawa overwhelmed and underinformed. Critical information — trash collection rules, utility setup, medical access, driving requirements, schools — is fragmented across outdated PDFs, Facebook groups, and word of mouth. There is no single trusted, structured, offline-capable resource built specifically for this population.

BaseLine is that resource.

---

## What It Does

BaseLine personalizes the arrival experience based on each family's situation — housing type, agency, installation, and village — and delivers fast, accurate, locally grounded information at the moment it's needed most.

Key capabilities:

- **AI-powered assistant** — natural language Q&A grounded in verified local content, backed by the Anthropic Claude API
- **Personalized onboarding** — housing type, agency, base, and village captured on first launch, used to tailor all content
- **Offline-first** — core content available without connectivity, critical for families without a local data plan yet
- **Installable PWA** — no App Store required; distributed via QR code at mandatory newcomer orientation
- **Tappable emergency contacts** — every phone number dials directly, every location opens in Waze or Google Maps
- **Sponsored listings** — revenue infrastructure built in from day one, clearly labeled and separated from editorial content
- **Magic link authentication** — frictionless account creation, no passwords

---

## Technical Overview

Built as a pnpm monorepo with a React + Vite frontend and a Supabase backend deployed on Vercel.

| Concern | Implementation |
|---|---|
| Frontend | React 19, TypeScript, Tailwind CSS v4 |
| State management | Zustand with localStorage persistence |
| Data fetching | TanStack Query |
| Backend | Supabase (Tokyo region) — PostgreSQL, Row Level Security, Magic Link Auth |
| AI | Anthropic Claude API, Vercel serverless function |
| Analytics | Plausible (privacy-first, GDPR-compliant) |
| PWA | Service worker, offline caching, installable |
| Accessibility | WCAG 2.1 AA — axe-core automated testing, semantic HTML, ARIA |
| Testing | Vitest, React Testing Library, axe-core |
| CI/CD | GitHub Actions — type check and full test suite on every push |
| Deployment | Vercel (production), custom domain via Namecheap |

---

## Accessibility

Built to WCAG 2.1 AA standards with Section 508 compliance in mind — a baseline requirement for government-adjacent software.

- Automated accessibility testing with axe-core integrated into the CI pipeline
- Semantic HTML throughout — proper heading hierarchy, landmark roles, list semantics
- All interactive elements have accessible names
- Decorative images and emoji marked `aria-hidden`
- Tab panels, tab lists, and tab controls correctly attributed
- Color contrast verified across all UI states

---

## Security & Privacy

- No personal data collected beyond what is necessary for personalization
- Anonymous-first — full functionality without an account
- Supabase Row Level Security enforced on all tables
- Environment variables managed through Vercel — no secrets in source control
- Privacy-first analytics — no cookies, no fingerprinting, no personal data transmitted

---

## Deployment & Distribution

Distributed via QR code at the weekly Newcomer Orientation Welcome Aboard (NOWA) Brief, Camp Foster — the mandatory orientation attended by all incoming personnel and families across Okinawa's US military installations.

The PWA model eliminates App Store friction entirely — families scan a QR code and are using the app within seconds, no download or account required. A native iOS application is in development.

---

## About

Built and maintained by Ryan Parker — a software developer and Okinawa resident with firsthand experience of the arrival process this app is designed to improve.

**Contact:** [github.com/ryan-j-parker](https://github.com/ryan-j-parker)

---

© 2026 Ryan Parker. All rights reserved.
