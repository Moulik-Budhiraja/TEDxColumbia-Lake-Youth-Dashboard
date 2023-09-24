/*
  Warnings:

  - You are about to drop the column `description` on the `Permisisons` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Permisisons` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Permisisons` DROP COLUMN `description`,
    DROP COLUMN `name`;
