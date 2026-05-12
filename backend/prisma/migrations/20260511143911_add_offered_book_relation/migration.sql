/*
  Warnings:

  - Added the required column `offeredBookId` to the `ExchangeRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ExchangeRequest" ADD COLUMN     "offeredBookId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "ExchangeRequest" ADD CONSTRAINT "ExchangeRequest_offeredBookId_fkey" FOREIGN KEY ("offeredBookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
