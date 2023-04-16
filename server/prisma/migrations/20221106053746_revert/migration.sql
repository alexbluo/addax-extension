/*
  Warnings:

  - The primary key for the `advertisers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `A` on the `_AdvertiserToCategory` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "_AdvertiserToCategory" DROP CONSTRAINT "_AdvertiserToCategory_A_fkey";

-- DropIndex
DROP INDEX "advertisers_name_key";

-- AlterTable
ALTER TABLE "_AdvertiserToCategory" DROP COLUMN "A",
ADD COLUMN     "A" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "advertisers" DROP CONSTRAINT "advertisers_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "advertisers_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "_AdvertiserToCategory_AB_unique" ON "_AdvertiserToCategory"("A", "B");

-- AddForeignKey
ALTER TABLE "_AdvertiserToCategory" ADD CONSTRAINT "_AdvertiserToCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "advertisers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
