/*
  Warnings:

  - You are about to drop the column `recruiterId` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `jobSlug` on the `Rating` table. All the data in the column will be lost.
  - You are about to drop the column `recruiterId` on the `SocialLink` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `Test` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Test` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,jobSlug]` on the table `FavouriteJob` will be added. If there are existing duplicate values, this will fail.
  - Made the column `userId` on table `FavouriteJob` required. This step will fail if there are existing NULL values in that column.
  - Made the column `jobSlug` on table `FavouriteJob` required. This step will fail if there are existing NULL values in that column.
  - Made the column `rating` on table `Rating` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Rating` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_candidateId_fkey";

-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_recruiterId_fkey";

-- DropForeignKey
ALTER TABLE "FavouriteJob" DROP CONSTRAINT "FavouriteJob_jobSlug_fkey";

-- DropForeignKey
ALTER TABLE "FavouriteJob" DROP CONSTRAINT "FavouriteJob_userId_fkey";

-- DropForeignKey
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_jobSlug_fkey";

-- DropForeignKey
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_userId_fkey";

-- DropForeignKey
ALTER TABLE "SocialLink" DROP CONSTRAINT "SocialLink_recruiterId_fkey";

-- DropIndex
DROP INDEX "Test_slug_key";

-- AlterTable
ALTER TABLE "Application" DROP COLUMN "recruiterId",
ADD COLUMN     "recruiterSlug" TEXT,
ADD COLUMN     "views" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "candidateId" DROP NOT NULL,
ALTER COLUMN "appliedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "CandidateEducation" ADD COLUMN     "instituteName" TEXT;

-- AlterTable
ALTER TABLE "CandidateExperience" ADD COLUMN     "companyName" TEXT;

-- AlterTable
ALTER TABLE "FavouriteJob" ALTER COLUMN "userId" SET NOT NULL,
ALTER COLUMN "jobSlug" SET NOT NULL;

-- AlterTable
ALTER TABLE "Rating" DROP COLUMN "jobSlug",
ADD COLUMN     "content" TEXT,
ADD COLUMN     "recruiterSlug" TEXT,
ADD COLUMN     "verified" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "rating" SET NOT NULL,
ALTER COLUMN "rating" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Recruiter" ADD COLUMN     "averageRating" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "ratingCount" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "SocialLink" DROP COLUMN "recruiterId",
ADD COLUMN     "recruiterSlug" TEXT;

-- AlterTable
ALTER TABLE "Test" DROP COLUMN "slug",
DROP COLUMN "title",
ADD COLUMN     "candidateCvSlug" TEXT,
ADD COLUMN     "candidateId" TEXT,
ADD COLUMN     "coverLetter" TEXT,
ADD COLUMN     "cvFileUrl" TEXT,
ADD COLUMN     "jobSlug" TEXT,
ADD COLUMN     "status" TEXT DEFAULT 'pending',
ADD COLUMN     "submitted" TEXT DEFAULT 'false';

-- CreateIndex
CREATE UNIQUE INDEX "FavouriteJob_userId_jobSlug_key" ON "FavouriteJob"("userId", "jobSlug");

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_recruiterSlug_fkey" FOREIGN KEY ("recruiterSlug") REFERENCES "Recruiter"("slug") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SocialLink" ADD CONSTRAINT "SocialLink_recruiterSlug_fkey" FOREIGN KEY ("recruiterSlug") REFERENCES "Recruiter"("slug") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavouriteJob" ADD CONSTRAINT "FavouriteJob_jobSlug_fkey" FOREIGN KEY ("jobSlug") REFERENCES "Job"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavouriteJob" ADD CONSTRAINT "FavouriteJob_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_recruiterSlug_fkey" FOREIGN KEY ("recruiterSlug") REFERENCES "Recruiter"("slug") ON DELETE SET NULL ON UPDATE CASCADE;
