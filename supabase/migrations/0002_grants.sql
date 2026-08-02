-- Fixes "permission denied for table X" errors. RLS policies only control
-- which rows a role can see -- the role still needs a baseline table-level
-- GRANT before RLS is even evaluated. Supabase normally auto-grants this to
-- anon/authenticated/service_role on new tables, but it didn't take effect
-- here, so it's applied explicitly.

grant usage on schema public to anon, authenticated, service_role;

grant select on
  public.destinations,
  public.packages,
  public.package_itineraries,
  public.package_images,
  public.site_settings,
  public.reviews
to anon, authenticated;

grant insert on public.leads to anon;

grant all on
  public.destinations,
  public.packages,
  public.package_itineraries,
  public.package_images,
  public.site_settings,
  public.reviews,
  public.leads
to service_role;
