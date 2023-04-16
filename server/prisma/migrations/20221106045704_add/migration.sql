/*
  Warnings:

  - The primary key for the `advertisers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `advertisers` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `advertisers` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "_AdvertiserToCategory" DROP CONSTRAINT "_AdvertiserToCategory_A_fkey";

-- AlterTable
ALTER TABLE "_AdvertiserToCategory" ALTER COLUMN "A" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "advertisers" DROP CONSTRAINT "advertisers_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "advertisers_pkey" PRIMARY KEY ("name");

-- CreateIndex
CREATE UNIQUE INDEX "advertisers_name_key" ON "advertisers"("name");

-- AddForeignKey
ALTER TABLE "_AdvertiserToCategory" ADD CONSTRAINT "_AdvertiserToCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "advertisers"("name") ON DELETE CASCADE ON UPDATE CASCADE;
