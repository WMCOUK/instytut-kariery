-- AlterTable
ALTER TABLE "Application" ADD COLUMN     "appliedAt" TIMESTAMP(3),
ADD COLUMN     "submitted" TEXT DEFAULT 'false';
