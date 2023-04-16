-- CreateTable
CREATE TABLE "Advertiser" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Advertiser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "category" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AdvertiserToCategory" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AdvertiserToCategory_AB_unique" ON "_AdvertiserToCategory"("A", "B");

-- CreateIndex
CREATE INDEX "_AdvertiserToCategory_B_index" ON "_AdvertiserToCategory"("B");

-- AddForeignKey
ALTER TABLE "_AdvertiserToCategory" ADD CONSTRAINT "_AdvertiserToCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "Advertiser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AdvertiserToCategory" ADD CONSTRAINT "_AdvertiserToCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
