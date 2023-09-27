-- AlterTable
ALTER TABLE `EmailTemplate` MODIFY `subject` VARCHAR(1000) NOT NULL,
    MODIFY `body` VARCHAR(10000) NOT NULL;
