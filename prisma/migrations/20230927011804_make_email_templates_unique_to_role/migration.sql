/*
  Warnings:

  - A unique constraint covering the columns `[roleId]` on the table `EmailTemplate` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `EmailTemplate_roleId_key` ON `EmailTemplate`(`roleId`);
