/*
  Warnings:

  - You are about to drop the `Advertiser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_AdvertiserToCategory" DROP CONSTRAINT "_AdvertiserToCategory_A_fkey";

-- DropForeignKey
ALTER TABLE "_AdvertiserToCategory" DROP CONSTRAINT "_AdvertiserToCategory_B_fkey";

-- DropTable
DROP TABLE "Advertiser";

-- DropTable
DROP TABLE "Category";

-- CreateTable
CREATE TABLE "advertisers" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "advertisers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "category" TEXT NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "categories_category_key" ON "categories"("category");

-- AddForeignKey
ALTER TABLE "_AdvertiserToCategory" ADD CONSTRAINT "_AdvertiserToCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "advertisers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AdvertiserToCategory" ADD CONSTRAINT "_AdvertiserToCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
