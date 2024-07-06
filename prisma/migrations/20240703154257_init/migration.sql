-- CreateTable
CREATE TABLE "Challenge" (
    "id" TEXT NOT NULL,
    "challengerId" INTEGER NOT NULL,
    "accepterId" INTEGER,
    "gameName" TEXT NOT NULL,
    "consoleType" TEXT NOT NULL,
    "challengeAmount" INTEGER NOT NULL,
    "resultPhoto" TEXT[],
    "winner" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Challenge_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Challenge" ADD CONSTRAINT "Challenge_challengerId_fkey" FOREIGN KEY ("challengerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Challenge" ADD CONSTRAINT "Challenge_accepterId_fkey" FOREIGN KEY ("accepterId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
