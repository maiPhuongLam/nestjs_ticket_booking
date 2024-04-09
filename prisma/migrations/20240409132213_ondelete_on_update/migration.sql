-- DropForeignKey
ALTER TABLE `admin` DROP FOREIGN KEY `Admin_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `cinemahall` DROP FOREIGN KEY `CinemaHall_cinema_id_fkey`;

-- DropForeignKey
ALTER TABLE `customer` DROP FOREIGN KEY `Customer_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `row` DROP FOREIGN KEY `Row_cinema_hall_id_fkey`;

-- DropForeignKey
ALTER TABLE `seat` DROP FOREIGN KEY `Seat_row_id_fkey`;

-- DropForeignKey
ALTER TABLE `showseat` DROP FOREIGN KEY `ShowSeat_show_id_fkey`;

-- AddForeignKey
ALTER TABLE `Admin` ADD CONSTRAINT `Admin_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Customer` ADD CONSTRAINT `Customer_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CinemaHall` ADD CONSTRAINT `CinemaHall_cinema_id_fkey` FOREIGN KEY (`cinema_id`) REFERENCES `Cinema`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Row` ADD CONSTRAINT `Row_cinema_hall_id_fkey` FOREIGN KEY (`cinema_hall_id`) REFERENCES `CinemaHall`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Seat` ADD CONSTRAINT `Seat_row_id_fkey` FOREIGN KEY (`row_id`) REFERENCES `Row`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ShowSeat` ADD CONSTRAINT `ShowSeat_show_id_fkey` FOREIGN KEY (`show_id`) REFERENCES `Show`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
