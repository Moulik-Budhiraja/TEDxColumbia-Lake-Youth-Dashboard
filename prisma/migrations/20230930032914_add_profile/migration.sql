-- CreateTable
CREATE TABLE `Profile` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `aboutMe` VARCHAR(10000) NULL,
    `instagramHandlel` VARCHAR(255) NULL,
    `twitterHandle` VARCHAR(255) NULL,
    `linkedInHandle` VARCHAR(255) NULL,
    `link1Name` VARCHAR(255) NULL,
    `link1Url` VARCHAR(1000) NULL,
    `link2Name` VARCHAR(255) NULL,
    `link2Url` VARCHAR(1000) NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `Profile_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Profile` ADD CONSTRAINT `Profile_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
