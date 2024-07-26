/*
  Warnings:

  - You are about to drop the column `productId` on the `image` table. All the data in the column will be lost.
  - Added the required column `images` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `image` DROP FOREIGN KEY `Image_productId_fkey`;

-- AlterTable
ALTER TABLE `image` DROP COLUMN `productId`;

-- AlterTable
ALTER TABLE `product` ADD COLUMN `images` VARCHAR(191) NOT NULL;
