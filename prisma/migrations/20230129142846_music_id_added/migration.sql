/*
  Warnings:

  - The primary key for the `Music` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Music" DROP CONSTRAINT "Music_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Music_pkey" PRIMARY KEY ("id");
