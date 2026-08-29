-- ==============================================================================
-- ClearComms Aviation English (CCAE) - Supabase Database Schema & RLS Policies
-- Specification: PRD v2.0 (Sections 8, 9, 10)
-- Author: Munir Mohamad & Google Antigravity
-- ==============================================================================

-- 1. Enable UUID Extension (if not already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------------------------------------------
-- 2. Table: `requests` (Public Coaching Form Submissions)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    mobile_number TEXT NOT NULL,
    current_rating TEXT NOT NULL,
    organization TEXT,
    purpose_message TEXT,
    pdpa_consent BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Comments for Schema Documentation
COMMENT ON TABLE public.requests IS 'Stores visitor form requests for free aviation English coaching sessions.';
COMMENT ON COLUMN public.requests.pdpa_consent IS 'Mandatory PDPA consent confirmation (must be TRUE).';

-- ------------------------------------------------------------------------------
-- 3. Table: `bookings` (Cal.com Webhook Booking Log)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    cal_booking_id TEXT NOT NULL,
    visitor_name TEXT NOT NULL,
    visitor_email TEXT NOT NULL,
    slot_start TIMESTAMPTZ NOT NULL,
    slot_end TIMESTAMPTZ NOT NULL,
    custom_fields JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Comments for Schema Documentation
COMMENT ON TABLE public.bookings IS 'Stores confirmed Cal.com booking events ingested via Vercel serverless function.';

-- ------------------------------------------------------------------------------
-- 4. Row Level Security (RLS) - Zero Trust Access Control
-- ------------------------------------------------------------------------------

-- Enable RLS on both tables
ALTER TABLE public.requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if re-running
DROP POLICY IF EXISTS "Allow anon to INSERT requests" ON public.requests;
DROP POLICY IF EXISTS "Deny anon SELECT on requests" ON public.requests;
DROP POLICY IF EXISTS "Allow anon to INSERT bookings" ON public.bookings;
DROP POLICY IF EXISTS "Allow authenticated admin full access to requests" ON public.requests;
DROP POLICY IF EXISTS "Allow authenticated admin full access to bookings" ON public.bookings;

-- Policy 1: Public Anon Key can ONLY INSERT into `requests`
-- Enforces that pdpa_consent must be TRUE
CREATE POLICY "Allow anon to INSERT requests"
ON public.requests
FOR INSERT
TO anon
WITH CHECK (pdpa_consent = TRUE);

-- Policy 2: Public Anon Key can ONLY INSERT into `bookings` (via client if needed)
CREATE POLICY "Allow anon to INSERT bookings"
ON public.bookings
FOR INSERT
TO anon
WITH CHECK (true);

-- Policy 3: Authenticated Admin (Munir) has Full Access (SELECT, UPDATE, DELETE)
CREATE POLICY "Allow authenticated admin full access to requests"
ON public.requests
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow authenticated admin full access to bookings"
ON public.bookings
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- ------------------------------------------------------------------------------
-- 5. Helpful Performance Indexes
-- ------------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_requests_created_at ON public.requests (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON public.bookings (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_bookings_cal_id ON public.bookings (cal_booking_id);
