/*
  Warnings:

  - You are about to drop the column `petDescriptionId` on the `Pet` table. All the data in the column will be lost.
  - You are about to drop the `PetDescription` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `age` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `behaviour` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `breed` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `Pet` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Pet" DROP CONSTRAINT "Pet_petDescriptionId_fkey";

-- AlterTable
ALTER TABLE "Pet" DROP COLUMN "petDescriptionId",
ADD COLUMN     "age" TEXT NOT NULL,
ADD COLUMN     "behaviour" TEXT NOT NULL,
ADD COLUMN     "breed" TEXT NOT NULL,
ADD COLUMN     "size" TEXT NOT NULL;

-- DropTable
DROP TABLE "PetDescription";
