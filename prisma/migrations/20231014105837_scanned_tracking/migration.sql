-- CreateTable
CREATE TABLE `Scans` (
    `id` VARCHAR(191) NOT NULL,
    `scannerId` VARCHAR(191) NOT NULL,
    `scannedId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Scans` ADD CONSTRAINT `Scans_scannerId_fkey` FOREIGN KEY (`scannerId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Scans` ADD CONSTRAINT `Scans_scannedId_fkey` FOREIGN KEY (`scannedId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
