-- CreateTable
CREATE TABLE "NotificationPathway" (
    "id" TEXT NOT NULL,
    "notifyOn" TEXT[],
    "user" TEXT NOT NULL,
    "organisation" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NotificationPathway_pkey" PRIMARY KEY ("id")
);
