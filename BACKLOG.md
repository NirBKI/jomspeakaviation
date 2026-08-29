# CCAE Portfolio Backlog

## Phase 1: Foundation (M1)
- [x] Epic: Project Scaffolding
  - [x] Create `.agents/` structure (Constitution, Skills, Hooks, Subagents)
  - [x] Create core documentation (`README.md`, `CHANGELOG.md`, `ARCHITECTURE.md`, `AIM.md`)
  - [x] Setup basic security mechanisms (CI YAML, `package.json` scripts)
- [ ] Epic: Infrastructure Provisioning
  - [ ] Initialize Supabase project and define schemas (`requests`, `bookings`)
  - [ ] Apply RLS policies to Supabase tables
  - [ ] Connect repository to Vercel

## Phase 2: Content Rebuild (M2)
- [x] Epic: Static Frontend
  - [x] Build Hero section
  - [x] Build About & Coaching sections
  - [x] Build Experience Timeline
  - [x] Build How It Works section

## Phase 3: Form + Supabase Wiring (M3)
- [ ] Epic: Request Form Integration
  - [x] Build Request Form UI (Name, Email, Mobile, Rating, Org, Purpose)
  - [x] Implement PDPA consent checkbox
  - [ ] Write JS to insert data directly into Supabase `requests` table

## Phase 4: Cal.com + Webhook + WhatsApp (M4)
- [ ] Epic: Booking Engine
  - [x] Embed Cal.com widget container & tabs
  - [ ] Setup Cal.com webhook
- [ ] Epic: Serverless Glue
  - [ ] Write Vercel Serverless Function to receive webhook
  - [ ] Implement cryptographic signature verification
  - [ ] Function logic: Insert into Supabase `bookings`
  - [ ] Function logic: Fire WhatsApp alert via CallMeBot

## Phase 5: Testimonials, Resources, Polish (M5)
- [x] Epic: Final Content Sections
  - [x] Build Testimonials section
  - [x] Build Resources section
  - [x] Build Disclaimer & Footer

## Phase 6: Security Verification & Launch (M6)
- [ ] Epic: QA & Deployment
  - [ ] Run secret scans and manual QA checks
  - [ ] Verify Supabase RLS and environment variable isolation
  - [ ] Launch on Vercel production
