-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female');

-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('Admin', 'Member');

-- CreateEnum
CREATE TYPE "RoleType" AS ENUM ('Buyer', 'Seller', 'SuperAdmin');

-- CreateEnum
CREATE TYPE "StatusType" AS ENUM ('NotActive', 'Live', 'Sold', 'Delivered');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "uuid" VARCHAR(145) NOT NULL,
    "name" VARCHAR(145) NOT NULL,
    "email" VARCHAR(145) NOT NULL,
    "password" TEXT NOT NULL,
    "type" "UserType" NOT NULL,
    "role" "RoleType" NOT NULL,
    "phone" VARCHAR(50) NOT NULL,
    "birthDate" TEXT,
    "gender" "Gender",
    "address" VARCHAR(145),
    "salt" VARCHAR(96),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "purchasedProducts" TEXT[],

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "images" TEXT[],
    "minimumBid" INTEGER NOT NULL,
    "status" "StatusType" NOT NULL,
    "SellerId" INTEGER NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Auction" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "minimumBids" INTEGER,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "sellerId" INTEGER NOT NULL,
    "products" INTEGER[],
    "isLive" BOOLEAN NOT NULL DEFAULT false,
    "winnerId" INTEGER,

    CONSTRAINT "Auction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bids" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "BidderId" INTEGER NOT NULL,
    "autionId" INTEGER NOT NULL,

    CONSTRAINT "bids_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_uuid_key" ON "users"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");
