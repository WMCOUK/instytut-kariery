/*
  Warnings:

  - You are about to drop the column `priceId` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Job" ADD COLUMN     "latitude" DOUBLE PRECISION,
ADD COLUMN     "longitude" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "priceId",
ADD COLUMN     "sponPriceId" TEXT,
ADD COLUMN     "subPriceId" TEXT;
