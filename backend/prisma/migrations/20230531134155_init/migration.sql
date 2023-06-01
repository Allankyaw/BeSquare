/*
  Warnings:

  - The primary key for the `post` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `authorId` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `published` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `post` table. All the data in the column will be lost.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `email` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `profile` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `post_body` to the `post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `post_id` to the `post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_email` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_name` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_password` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `post` DROP FOREIGN KEY `Post_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `profile` DROP FOREIGN KEY `Profile_userId_fkey`;

-- DropIndex
DROP INDEX `User_email_key` ON `user`;

-- AlterTable
ALTER TABLE `post` DROP PRIMARY KEY,
    DROP COLUMN `authorId`,
    DROP COLUMN `content`,
    DROP COLUMN `createdAt`,
    DROP COLUMN `id`,
    DROP COLUMN `published`,
    DROP COLUMN `title`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `created_on` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    ADD COLUMN `is_annoymous` TINYINT NOT NULL DEFAULT 0,
    ADD COLUMN `post_body` MEDIUMTEXT NOT NULL,
    ADD COLUMN `post_id` INTEGER NOT NULL,
    ADD COLUMN `tag_id` VARCHAR(45) NULL,
    ADD PRIMARY KEY (`post_id`);

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    DROP COLUMN `email`,
    DROP COLUMN `id`,
    DROP COLUMN `name`,
    ADD COLUMN `is_admin` TINYINT NULL,
    ADD COLUMN `user_aboutme` VARCHAR(255) NULL,
    ADD COLUMN `user_email` VARCHAR(100) NOT NULL,
    ADD COLUMN `user_id` INTEGER NOT NULL,
    ADD COLUMN `user_name` VARCHAR(100) NOT NULL,
    ADD COLUMN `user_password` VARCHAR(100) NOT NULL,
    ADD PRIMARY KEY (`user_id`);

-- DropTable
DROP TABLE `profile`;

-- CreateTable
CREATE TABLE `post_like` (
    `user_id` INTEGER NOT NULL,
    `post_id` INTEGER NOT NULL,

    INDEX `post_id_idx`(`post_id`),
    PRIMARY KEY (`user_id`, `post_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `post_like` ADD CONSTRAINT `post_id` FOREIGN KEY (`post_id`) REFERENCES `post`(`post_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `post_like` ADD CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
