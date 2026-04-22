-- Supabase RLS advisor flags every table in public even when Prisma bypasses
-- RLS as superuser. Enable RLS here with no policies — no app code accesses
-- _prisma_migrations, and the Prisma CLI uses the service-role connection
-- which bypasses RLS regardless.
ALTER TABLE "public"."_prisma_migrations" ENABLE ROW LEVEL SECURITY;
