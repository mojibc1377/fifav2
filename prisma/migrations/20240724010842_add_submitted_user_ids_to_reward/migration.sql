-- AlterTable
ALTER TABLE "Reward" ADD COLUMN     "submittedUserIds" INTEGER[] DEFAULT ARRAY[]::INTEGER[];
