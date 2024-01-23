-- CreateTable
CREATE TABLE "Symbols" (
    "id" SERIAL NOT NULL,
    "symbolName" TEXT NOT NULL,
    "volume" INTEGER NOT NULL,
    "lastDeal" INTEGER NOT NULL,
    "lastDealPercentage" DOUBLE PRECISION NOT NULL,
    "lastPrice" INTEGER NOT NULL,
    "lastPricePercentage" INTEGER NOT NULL,
    "theFirst" INTEGER NOT NULL,
    "theLeast" INTEGER NOT NULL,
    "theMost" INTEGER NOT NULL,
    "demandVolume" INTEGER NOT NULL,
    "demandPrice" INTEGER NOT NULL,
    "offerPrice" INTEGER NOT NULL,
    "offerVolume" INTEGER NOT NULL,
    "state" TEXT NOT NULL,

    CONSTRAINT "Symbols_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Symbols_symbolName_key" ON "Symbols"("symbolName");
