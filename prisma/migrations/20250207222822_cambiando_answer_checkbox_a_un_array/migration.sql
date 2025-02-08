/*
  Warnings:

  - The `answer_checkbox` column on the `Answer` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Answer" DROP COLUMN "answer_checkbox",
ADD COLUMN     "answer_checkbox" TEXT[];
