/*
  Warnings:

  - The `state` column on the `Symbols` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ALLOWED', 'NOTALLOWED');

-- AlterTable
ALTER TABLE "Symbols" DROP COLUMN "state",
ADD COLUMN     "state" "Status" NOT NULL DEFAULT 'NOTALLOWED';
