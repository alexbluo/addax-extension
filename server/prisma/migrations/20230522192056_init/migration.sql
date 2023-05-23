-- CreateTable
CREATE TABLE "Advertiser" (
    "endpoint" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Advertiser_pkey" PRIMARY KEY ("endpoint")
);

-- CreateTable
CREATE TABLE "Category" (
    "category" INTEGER NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("category")
);

-- CreateTable
CREATE TABLE "_AdvertiserToCategory" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Advertiser_endpoint_key" ON "Advertiser"("endpoint");

-- CreateIndex
CREATE UNIQUE INDEX "Advertiser_name_key" ON "Advertiser"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Category_category_key" ON "Category"("category");

-- CreateIndex
CREATE UNIQUE INDEX "_AdvertiserToCategory_AB_unique" ON "_AdvertiserToCategory"("A", "B");

-- CreateIndex
CREATE INDEX "_AdvertiserToCategory_B_index" ON "_AdvertiserToCategory"("B");

-- AddForeignKey
ALTER TABLE "_AdvertiserToCategory" ADD CONSTRAINT "_AdvertiserToCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "Advertiser"("endpoint") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AdvertiserToCategory" ADD CONSTRAINT "_AdvertiserToCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "Category"("category") ON DELETE CASCADE ON UPDATE CASCADE;
