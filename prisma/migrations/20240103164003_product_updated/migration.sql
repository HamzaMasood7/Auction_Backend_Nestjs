/*
  Warnings:

  - Added the required column `MaximumBid` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeBid` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `winnerId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "MaximumBid" INTEGER NOT NULL,
ADD COLUMN     "timeBid" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "winnerId" INTEGER NOT NULL;
