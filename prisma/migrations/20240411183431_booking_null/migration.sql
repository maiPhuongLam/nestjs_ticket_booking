-- DropForeignKey
ALTER TABLE `showseat` DROP FOREIGN KEY `ShowSeat_booking_id_fkey`;

-- AlterTable
ALTER TABLE `showseat` MODIFY `booking_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `ShowSeat` ADD CONSTRAINT `ShowSeat_booking_id_fkey` FOREIGN KEY (`booking_id`) REFERENCES `Booking`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
