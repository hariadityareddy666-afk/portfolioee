CREATE TABLE public.career_applications (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  role_id text not null,
  role_title text not null,
  message text not null,
  links text,
  created_at timestamptz not null default now()
);

GRANT INSERT ON public.career_applications TO anon;
GRANT ALL ON public.career_applications TO service_role;

ALTER TABLE public.career_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Visitors can submit applications"
  ON public.career_applications
  FOR INSERT
  TO anon
  WITH CHECK (true);