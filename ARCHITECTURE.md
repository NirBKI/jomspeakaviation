# CCAE Architecture

## Overview
The architecture is designed to be zero-cost, serverless, and completely reliant on managed services connected via webhooks and REST APIs.

## Components
1. **Frontend (Vercel)**
   - Pure HTML, CSS, and JS.
   - Fetches no dynamic data on initial load.
   - Submits directly to the Supabase REST API and embeds a Cal.com booking widget.
2. **Database (Supabase)**
   - **`requests` table**: Stores form submissions (Name, Email, Mobile, Rating, Organization, Purpose, PDPA Consent).
   - **`bookings` table**: Stores successfully completed Cal.com bookings.
   - **RLS**: Public anon key has strictly `INSERT` privileges.
3. **Booking Flow (Cal.com)**
   - User books a slot via the embedded widget.
   - Cal.com validates slot availability against Munir's Google Calendar.
   - On success, Cal.com fires a webhook to a Vercel Serverless Function.
4. **Serverless Glue (Vercel Function)**
   - Receives the webhook from Cal.com.
   - Verifies the cryptographic signature.
   - Inserts booking data into Supabase `bookings`.
   - Fires an HTTP GET request to CallMeBot to notify Munir on WhatsApp.
