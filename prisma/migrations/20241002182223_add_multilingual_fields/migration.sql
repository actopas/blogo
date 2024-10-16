/*
  Warnings:

  - You are about to drop the column `body` on the `Blog` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Blog` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Blog` table. All the data in the column will be lost.
  - You are about to drop the column `body` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Project` table. All the data in the column will be lost.
  - Added the required column `bodyEN` to the `Blog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bodyZH` to the `Blog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descriptionEN` to the `Blog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descriptionZH` to the `Blog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titleEN` to the `Blog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titleZH` to the `Blog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bodyEN` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bodyZH` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descriptionEN` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descriptionZH` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titleEN` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titleZH` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Blog_title_key` ON `Blog`;

-- DropIndex
DROP INDEX `Project_slug_key` ON `Project`;

-- DropIndex
DROP INDEX `Project_title_key` ON `Project`;

-- AlterTable
ALTER TABLE `Blog` DROP COLUMN `body`,
    DROP COLUMN `description`,
    DROP COLUMN `title`,
    ADD COLUMN `bodyEN` VARCHAR(191) NOT NULL,
    ADD COLUMN `bodyZH` VARCHAR(191) NOT NULL,
    ADD COLUMN `descriptionEN` VARCHAR(191) NOT NULL,
    ADD COLUMN `descriptionZH` VARCHAR(191) NOT NULL,
    ADD COLUMN `titleEN` VARCHAR(191) NOT NULL,
    ADD COLUMN `titleZH` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Project` DROP COLUMN `body`,
    DROP COLUMN `description`,
    DROP COLUMN `slug`,
    DROP COLUMN `title`,
    ADD COLUMN `bodyEN` VARCHAR(191) NOT NULL,
    ADD COLUMN `bodyZH` VARCHAR(191) NOT NULL,
    ADD COLUMN `descriptionEN` VARCHAR(191) NOT NULL,
    ADD COLUMN `descriptionZH` VARCHAR(191) NOT NULL,
    ADD COLUMN `titleEN` VARCHAR(191) NOT NULL,
    ADD COLUMN `titleZH` VARCHAR(191) NOT NULL;
