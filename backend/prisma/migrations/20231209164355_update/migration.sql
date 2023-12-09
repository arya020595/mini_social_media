/*
  Warnings:

  - You are about to drop the column `tags` on the `Post` table. All the data in the column will be lost.
  - Added the required column `tag` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Post` DROP COLUMN `tags`,
    ADD COLUMN `tag` VARCHAR(191) NOT NULL,
    MODIFY `published` BOOLEAN NULL DEFAULT true;
