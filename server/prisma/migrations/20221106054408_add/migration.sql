/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `advertisers` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "advertisers_name_key" ON "advertisers"("name");
