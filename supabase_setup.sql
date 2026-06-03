-- =============================================================================
-- Mi Gusto x La Sagrada — waitlist de emails (coming soon)
-- Ejecutar en: Supabase Dashboard → SQL Editor → New query → Run
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.waitlist_emails (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
  CONSTRAINT waitlist_emails_email_unique UNIQUE (email),
  CONSTRAINT waitlist_emails_email_format CHECK (
    email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
  )
);

CREATE INDEX IF NOT EXISTS waitlist_emails_created_at_idx
  ON public.waitlist_emails (created_at DESC);

ALTER TABLE public.waitlist_emails ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "waitlist_anon_insert" ON public.waitlist_emails;
CREATE POLICY "waitlist_anon_insert"
  ON public.waitlist_emails
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT INSERT ON public.waitlist_emails TO anon, authenticated;

-- Verificación: debe devolver 1 fila con rls_enabled = true
SELECT tablename, rowsecurity AS rls_enabled
FROM pg_tables
WHERE schemaname = 'public' AND tablename = 'waitlist_emails';
