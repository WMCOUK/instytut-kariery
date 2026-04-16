-- Track processed Stripe webhook event IDs to prevent replay attacks.

CREATE TABLE "public"."StripeWebhookEvent" (
    "eventId"   TEXT NOT NULL,
    "type"      TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StripeWebhookEvent_pkey" PRIMARY KEY ("eventId")
);

-- RLS enabled to match the rest of the schema.
ALTER TABLE "public"."StripeWebhookEvent" ENABLE ROW LEVEL SECURITY;
