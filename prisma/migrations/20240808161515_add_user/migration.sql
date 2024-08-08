-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "fullName" VARCHAR(200) NOT NULL,
    "course" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "message" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
