/*
  Warnings:

  - You are about to drop the `UserBoughtSymbols` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserBoughtSymbols" DROP CONSTRAINT "UserBoughtSymbols_tradeAccountId_fkey";

-- DropTable
DROP TABLE "UserBoughtSymbols";

-- CreateTable
CREATE TABLE "UserBoughtSymbol" (
    "id" SERIAL NOT NULL,
    "symbolName" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "tradeAccountId" INTEGER NOT NULL,

    CONSTRAINT "UserBoughtSymbol_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserBoughtSymbol" ADD CONSTRAINT "UserBoughtSymbol_tradeAccountId_fkey" FOREIGN KEY ("tradeAccountId") REFERENCES "TradeAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
