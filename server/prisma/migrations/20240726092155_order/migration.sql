/*
  Warnings:

  - You are about to drop the column `totalAmount` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `OrderItem` table. All the data in the column will be lost.
  - Added the required column `payment_url` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pidx` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transactionId` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Order` DROP COLUMN `totalAmount`,
    ADD COLUMN `amount` DOUBLE NOT NULL DEFAULT 0.00,
    MODIFY `status` ENUM('PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED') NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE `OrderItem` DROP COLUMN `price`;

-- AlterTable
ALTER TABLE `Payment` ADD COLUMN `payment_url` VARCHAR(191) NOT NULL,
    ADD COLUMN `pidx` VARCHAR(191) NOT NULL,
    ADD COLUMN `provider` ENUM('KHALTI', 'ESEWA') NOT NULL DEFAULT 'KHALTI',
    ADD COLUMN `status` ENUM('PENDING', 'FAILED', 'SUCCESS') NOT NULL DEFAULT 'PENDING',
    ADD COLUMN `transactionId` VARCHAR(191) NOT NULL,
    MODIFY `method` ENUM('ONLINE', 'DELIVERY') NOT NULL DEFAULT 'ONLINE';
