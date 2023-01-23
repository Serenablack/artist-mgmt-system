-- CreateEnum
CREATE TYPE "gender" AS ENUM ('m', 'f', 'o');

-- CreateEnum
CREATE TYPE "genre" AS ENUM ('rnb', 'country', 'classic', 'rock', 'jazz');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "firstName" VARCHAR(255) NOT NULL,
    "lastName" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(500) NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "gender" "gender" NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Artist" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "gender" "gender" NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "firstReleaseYear" INTEGER NOT NULL,
    "noOfAlbumsReleased" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Artist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Music" (
    "title" VARCHAR(255) NOT NULL,
    "albumName" VARCHAR(255) NOT NULL,
    "genre" "genre" NOT NULL,
    "artistId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Music_pkey" PRIMARY KEY ("artistId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Music" ADD CONSTRAINT "Music_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
