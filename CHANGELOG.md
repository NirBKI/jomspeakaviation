# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added
- Scaffolded foundation files for the CCAE Portfolio Rebuild.
- Established `.agents/` structure (Constitution, Skills, Hooks, Subagents).
- Added `ARCHITECTURE.md` and `AIM.md` documentation.
- Created `BACKLOG.md` incorporating the MoSCoW milestones.
- Set up automated CI security gates via GitHub Actions.
- Added comprehensive `.gitignore` preventing secrets, logs, and dependencies leaks.
- Configured `.env.example`, `.env`, and `.env.local` structured by public client and serverless secret domains.
- Built complete, responsive Vanilla HTML5/CSS/JS frontend (`index.html`, `style.css`, `app.js`):
  - Sticky navigation header with mobile drawer toggle.
  - High-impact Hero section with "Free 30-Minute Consultation" pulse banner and Cockpit Controller profile card.
  - About section highlighting CCAE peer-initiative philosophy.
  - Interactive Experience Timeline from FIS through ICAO ELP Rater.
  - Coaching Focus Areas mapped directly to 6 ICAO holistic descriptors.
  - 3-Step How It Works guide, Testimonials, and Resources sections.
  - Coaching Request Form with mandatory PDPA consent checkbox & validation.
  - Cal.com booking container and official CAAM/ICAO independent disclaimer card.
- Implemented Tactical ATC Design Polish & Animations (Impeccable Craft):
  - Rotating radar scope background with concentric altitude rings and sweep beam.
  - Authentic Flight Progress Strip (FPS) component with callsign, squawk, and runway data.
  - Sonar pulsing waypoint nodes with expanding ripple beacons in Experience Timeline.
  - Live radiotelephony audio waveform simulator on Card 06 (Interactive Plain English).
  - Tactical HUD corner brackets on high-emphasis containers.
  - Contextual dynamic hints in the Coaching Request Form for different aviation roles.
  - Scroll-triggered reveal animations via `IntersectionObserver`.
- Added reproducible Postgres SQL DDL & Row Level Security (RLS) policies in `supabase/schema.sql`.

### Fixed
- Replaced non-existent `gitleaks` npm package target with standard `serve` dev server package and added `"dev"` and `"start"` scripts to `package.json`.
