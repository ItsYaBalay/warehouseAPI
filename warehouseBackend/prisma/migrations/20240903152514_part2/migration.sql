/*
  Warnings:

  - You are about to drop the column `stockId` on the `Location` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[locationId,productId]` on the table `Stock` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `locationId` to the `Stock` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_stockId_fkey";

-- DropIndex
DROP INDEX "Location_stockId_key";

-- AlterTable
ALTER TABLE "Location" DROP COLUMN "stockId";

-- AlterTable
ALTER TABLE "Stock" ADD COLUMN     "locationId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Stock_locationId_productId_key" ON "Stock"("locationId", "productId");

-- AddForeignKey
ALTER TABLE "Stock" ADD CONSTRAINT "Stock_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;
