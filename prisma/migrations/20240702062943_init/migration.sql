/*
  Warnings:

  - You are about to drop the column `token` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "token",
ADD COLUMN     "avatar" TEXT NOT NULL DEFAULT '/images/tekkz.png',
ADD COLUMN     "credit" INTEGER NOT NULL DEFAULT 0;
