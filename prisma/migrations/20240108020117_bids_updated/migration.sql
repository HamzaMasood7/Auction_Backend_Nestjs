/*
  Warnings:

  - You are about to drop the column `autionId` on the `bids` table. All the data in the column will be lost.
  - Added the required column `bidTime` to the `bids` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `bids` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bids" DROP COLUMN "autionId",
ADD COLUMN     "bidTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "productId" INTEGER NOT NULL;
