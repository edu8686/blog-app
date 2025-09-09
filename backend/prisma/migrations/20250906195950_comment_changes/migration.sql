/*
  Warnings:

  - Added the required column `author` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Comment" DROP CONSTRAINT "Comment_userId_fkey";

-- AlterTable
ALTER TABLE "public"."Comment" ADD COLUMN     "author" TEXT NOT NULL;
