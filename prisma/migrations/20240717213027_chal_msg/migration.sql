-- AlterTable
ALTER TABLE "Challenge" ADD COLUMN     "messages" JSONB[] DEFAULT ARRAY[]::JSONB[];
