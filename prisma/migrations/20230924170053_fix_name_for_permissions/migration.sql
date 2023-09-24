/*
  Warnings:

  - You are about to drop the column `permisisonsId` on the `Role` table. All the data in the column will be lost.
  - You are about to drop the `Permisisons` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `permissionsId` to the `Role` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Role` DROP FOREIGN KEY `Role_permisisonsId_fkey`;

-- AlterTable
ALTER TABLE `Role` DROP COLUMN `permisisonsId`,
    ADD COLUMN `permissionsId` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `Permisisons`;

-- CreateTable
CREATE TABLE `Permissions` (
    `id` VARCHAR(191) NOT NULL,
    `scanQr` BOOLEAN NOT NULL DEFAULT true,
    `admin` BOOLEAN NOT NULL DEFAULT false,
    `manageQr` BOOLEAN NOT NULL DEFAULT false,
    `validateQr` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Role` ADD CONSTRAINT `Role_permissionsId_fkey` FOREIGN KEY (`permissionsId`) REFERENCES `Permissions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
