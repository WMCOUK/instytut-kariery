-- Enable Row Level Security on every public table.
-- No policies attached => deny-all for Supabase anon/authenticated roles
-- (closes the PostgREST leak flagged by rls_disabled_in_public and
-- sensitive_columns_exposed advisors).
-- Prisma connects with a BYPASSRLS role, so application queries are unaffected.

ALTER TABLE "public"."User"                ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."Account"             ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."Personal"            ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."BlogCategory"        ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."Post"                ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."Comment"             ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."JobIndustry"         ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."Job"                 ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."Recruiter"           ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."JobType"             ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."JobExperience"       ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."JobDate"             ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."JobWorkMode"         ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."JobLocation"         ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."JobBenefit"          ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."JobPosition"         ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."Test"                ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."Candidate"           ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."Application"         ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."CandidateSkill"      ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."CandidateExperience" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."CandidateEducation"  ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."CandidateCv"         ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."SocialLink"          ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."Preference"          ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."FavouriteJob"        ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."Newsletter"          ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."Rating"              ENABLE ROW LEVEL SECURITY;
