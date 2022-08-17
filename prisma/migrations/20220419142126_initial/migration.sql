-- CreateTable
CREATE TABLE `Machine` (
    `id` INTEGER NOT NULL,
    `pumpname` VARCHAR(191) NULL,
    `time` DATETIME(3) NULL,
    `active` BOOLEAN NOT NULL,
    `nozzle` VARCHAR(191) NULL,
    `model` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pump` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `number` VARCHAR(191) NOT NULL,
    `active` BOOLEAN NULL,
    `startcode` VARCHAR(191) NULL,
    `stopcode` VARCHAR(191) NULL,

    UNIQUE INDEX `Pump_name_key`(`name`),
    UNIQUE INDEX `Pump_number_key`(`number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Maintenance` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `machineId` INTEGER NULL,
    `time` DATETIME(3) NULL,
    `note` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Maintenance` ADD CONSTRAINT `Maintenance_machineId_fkey` FOREIGN KEY (`machineId`) REFERENCES `Machine`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
