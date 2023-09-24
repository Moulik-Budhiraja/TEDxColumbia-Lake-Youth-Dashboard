/*
  Warnings:

  - You are about to drop the column `qrId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Qr` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[qr]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_qrId_fkey`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `qrId`,
    ADD COLUMN `qr` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `Qr`;

-- CreateIndex
CREATE UNIQUE INDEX `User_qr_key` ON `User`(`qr`);
