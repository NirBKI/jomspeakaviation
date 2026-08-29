# ClearComms Aviation English (CCAE) - Personal Portfolio

This repository contains the rebuilt personal portfolio and coaching request portal for Munir Mohamad, a Malaysian Air Traffic Controller and ELP Rater.

## Tech Stack
- **Frontend**: Vanilla HTML/CSS/JS (Zero build step, highly performant)
- **Database**: Supabase (managed Postgres, REST API, Row Level Security)
- **Booking**: Cal.com (embedded widget syncing with Google Calendar)
- **Functions**: Vercel Serverless Functions (Node.js) for webhook and notification logic
- **Hosting**: Vercel
- **Notifications**: CallMeBot (WhatsApp API)

## Security
This project adheres to the **Universal Project Security Protocol**.
- **No Secrets**: Never commit `.env` files. Secrets are managed exclusively via Vercel Environment Variables.
- **Row Level Security**: The Supabase database enforces `INSERT`-only access for public requests.
- **Agent Guardrails**: When developed with Google Antigravity, strict auto-run and approval policies apply to prevent indirect prompt injections.

## Setup Instructions
1. Clone the repository.
2. Serve `index.html` via any local web server (e.g., VSCode Live Server, `npx serve`).
3. Connect environment variables in Vercel to activate the webhook and database functionalities.
