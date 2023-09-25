-- AlterTable
ALTER TABLE `Permissions` ADD COLUMN `rsvp` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `authGeneratations` INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE `Rsvp` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `attending` BOOLEAN NOT NULL DEFAULT false,
    `dateOfBirth` DATE NULL,
    `phoneNumber` VARCHAR(255) NULL,
    `mealPreference` VARCHAR(255) NULL,
    `dietaryRestrictions` VARCHAR(1000) NULL,
    `waiverName` VARCHAR(1000) NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `Rsvp_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Rsvp` ADD CONSTRAINT `Rsvp_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
