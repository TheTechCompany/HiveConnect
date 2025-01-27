/*
  Warnings:

  - Added the required column `organisation` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organisation` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organisation` to the `Request` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "organisation" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "organisation" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Request" ADD COLUMN     "organisation" TEXT NOT NULL;
