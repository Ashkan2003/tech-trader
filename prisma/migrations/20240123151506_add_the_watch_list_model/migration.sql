-- CreateTable
CREATE TABLE "WatchList" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "symbols" JSONB NOT NULL,
    "userId" TEXT,

    CONSTRAINT "WatchList_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WatchList" ADD CONSTRAINT "WatchList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
