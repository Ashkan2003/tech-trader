-- CreateTable
CREATE TABLE "UserBoughtSymbols" (
    "id" SERIAL NOT NULL,
    "symbolName" INTEGER NOT NULL,
    "count" INTEGER NOT NULL,
    "tradeAccountId" INTEGER NOT NULL,

    CONSTRAINT "UserBoughtSymbols_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TradeAccount" (
    "id" SERIAL NOT NULL,
    "userProperty" INTEGER NOT NULL DEFAULT 4000,
    "userId" TEXT NOT NULL,

    CONSTRAINT "TradeAccount_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TradeAccount_userId_key" ON "TradeAccount"("userId");

-- AddForeignKey
ALTER TABLE "UserBoughtSymbols" ADD CONSTRAINT "UserBoughtSymbols_tradeAccountId_fkey" FOREIGN KEY ("tradeAccountId") REFERENCES "TradeAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TradeAccount" ADD CONSTRAINT "TradeAccount_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
