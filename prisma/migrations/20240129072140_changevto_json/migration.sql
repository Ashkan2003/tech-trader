/*
  Warnings:

  - The `chartNumber` column on the `Symbols` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Symbols" DROP COLUMN "chartNumber",
ADD COLUMN     "chartNumber" JSONB;
