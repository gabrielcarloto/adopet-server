-- CreateTable
CREATE TABLE "PetDescription" (
    "id" TEXT NOT NULL,
    "breed" TEXT NOT NULL,
    "age" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "behaviour" TEXT NOT NULL,

    CONSTRAINT "PetDescription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pet" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "petDescriptionId" TEXT NOT NULL,

    CONSTRAINT "Pet_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_petDescriptionId_fkey" FOREIGN KEY ("petDescriptionId") REFERENCES "PetDescription"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
