/*
  Warnings:

  - Added the required column `humanId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `humanId` to the `Request` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "humanId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Request" ADD COLUMN     "humanId" TEXT NOT NULL;
