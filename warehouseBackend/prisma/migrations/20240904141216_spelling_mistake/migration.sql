/*
  Warnings:

  - You are about to drop the column `unitAmound` on the `Stock` table. All the data in the column will be lost.
  - Added the required column `unitAmount` to the `Stock` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Stock" DROP COLUMN "unitAmound",
ADD COLUMN     "unitAmount" INTEGER NOT NULL;
