-- AlterTable
ALTER TABLE `Blog` ADD COLUMN `pin` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Project` ADD COLUMN `pin` BOOLEAN NOT NULL DEFAULT false;
