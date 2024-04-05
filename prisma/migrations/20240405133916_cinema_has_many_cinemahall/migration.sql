/*
  Warnings:

  - Added the required column `cinema_id` to the `CinemaHall` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cinemahall` ADD COLUMN `cinema_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `CinemaHall` ADD CONSTRAINT `CinemaHall_cinema_id_fkey` FOREIGN KEY (`cinema_id`) REFERENCES `Cinema`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
