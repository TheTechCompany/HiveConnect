/*
  Warnings:

  - A unique constraint covering the columns `[user,organisation]` on the table `NotificationPathway` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "NotificationPathway_user_organisation_key" ON "NotificationPathway"("user", "organisation");
